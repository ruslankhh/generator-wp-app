import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-wp-app:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      wpVersion: '0.0.1',
      wpTitle: 'Site Title',
      userName: 'admin',
      userPassword: 'password',
      userEmail: 'mail@example.com',
      dbName: 'sitetitle',
      dbUser: 'root',
      dbPassword: 'password'
    });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
