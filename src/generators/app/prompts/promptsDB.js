import _ from 'lodash';

export const promptDBName = value => ({
  type: 'input',
  name: 'name',
  message: 'Database name:',
  default: value,
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptDBUser = value => ({
  type: 'input',
  name: 'user',
  message: 'Database user:',
  default: value,
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptDBPassword = value => ({
  type: 'password',
  name: 'password',
  message: 'Database password:',
  filter: String,
  default: value
});
