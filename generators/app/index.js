'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = class extends _yeomanGenerator2.default {
  initializing() {
    this.props = {
      templatePath: _path2.default.join(__dirname, '../../templates')
    };
  }

  prompting() {
    var _this = this;

    // Have Yeoman greet the user.
    this.log(
      (0, _yosay2.default)(
        'Welcome to the tiptop ' +
          _chalk2.default.red('generator-wp-site') +
          ' generator!'
      )
    );

    var prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      _this.props = _extends({}, _this.props, props);
    });
  }

  paths() {
    this.sourceRoot(_path2.default.join(this.props.templatePath, 'app'));
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
module.exports = exports.default;
