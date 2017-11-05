import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import {
  promptAppName,
  promptAppAuthorName,
  promptAppAuthorEmail
} from './prompts/promptsApp';
import {
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
          promptWPVersion(this.default.wp.version),
          promptWPTitle(this.default.wp.title),
          promptWPAdminUser(this.default.wp.adminUser),
          promptWPAdminPassword(),
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
          promptDBPassword()
        ])
      })
      .then(props => {
        this.props.db = { ...props };
      });
  }

  writing() {
    this.log('');
    this.fs.copy(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );
  }

  install() {
    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Installing WP-CLI ')));
    this.spawnCommandSync('composer', ['install', '--no-suggest']);

    this.log('');
    this.log(chalk.bgBlue(chalk.black(' Downloading WordPress ')));
		this.spawnCommandSync('./vendor/bin/wp', [
			'core',
			'download',
			`--version=${this.props.wp.version}`,
			'--path=app',
		]);
  }

  end() {
    this.log('');
    this.log(chalk.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
  }
}
