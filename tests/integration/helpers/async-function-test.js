import { module, test } from 'qunit';
import { render, settled } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import stubPromise from '../../helpers/stub-promise';

module('Integration | Component Helper | async-function', function(hooks) {
  setupRenderingTest(hooks);

  test('should show the resolved value of a function', async function(assert) {
    assert.expect(2);

    // Arrange
    this.set('context', {
      method(value) {
        return stubPromise(true, value);
      },
    });

    // Act
    await render(hbs`
      {{#with (async-function context 'method' 'Foo') as |result|}}
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
    this.set('value', 'Foo');
    this.set('context', {
      method(value) {
        return stubPromise(true, value);
      },
    });

    await render(hbs`
      {{#with (async-function context 'method' value) as |result|}}
        <div data-test="content">{{result.content}}</div>
        <div data-test="fulfilled">{{result.isFulfilled}}</div>
      {{/with}}
    `);

    // Act
    await this.set('value', 'Bar');

    // Assert
    await settled();
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
