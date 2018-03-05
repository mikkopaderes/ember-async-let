import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import stubPromise from '../../helpers/stub-promise';

module('Integration | Component | async-let', function(hooks) {
  setupRenderingTest(hooks);

  test('should show yield when async-property is fulfilled', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('property', stubPromise(true, 'Foo'));

    // Act
    await render(hbs`
      {{#async-let on=(async-property property) as |data|}}
        <div data-test="yield">{{data}}</div>
      {{/async-let}}
    `);

    // Assert
    assert.dom('[data-test="yield"]').hasText('Foo');
  });

  test('should show yield when async-function is fulfilled', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('context', {
      method(value) {
        return stubPromise(true, value);
      },
    });

    // Act
    await render(hbs`
      {{#async-let on=(async-function context 'method' 'Foo') as |data|}}
        <div data-test="yield">{{data}}</div>
      {{/async-let}}
    `);

    // Assert
    assert.dom('[data-test="yield"]').hasText('Foo');
  });

  test('should show placeholder when data is not fulfilled and placeholder is passed in', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('context', {
      method() {
        return new Promise((resolve) => {});
      },
    });

    // Act
    await render(hbs`
      {{#async-let on=(async-function context 'method') placeholder=(component 'test-spinner') as |data|}}
        <div data-test="yield">{{data}}</div>
      {{/async-let}}
    `);

    // Assert
    assert.dom(this.element).hasText('Foo');
  });

  test('should not show any placeholder when data is not fulfilled and placeholder is not passed in', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('context', {
      method() {
        return new Promise((resolve) => {});
      },
    });

    // Act
    await render(hbs`
      {{#async-let on=(async-function context 'method') as |data|}}
        <div data-test="yield">{{data}}</div>
      {{/async-let}}
    `);

    // Assert
    assert.dom(this.element).doesNotIncludeText();
  });
});
