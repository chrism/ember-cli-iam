import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | fingerprinted-path test', function(hooks) {
  setup(hooks);

  test('it renders a page...', async function(assert) {
    await visit('/');

    // replace this line with a real assertion!
    assert.ok(true);
  });

});
