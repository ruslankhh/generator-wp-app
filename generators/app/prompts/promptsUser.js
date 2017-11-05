'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptUserEmail = exports.promptUserPassword = exports.promptUserName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodashCheckit = require('lodash-checkit');

var _lodashCheckit2 = _interopRequireDefault(_lodashCheckit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _extends({}, _lodashCheckit2.default, _lodash2.default);

var promptUserName = exports.promptUserName = function promptUserName() {
  return {
    type: 'input',
    name: 'userName',
    message: 'Admin User Name:',
    filter: function filter(str) {
      return str.replace(' ', '-');
    },
    validate: _.negate(_.isEmpty)
  };
};

var promptUserPassword = exports.promptUserPassword = function promptUserPassword() {
  return {
    type: 'password',
    name: 'userPassword',
    message: 'Admin Password:',
    validate: _.negate(_.isEmpty)
  };
};

var promptUserEmail = exports.promptUserEmail = function promptUserEmail() {
  return {
    type: 'input',
    name: 'userEmail',
    message: 'Admin User Email:',
    validate: _.isEmail
  };
};