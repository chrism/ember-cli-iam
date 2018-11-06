import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | fingerprinted path', function(hooks) {
  setupApplicationTest(hooks);

  test('check fingerprinted path matches template path', async function(assert) {
    await visit('/');

    const referencePath = find('#tomster-reference').getAttribute('src');

    assert.equal(currentURL(), '/');
    assert.dom('#tomster-helper').hasAttribute('src', referencePath);
  });
});
