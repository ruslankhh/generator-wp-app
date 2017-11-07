'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptDBPassword = exports.promptDBUser = exports.promptDBName = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promptDBName = exports.promptDBName = function promptDBName(value) {
  return {
    type: 'input',
    name: 'name',
    message: 'Database Name:',
    default: value,
    filter: function filter(str) {
      return str.replace(' ', '-');
    },
    validate: _lodash2.default.negate(_lodash2.default.isEmpty)
  };
};

var promptDBUser = exports.promptDBUser = function promptDBUser(value) {
  return {
    type: 'input',
    name: 'user',
    message: 'Database User:',
    default: value,
    filter: function filter(str) {
      return str.replace(' ', '-');
    },
    validate: _lodash2.default.negate(_lodash2.default.isEmpty)
  };
};

var promptDBPassword = exports.promptDBPassword = function promptDBPassword(value) {
  return {
    type: 'password',
    name: 'password',
    message: 'Database Password:',
    filter: String,
    default: value
  };
};