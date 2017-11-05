import lodash from 'lodash';
import isSemver from 'is-semver';

const _ = { ...lodash, isSemver };

export const promptWPVersion = value => ({
  type: 'input',
  name: 'wpVersion',
  message: 'WordPress Version:',
  default: value,
  validate: _.isSemver
});

export const promptWPTitle = () => ({
  type: 'input',
  name: 'wpTitle',
  message: 'WordPress Site Title:',
  validate: _.negate(_.isEmpty)
});
