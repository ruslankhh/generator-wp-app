import fs from 'fs';
import fse from 'fs-extra';
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import {
  promptAppName,
  promptAppAuthorName,
  promptAppAuthorEmail
} from './prompts/promptsApp';
import {
  promptWPType,
  promptWPVersion,
  promptWPTitle,
  promptWPAdminUser,
  promptWPAdminPassword,
  promptWPAdminEmail
} from './prompts/promptsWP';
import {
  promptDBName,
  promptDBUser,
  promptDBPassword
} from './prompts/promptsDB';

import _default from './default.json';

export default class extends Generator {
  initializing() {
    this.default = _default;
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
          promptAppAuthorEmail(this.default.app.authorEmail)
        ])
      })
      .then(props => {
        this.props.app = { ...props };
      })
      .then(() => {
        this.log('');

        return this.prompt([
          promptWPType(this.default.wp.type),
          promptWPVersion(this.default.wp.version),
          promptWPTitle(this.default.wp.title),
          promptWPAdminUser(this.default.wp.adminUser),
          promptWPAdminPassword(this.default.wp.adminPassword),
          promptWPAdminEmail(this.default.wp.adminEmail)
        ])
      })
      .then(props => {
        this.props.wp = { ...props };
      })
      .then(() => {
        this.log('');

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
    fse.copySync(
      this.templatePath('app'),
      this.destinationPath('app'),
      { filter: (src) => !src.includes('.gitkeep') }
    );
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(),
      this.props
    );
  }

  install() {
    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Installing WP-CLI ')));
    this.spawnCommandSync('composer', ['install', '--no-suggest']);

    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Installing WordPress ')));
		this.spawnCommandSync('./vendor/bin/wp', [
			'core',
			'download',
			`--version=${this.props.wp.version}`
		]);
    this.spawnCommandSync('./vendor/bin/wp', [
      'config',
      'create',
      `--dbname=${this.props.db.name}`,
      `--dbuser=${this.props.db.user}`,
      `--dbpass=${this.props.db.password}`,
      '--skip-check'
    ]);
    this.spawnCommandSync('./vendor/bin/wp', ['db', 'create']);
    this.spawnCommandSync('./vendor/bin/wp', [
      'core',
      this.props.wp.type === 'multisite' ? 'multisite-install' : 'install',
      `--title=${this.props.wp.title}`,
      `--admin_user=${this.props.wp.adminUser}`,
      `--admin_password=${this.props.wp.adminPassword}`,
      `--admin_email=${this.props.wp.adminEmail}`
    ]);

    fse.moveSync(
      this.destinationPath('app/core/license.txt'),
      this.destinationPath('app/LICENSE.txt')
    );
    fse.moveSync(
      this.destinationPath('app/core/index.php'),
      this.destinationPath('app/index.php')
    );
    fse.moveSync(
      this.destinationPath('app/core/wp-config.php'),
      this.destinationPath('app/wp-config.php')
    );
    fse.moveSync(
      this.destinationPath('app/core/wp-content/plugins'),
      this.destinationPath('app/plugins')
    );
    fse.moveSync(
      this.destinationPath('app/core/wp-content/themes'),
      this.destinationPath('app/themes')
    );

    fse.removeSync(this.destinationPath('app/core/readme.html'));
    fse.removeSync(this.destinationPath('app/core/wp-config-sample.php'));
    fse.removeSync(this.destinationPath('app/core/wp-content'));

    fs.writeFileSync(
      this.destinationPath('app/index.php'),
      fs.readFileSync(this.destinationPath('app/index.php')).toString()
        .replace('/wp-blog-header.php', '/core/wp-blog-header.php')
    );
  }

  end() {
    this.log('');
    this.log(chalk.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
  }
}
