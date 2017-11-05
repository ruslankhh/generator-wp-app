'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptDBPassword = exports.promptDBUser = exports.promptDBName = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promptDBName = exports.promptDBName = function promptDBName() {
  return {
    type: 'input',
    name: 'dbName',
    message: 'Database Name:',
    filter: function filter(str) {
      return str.replace(' ', '-');
    },
    validate: _lodash2.default.negate(_lodash2.default.isEmpty)
  };
};

var promptDBUser = exports.promptDBUser = function promptDBUser() {
  return {
    type: 'input',
    name: 'dbUser',
    message: 'Database User Name:',
    filter: function filter(str) {
      return str.replace(' ', '-');
    },
    validate: _lodash2.default.negate(_lodash2.default.isEmpty)
  };
};

var promptDBPassword = exports.promptDBPassword = function promptDBPassword() {
  return {
    type: 'password',
    name: 'dbPassword',
    message: 'Database Password:',
    validate: _lodash2.default.negate(_lodash2.default.isEmpty)
  };
};