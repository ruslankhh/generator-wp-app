'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptWPTitle = exports.promptWPVersion = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isSemver = require('is-semver');

var _isSemver2 = _interopRequireDefault(_isSemver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _extends({}, _lodash2.default, { isSemver: _isSemver2.default });

var promptWPVersion = exports.promptWPVersion = function promptWPVersion(value) {
  return {
    type: 'input',
    name: 'wpVersion',
    message: 'WordPress Version:',
    default: value,
    validate: _.isSemver
  };
};

var promptWPTitle = exports.promptWPTitle = function promptWPTitle() {
  return {
    type: 'input',
    name: 'wpTitle',
    message: 'WordPress Site Title:',
    validate: _.negate(_.isEmpty)
  };
};