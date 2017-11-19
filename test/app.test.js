import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import prompts from './prompts/default.json';

describe('generator-wp-app:app', () => {
  beforeAll(() => {
    jest.setTimeout(300000);

    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ ...prompts.app, ...prompts.wp, ...prompts.db });
  });

  test('creates files', () => {
    assert.file(['composer.json', 'wp-cli.local.yml']);
  });

  test('installs wordpress', () => {
    assert.file(['app/index.php', 'app/wp-config.php']);
  });
});
