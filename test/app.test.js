import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-wp-app:app', () => {
  beforeAll(() => {
    jest.setTimeout(300000);

    return helpers.run(path.join(__dirname, '../generators/app'));
  });

  test('creates files', () => {
    assert.file(['composer.json', 'wp-cli.local.yml']);
  });

  test('installs wp-cli', () => {
    assert.file(['vendor/bin/wp']);
  });

  test('installs wordpress', () => {
    assert.file(['app']);
  });
});
