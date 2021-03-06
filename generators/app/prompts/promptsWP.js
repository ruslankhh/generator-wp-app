'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptWPChangeFileStructure = exports.promptWPAdminEmail = exports.promptWPAdminPassword = exports.promptWPAdminUser = exports.promptWPTitle = exports.promptWPVersion = exports.promptWPType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodashCheckit = require('lodash-checkit');

var _lodashCheckit2 = _interopRequireDefault(_lodashCheckit);

var _isSemver = require('is-semver');

var _isSemver2 = _interopRequireDefault(_isSemver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _extends({}, _lodashCheckit2.default, _lodash2.default, { isSemver: _isSemver2.default });

var promptWPType = exports.promptWPType = function promptWPType(value) {
  return {
    type: 'list',
    name: 'type',
    message: 'WordPress type:',
    choices: ['single-site', 'multisite'],
    default: value,
    validate: _.negate(_.isEmpty)
  };
};

var promptWPVersion = exports.promptWPVersion = function promptWPVersion(value) {
  return {
    type: 'input',
    name: 'version',
    message: 'WordPress version:',
    default: value,
    validate: function validate(value) {
      return value === 'latest' || value === 'nightly' || _.isSemver(value);
    }
  };
};

var promptWPTitle = exports.promptWPTitle = function promptWPTitle(value) {
  return {
    type: 'input',
    name: 'title',
    message: 'WordPress title:',
    default: value,
    validate: _.negate(_.isEmpty)
  };
};

var promptWPAdminUser = exports.promptWPAdminUser = function promptWPAdminUser(value) {
  return {
    type: 'input',
    name: 'adminUser',
    message: 'WordPress admin user:',
    default: value,
    filter: function filter(str) {
      return str.replace(' ', '-');
    },
    validate: _.negate(_.isEmpty)
  };
};

var promptWPAdminPassword = exports.promptWPAdminPassword = function promptWPAdminPassword(value) {
  return {
    type: 'password',
    name: 'adminPassword',
    message: 'WordPress admin password:',
    filter: String,
    default: value
  };
};

var promptWPAdminEmail = exports.promptWPAdminEmail = function promptWPAdminEmail(value) {
  return {
    type: 'input',
    name: 'adminEmail',
    message: 'WordPress admin email:',
    default: value,
    validate: _.isEmail
  };
};

var promptWPChangeFileStructure = exports.promptWPChangeFileStructure = function promptWPChangeFileStructure(value) {
  return {
    type: 'confirm',
    name: 'changeFileStructure',
    message: 'WordPress. Change the file structure?',
    default: value,
    validate: _.negate(_.isEmpty)
  };
};