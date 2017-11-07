'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _promptsApp = require('./prompts/promptsApp');

var _promptsWP = require('./prompts/promptsWP');

var _promptsDB = require('./prompts/promptsDB');

var _default2 = require('./default.json');

var _default3 = _interopRequireDefault(_default2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _yeomanGenerator2.default {
  initializing() {
    this.default = _default3.default;
    this.props = {};
  }

  prompting() {
    var _this = this;

    // Have Yeoman greet the user.
    this.log((0, _yosay2.default)('Welcome to the tiptop ' + _chalk2.default.red('WordPress App') + ' generator!'));

    return Promise.resolve().then(function () {
      return _this.prompt([(0, _promptsApp.promptAppName)(_this.default.app.name), (0, _promptsApp.promptAppAuthorName)(_this.default.app.authorName), (0, _promptsApp.promptAppAuthorEmail)(_this.default.app.authorEmail)]);
    }).then(function (props) {
      _this.props.app = _extends({}, props);
    }).then(function () {
      _this.log('');

      return _this.prompt([(0, _promptsWP.promptWPType)(_this.default.wp.type), (0, _promptsWP.promptWPVersion)(_this.default.wp.version), (0, _promptsWP.promptWPTitle)(_this.default.wp.title), (0, _promptsWP.promptWPAdminUser)(_this.default.wp.adminUser), (0, _promptsWP.promptWPAdminPassword)(_this.default.wp.adminPassword), (0, _promptsWP.promptWPAdminEmail)(_this.default.wp.adminEmail)]);
    }).then(function (props) {
      _this.props.wp = _extends({}, props);
    }).then(function () {
      _this.log('');

      return _this.prompt([(0, _promptsDB.promptDBName)(_this.default.db.name), (0, _promptsDB.promptDBUser)(_this.default.db.user), (0, _promptsDB.promptDBPassword)(_this.default.db.password)]);
    }).then(function (props) {
      _this.props.db = _extends({}, props);
    });
  }

  writing() {
    this.log('');
    this.fs.copyTpl(this.templatePath('composer.json'), this.destinationPath('composer.json'), this.props);
    this.fs.copyTpl(this.templatePath('wp-cli.local.yml'), this.destinationPath('wp-cli.local.yml'), this.props);
  }

  install() {
    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Installing WP-CLI ')));
    this.spawnCommandSync('composer', ['install', '--no-suggest']);

    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Installing WordPress ')));
    this.spawnCommandSync('./vendor/bin/wp', ['core', 'download', '--version=' + this.props.wp.version]);
    this.spawnCommandSync('./vendor/bin/wp', ['config', 'create', '--dbname=' + this.props.db.name, '--dbuser=' + this.props.db.user, '--dbpass=' + this.props.db.password]);
    this.spawnCommandSync('./vendor/bin/wp', ['db', 'create']);
    this.spawnCommandSync('./vendor/bin/wp', ['core', this.props.wp.type === 'multisite' ? 'multisite-install' : 'install', '--title=' + this.props.wp.title, '--admin_user=' + this.props.wp.adminUser, '--admin_password=' + this.props.wp.adminPassword, '--admin_email=' + this.props.wp.adminEmail]);
  }

  end() {
    this.log('');
    this.log(_chalk2.default.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
  }
};
module.exports = exports['default'];