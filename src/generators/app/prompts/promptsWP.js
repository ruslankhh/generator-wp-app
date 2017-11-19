import lodash from 'lodash';
import lodashCheckit from 'lodash-checkit';
import isSemver from 'is-semver';

const _ = { ...lodashCheckit, ...lodash, isSemver };

export const promptWPType = value => ({
  type: 'list',
  name: 'type',
  message: 'WordPress type:',
  choices: ['single-site', 'multisite'],
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptWPVersion = value => ({
  type: 'input',
  name: 'version',
  message: 'WordPress version:',
  default: value,
  validate: (value) =>
    value === 'latest' || value === 'nightly' || _.isSemver(value)
});

export const promptWPTitle = value => ({
  type: 'input',
  name: 'title',
  message: 'WordPress title:',
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptWPAdminUser = value => ({
  type: 'input',
  name: 'adminUser',
  message: 'WordPress admin user:',
  default: value,
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptWPAdminPassword = value => ({
  type: 'password',
  name: 'adminPassword',
  message: 'WordPress admin password:',
  filter: String,
  default: value
});

export const promptWPAdminEmail = value => ({
  type: 'input',
  name: 'adminEmail',
  message: 'WordPress admin email:',
  default: value,
  validate: _.isEmail
});

export const promptWPChangeFileStructure = value => ({
  type: 'confirm',
  name: 'changeFileStructure',
  message: 'WordPress. Change the file structure?',
  default: value,
  validate: _.negate(_.isEmpty)
});
