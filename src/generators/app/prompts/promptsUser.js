import lodash from 'lodash';
import lodashCheckit from 'lodash-checkit';

const _ = { ...lodashCheckit, ...lodash };

export const promptUserName = () => ({
  type: 'input',
  name: 'userName',
  message: 'Admin User Name:',
  filter: str => str.replace(' ', '-'),
  validate: _.negate(_.isEmpty)
});

export const promptUserPassword = () => ({
  type: 'password',
  name: 'userPassword',
  message: 'Admin Password:',
  validate: _.negate(_.isEmpty)
});

export const promptUserEmail = () => ({
  type: 'input',
  name: 'userEmail',
  message: 'Admin User Email:',
  validate: _.isEmail
});
