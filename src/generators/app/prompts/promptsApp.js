import lodash from 'lodash';
import lodashCheckit from 'lodash-checkit';

const _ = { ...lodashCheckit, ...lodash };

export const promptAppName = value => ({
  type: 'input',
  name: 'name',
  message: 'App name:',
  default: value,
  filter: str => str.replace(' ', '-').toLowerCase(),
  validate: _.negate(_.isEmpty)
});

export const promptAppAuthorName = value => ({
  type: 'input',
  name: 'authorName',
  message: 'App author name:',
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptAppAuthorEmail = value => ({
  type: 'input',
  name: 'authorEmail',
  message: 'App author email:',
  default: value,
  validate: _.isEmail
});
