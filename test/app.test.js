import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

import _default from '../src/generators/app/default.json';

describe('generator-wp-app:app', () => {
  beforeAll(() => {
    jest.setTimeout(300000);

    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(_default.app)
      .withPrompts(_default.wp)
      .withPrompts(_default.db);
  });

  test('creates files', () => {
    assert.file(['composer.json']);
  });

  test('installs wp-cli', () => {
    assert.file(['vendor/bin/wp']);
  });

  test('downloads wordpress', () => {
    assert.file(['app']);
  });
});
