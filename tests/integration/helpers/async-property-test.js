import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import stubPromise from '../../helpers/stub-promise';

module('Integration | Component Helper | async-property', function(hooks) {
  setupRenderingTest(hooks);

  test('should show the resolved value of a property', async function(assert) {
    assert.expect(2);

    // Arrange
    this.set('property', stubPromise(true, 'Foo'));

    // Act
    await render(hbs`
      {{#with (async-property property) as |result|}}
        <div data-test="content">{{result.content}}</div>
        <div data-test="fulfilled">{{result.isFulfilled}}</div>
      {{/with}}
    `);

    // Assert
    assert.equal(
      this.element.querySelector('[data-test="content"]').textContent.trim(),
      'Foo',
    );
    assert.equal(
      this.element.querySelector('[data-test="fulfilled"]').textContent.trim(),
      'true',
    );
  });

  test('should show the resolved value of a new promise when changing it', async function(assert) {
    assert.expect(2);

    // Arrange
    this.set('property', stubPromise(true, 'Foo'));

    // Act
    await render(hbs`
      {{#with (async-property property) as |result|}}
        <div data-test="content">{{result.content}}</div>
        <div data-test="fulfilled">{{result.isFulfilled}}</div>
      {{/with}}
    `);

    await this.set('property', stubPromise(true, 'Bar'));

    // Assert
    assert.equal(
      this.element.querySelector('[data-test="content"]').textContent.trim(),
      'Bar',
    );
    assert.equal(
      this.element.querySelector('[data-test="fulfilled"]').textContent.trim(),
      'true',
    );
  });
});
