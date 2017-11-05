import _ from 'lodash';

export const promptDBName = () => ({
  type: 'input',
  name: 'dbName',
  message: 'Database Name:',
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptDBUser = () => ({
  type: 'input',
  name: 'dbUser',
  message: 'Database User Name:',
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptDBPassword = () => ({
  type: 'password',
  name: 'dbPassword',
  message: 'Database Password:',
  validate: _.negate(_.isEmpty)
});
