import lodash from 'lodash';
import lodashCheckit from 'lodash-checkit';
import isSemver from 'is-semver';

const _ = { ...lodashCheckit, ...lodash, isSemver };

export const promptWPType = value => ({
  type: 'list',
  name: 'type',
  message: 'WordPress Type:',
  choices: ['single-site', 'multisite'],
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptWPVersion = value => ({
  type: 'input',
  name: 'version',
  message: 'WordPress Version:',
  default: value,
  validate: (value) =>
    value === 'latest' || value === 'nightly' || _.isSemver(value)
});

export const promptWPTitle = value => ({
  type: 'input',
  name: 'title',
  message: 'WordPress Title:',
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptWPAdminUser = value => ({
  type: 'input',
  name: 'adminUser',
  message: 'WordPress Admin User:',
  default: value,
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptWPAdminPassword = value => ({
  type: 'password',
  name: 'adminPassword',
  message: 'WordPress Admin Password:',
  filter: String,
  default: value
});

export const promptWPAdminEmail = value => ({
  type: 'input',
  name: 'adminEmail',
  message: 'WordPress Admin Email:',
  default: value,
  validate: _.isEmail
});
