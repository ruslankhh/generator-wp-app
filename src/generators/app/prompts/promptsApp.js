import lodash from 'lodash';
import lodashCheckit from 'lodash-checkit';

const _ = { ...lodashCheckit, ...lodash };

export const promptAppName = value => ({
  type: 'input',
  name: 'name',
  message: 'App Name:',
  default: value,
  filter: str => str.replace(' ', '-').toLowerCase(),
  validate: _.negate(_.isEmpty)
});

export const promptAppAuthorName = value => ({
  type: 'input',
  name: 'authorName',
  message: 'App Author Name:',
  default: value,
  validate: _.negate(_.isEmpty)
});

export const promptAppAuthorEmail = value => ({
  type: 'input',
  name: 'authorEmail',
  message: 'App Author Email:',
  default: value,
  validate: _.isEmail
});
