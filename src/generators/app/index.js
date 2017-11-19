import fs from 'fs';
import fse from 'fs-extra';
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import {
  promptAppName,
  promptAppAuthorName,
  promptAppAuthorEmail,
  promptAppRequireWPCLI,
  promptAppPackageManager,
  promptAppRun
} from './prompts/promptsApp';
import {
  promptWPType,
  promptWPVersion,
  promptWPTitle,
  promptWPAdminUser,
  promptWPAdminPassword,
  promptWPAdminEmail,
  promptWPChangeFileStructure
} from './prompts/promptsWP';
import {
  promptDBName,
  promptDBUser,
  promptDBPassword
} from './prompts/promptsDB';

import prompts from './prompts/default.json';

export default class extends Generator {
  initializing() {
    this.default = prompts;
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the tiptop ' + chalk.red('WordPress App') + ' generator!')
    );

    return Promise.resolve()
      .then(() => {
        return this.prompt([
          promptAppName(this.default.app.name),
          promptAppAuthorName(this.default.app.authorName),
          promptAppAuthorEmail(this.default.app.authorEmail),
          promptAppRequireWPCLI(this.default.app.requireWPCLI),
          promptAppPackageManager(this.default.app.packageManager),
          promptAppRun(this.default.app.run)
        ])
      })
      .then(props => {
        this.props.app = { ...props };
      })
      .then(() => {
        return this.prompt([
          promptWPType(this.default.wp.type),
          promptWPVersion(this.default.wp.version),
          promptWPTitle(this.default.wp.title),
          promptWPAdminUser(this.default.wp.adminUser),
          promptWPAdminPassword(this.default.wp.adminPassword),
          promptWPAdminEmail(this.default.wp.adminEmail),
          promptWPChangeFileStructure(this.default.wp.changeFileStructure)
        ])
      })
      .then(props => {
        this.props.wp = { ...props };
      })
      .then(() => {
        return this.prompt([
          promptDBName(this.default.db.name),
          promptDBUser(this.default.db.user),
          promptDBPassword(this.default.db.password)
        ])
      })
      .then(props => {
        this.props.db = { ...props };
      });
  }

  writing() {
    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Creating App files ')));
    this.log('');

    ['babelrc', 'editorconfig', 'gitattributes', 'gitignore']
      .forEach((fileName) =>
        this.fs.copy(
          this.templatePath(`_${fileName}`),
          this.destinationPath(`.${fileName}`)
        )
      );
    this.fs.copyTpl(
      this.templatePath('**/*.*'),
      this.destinationPath(),
      this.props
    );
    fse.copySync(
      this.templatePath('app'),
      this.destinationPath('app')
    );
  }

  install() {
    const commandWPCLI = this.props.app.requireWPCLI ? './vendor/bin/wp' : 'wp';
    const commandPackageManager = this.props.app.packageManager;

    if (this.props.app.requireWPCLI) {
      this.log('');
      this.log(chalk.bgBlue(chalk.black(' Installing WP-CLI ')));
      this.log('');
      this.spawnCommandSync('composer', ['install', '--no-suggest']);
    }

    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Installing WordPress ')));
    this.log('');
		this.spawnCommandSync(commandWPCLI, [
			'core',
			'download',
			`--version=${this.props.wp.version}`
		]);
    this.spawnCommandSync(commandWPCLI, [
      'config',
      'create',
      `--dbname=${this.props.db.name}`,
      `--dbuser=${this.props.db.user}`,
      `--dbpass=${this.props.db.password}`,
      '--skip-check'
    ]);
    this.spawnCommandSync('mysql.server', ['start']);
    this.spawnCommandSync(commandWPCLI, ['db', 'create']);
    this.spawnCommandSync(commandWPCLI, [
      'core',
      this.props.wp.type === 'multisite' ? 'multisite-install' : 'install',
      `--title=${this.props.wp.title}`,
      `--admin_user=${this.props.wp.adminUser}`,
      `--admin_password=${this.props.wp.adminPassword}`,
      `--admin_email=${this.props.wp.adminEmail}`
    ]);
    this.spawnCommandSync(commandWPCLI, ['rewrite', 'structure', '/%year%/%monthnum%/%postname%', '--hard']);

    if (this.props.wp.changeFileStructure) {
      this.log('');
      this.log(chalk.bgBlue(chalk.black(' Changing WordPress file structure ')));
      this.log('');

      fs.readdirSync(this.destinationPath('app'))
        .filter((fileName) => !~fileName.search(/license\.txt|wp-config\.php/))
        .forEach((fileName) => {
          fse.moveSync(
            this.destinationPath(`app/${fileName}`),
            this.destinationPath(`app/core/${fileName}`)
          );
          this.log(`     ${chalk.yellow('move')} app/${fileName} -> app/core/${fileName}`);
        });

      fse.moveSync(
        this.destinationPath('app/core/wp-content/plugins'),
        this.destinationPath('app/plugins')
      );
      this.log(`     ${chalk.yellow('move')} app/core/wp-content/plugins -> app/plugins`);
      fse.moveSync(
        this.destinationPath('app/core/wp-content/themes'),
        this.destinationPath('app/themes')
      );
      this.log(`     ${chalk.yellow('move')} app/core/wp-content/themes -> app/themes`);

      fse.removeSync(this.destinationPath('app/core/.gitkeep'));
      this.log(`   ${chalk.red('remove')} app/core/.gitkeep`);
      fse.removeSync(this.destinationPath('app/core/readme.html'));
      this.log(`   ${chalk.red('remove')} app/core/readme.html`);
      fse.removeSync(this.destinationPath('app/core/wp-config-sample.php'));
      this.log(`   ${chalk.red('remove')} app/core/wp-config-sample.php`);
      fse.removeSync(this.destinationPath('app/core/wp-content'));

      fse.copySync(
        this.destinationPath('app/core/index.php'),
        this.destinationPath('app/index.php')
      );
      fs.writeFileSync(
        this.destinationPath('app/index.php'),
        fs.readFileSync(this.destinationPath('app/index.php')).toString()
          .replace('/wp-blog-header.php', '/core/wp-blog-header.php')
      );
      this.log(`   ${chalk.green('create')} app/index.php`);
    }

    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Installing packages ')));
    this.log('');
    this.spawnCommandSync(commandPackageManager, ['install']);
  }

  end() {
    this.log('');
    this.log(chalk.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
    if (this.props.app.run) {
      this.log('');
      this.log(chalk.bgBlue(chalk.black(' Runing App ')));
      this.log('');
      this.spawnCommandSync('gulp');
    }
  }
}
