import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import { promptWPVersion, promptWPTitle } from './prompts/promptsWP';
import {
  promptUserName,
  promptUserPassword,
  promptUserEmail
} from './prompts/promptsUser';
import { promptDBName, promptDBUser, promptDBPassword } from './prompts/promptsDB';

export default class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the tiptop ' + chalk.red('WordPress App') + ' generator!')
    );

    return Promise.resolve()
      .then(() => this.prompt([promptWPVersion(), promptWPTitle()]))
      .then(props => {
        this.props.wp = {
          version: props.wpVersion,
          title: props.wpTitle
        };
      })
      .then(() =>
        this.prompt([promptUserName(), promptUserPassword(), promptUserEmail()])
      )
      .then(props => {
        this.props.user = {
          name: props.userName,
          password: props.userPassword,
          email: props.userEmail
        };
      })
      .then(() => this.prompt([promptDBName(), promptDBUser(), promptDBPassword()]))
      .then(props => {
        this.props.db = {
          name: props.dbName,
          user: props.dbUser,
          password: props.dbPassword
        };
      });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }
}
