import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import Helper from '@ember/component/helper';

/**
 * @class AsyncProperty
 * @namespace Helper
 * @extends Ember.Helper
 */
export default Helper.extend({
  /**
   * @type {Object}
   * @default
   */
  state: { content: null, isFulfilled: false, property: null },

  /**
   * @override
   */
  compute([property]) {
    if (this.didPropertyChange(property)) {
      this.set('state', {
        property,
        content: null,
        isFulfilled: false,
      });
    }

    if (!this.get('state.isFulfilled')) {
      property.then((result) => {
        run(() => {
          const newState = assign({}, this.get('state'), {
            content: result,
            isFulfilled: true,
          });

          this.set('state', newState);

          this.recompute();
        });
      });
    }

    return this.get('state');
  },

  /**
   * Checks if the async property changed
   *
   * @param {*} property
   * @return {boolean} True if changed. Otherwise, false.
   */
  didPropertyChange(property) {
    if (this.get('state.property') === property) {
      return false;
    }

    return true;
  },
});
