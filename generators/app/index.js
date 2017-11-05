'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _promptsWP = require('./prompts/promptsWP');

var _promptsUser = require('./prompts/promptsUser');

var _promptsDB = require('./prompts/promptsDB');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _yeomanGenerator2.default {
  initializing() {
    this.props = {};
  }

  prompting() {
    var _this = this;

    // Have Yeoman greet the user.
    this.log((0, _yosay2.default)('Welcome to the tiptop ' + _chalk2.default.red('WordPress App') + ' generator!'));

    return Promise.resolve().then(function () {
      return _this.prompt([(0, _promptsWP.promptWPVersion)(), (0, _promptsWP.promptWPTitle)()]);
    }).then(function (props) {
      _this.props.wp = {
        version: props.wpVersion,
        title: props.wpTitle
      };
    }).then(function () {
      return _this.prompt([(0, _promptsUser.promptUserName)(), (0, _promptsUser.promptUserPassword)(), (0, _promptsUser.promptUserEmail)()]);
    }).then(function (props) {
      _this.props.user = {
        name: props.userName,
        password: props.userPassword,
        email: props.userEmail
      };
    }).then(function () {
      return _this.prompt([(0, _promptsDB.promptDBName)(), (0, _promptsDB.promptDBUser)(), (0, _promptsDB.promptDBPassword)()]);
    }).then(function (props) {
      _this.props.db = {
        name: props.dbName,
        user: props.dbUser,
        password: props.dbPassword
      };
    });
  }

  writing() {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
  }
};
module.exports = exports['default'];