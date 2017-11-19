'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

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
      return _this.prompt([(0, _promptsApp.promptAppName)(_this.default.app.name), (0, _promptsApp.promptAppAuthorName)(_this.default.app.authorName), (0, _promptsApp.promptAppAuthorEmail)(_this.default.app.authorEmail), (0, _promptsApp.promptAppRequireWPCLI)(_this.default.app.requireWPCLI), (0, _promptsApp.promptAppPackageManager)(_this.default.app.packageManager), (0, _promptsApp.promptAppRun)(_this.default.app.run)]);
    }).then(function (props) {
      _this.props.app = _extends({}, props);
    }).then(function () {
      return _this.prompt([(0, _promptsWP.promptWPType)(_this.default.wp.type), (0, _promptsWP.promptWPVersion)(_this.default.wp.version), (0, _promptsWP.promptWPTitle)(_this.default.wp.title), (0, _promptsWP.promptWPAdminUser)(_this.default.wp.adminUser), (0, _promptsWP.promptWPAdminPassword)(_this.default.wp.adminPassword), (0, _promptsWP.promptWPAdminEmail)(_this.default.wp.adminEmail), (0, _promptsWP.promptWPChangeFileStructure)(_this.default.wp.changeFileStructure)]);
    }).then(function (props) {
      _this.props.wp = _extends({}, props);
    }).then(function () {
      return _this.prompt([(0, _promptsDB.promptDBName)(_this.default.db.name), (0, _promptsDB.promptDBUser)(_this.default.db.user), (0, _promptsDB.promptDBPassword)(_this.default.db.password)]);
    }).then(function (props) {
      _this.props.db = _extends({}, props);
    });
  }

  writing() {
    var _this2 = this;

    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Creating App files ')));
    this.log('');

    ['babelrc', 'editorconfig', 'gitattributes', 'gitignore'].forEach(function (fileName) {
      return _this2.fs.copy(_this2.templatePath('_' + fileName), _this2.destinationPath('.' + fileName));
    });
    this.fs.copyTpl(this.templatePath('**/*.*'), this.destinationPath(), this.props);
    _fsExtra2.default.copySync(this.templatePath('app'), this.destinationPath('app'));
  }

  install() {
    var _this3 = this;

    var commandWPCLI = this.props.app.requireWPCLI ? './vendor/bin/wp' : 'wp';
    var commandPackageManager = this.props.app.packageManager;

    if (this.props.app.requireWPCLI) {
      this.log('');
      this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Installing WP-CLI ')));
      this.log('');
      this.spawnCommandSync('composer', ['install', '--no-suggest']);
    }

    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Installing WordPress ')));
    this.log('');
    this.spawnCommandSync(commandWPCLI, ['core', 'download', '--version=' + this.props.wp.version]);
    this.spawnCommandSync(commandWPCLI, ['config', 'create', '--dbname=' + this.props.db.name, '--dbuser=' + this.props.db.user, '--dbpass=' + this.props.db.password, '--skip-check']);
    this.spawnCommandSync('mysql.server', ['start']);
    this.spawnCommandSync(commandWPCLI, ['db', 'create']);
    this.spawnCommandSync(commandWPCLI, ['core', this.props.wp.type === 'multisite' ? 'multisite-install' : 'install', '--title=' + this.props.wp.title, '--admin_user=' + this.props.wp.adminUser, '--admin_password=' + this.props.wp.adminPassword, '--admin_email=' + this.props.wp.adminEmail]);
    this.spawnCommandSync(commandWPCLI, ['rewrite', 'structure', '/%year%/%monthnum%/%postname%', '--hard']);

    if (this.props.wp.changeFileStructure) {
      this.log('');
      this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Changing WordPress file structure ')));
      this.log('');

      _fs2.default.readdirSync(this.destinationPath('app')).filter(function (fileName) {
        return !~fileName.search(/license\.txt|wp-config\.php/);
      }).forEach(function (fileName) {
        _fsExtra2.default.moveSync(_this3.destinationPath('app/' + fileName), _this3.destinationPath('app/core/' + fileName));
        _this3.log('     ' + _chalk2.default.yellow('move') + ' app/' + fileName + ' -> app/core/' + fileName);
      });

      _fsExtra2.default.moveSync(this.destinationPath('app/core/wp-content/plugins'), this.destinationPath('app/plugins'));
      this.log('     ' + _chalk2.default.yellow('move') + ' app/core/wp-content/plugins -> app/plugins');
      _fsExtra2.default.moveSync(this.destinationPath('app/core/wp-content/themes'), this.destinationPath('app/themes'));
      this.log('     ' + _chalk2.default.yellow('move') + ' app/core/wp-content/themes -> app/themes');

      _fsExtra2.default.removeSync(this.destinationPath('app/core/.gitkeep'));
      this.log('   ' + _chalk2.default.red('remove') + ' app/core/.gitkeep');
      _fsExtra2.default.removeSync(this.destinationPath('app/core/readme.html'));
      this.log('   ' + _chalk2.default.red('remove') + ' app/core/readme.html');
      _fsExtra2.default.removeSync(this.destinationPath('app/core/wp-config-sample.php'));
      this.log('   ' + _chalk2.default.red('remove') + ' app/core/wp-config-sample.php');
      _fsExtra2.default.removeSync(this.destinationPath('app/core/wp-content'));

      _fsExtra2.default.copySync(this.destinationPath('app/core/index.php'), this.destinationPath('app/index.php'));
      _fs2.default.writeFileSync(this.destinationPath('app/index.php'), _fs2.default.readFileSync(this.destinationPath('app/index.php')).toString().replace('/wp-blog-header.php', '/core/wp-blog-header.php'));
      this.log('   ' + _chalk2.default.green('create') + ' app/index.php');
    }

    this.log('');
    this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Installing packages ')));
    this.log('');
    this.spawnCommandSync(commandPackageManager, ['install']);
  }

  end() {
    this.log('');
    this.log(_chalk2.default.green('Congratulations! All done.'));
    this.log('Thanks for using Yeoman.');
    if (this.props.app.run) {
      this.log('');
      this.log(_chalk2.default.bgBlue(_chalk2.default.black(' Runing App ')));
      this.log('');
      this.spawnCommandSync('gulp');
    }
  }
};
module.exports = exports['default'];