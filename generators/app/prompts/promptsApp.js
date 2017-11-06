'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptAppAuthorEmail = exports.promptAppAuthorName = exports.promptAppName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodashCheckit = require('lodash-checkit');

var _lodashCheckit2 = _interopRequireDefault(_lodashCheckit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _extends({}, _lodashCheckit2.default, _lodash2.default);

var promptAppName = exports.promptAppName = function promptAppName(value) {
  return {
    type: 'input',
    name: 'name',
    message: 'App Name:',
    default: value,
    filter: function filter(str) {
      return str.replace(' ', '-').toLowerCase();
    },
    validate: _.negate(_.isEmpty)
  };
};

var promptAppAuthorName = exports.promptAppAuthorName = function promptAppAuthorName(value) {
  return {
    type: 'input',
    name: 'authorName',
    message: 'App Author Name:',
    default: value,
    validate: _.negate(_.isEmpty)
  };
};

var promptAppAuthorEmail = exports.promptAppAuthorEmail = function promptAppAuthorEmail(value) {
  return {
    type: 'input',
    name: 'authorEmail',
    message: 'App Author Email:',
    default: value,
    validate: _.isEmail
  };
};