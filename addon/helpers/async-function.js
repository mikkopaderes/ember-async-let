import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import Helper from '@ember/component/helper';

/**
 * @class AsyncFunction
 * @namespace Helper
 * @extends Ember.Helper
 */
export default Helper.extend({
  /**
   * @type {Object}
   * @default
   */
  state: {
    args: [],
    content: null,
    context: null,
    isFulfilled: false,
    method: null,
  },

  /**
   * @override
   */
  compute([context, method, ...args]) {
    if (this.didMethodChange(context, method, args)) {
      this.set('state', {
        args,
        context,
        method,
        content: null,
        isFulfilled: false,
      });
    }

    if (!this.get('state.isFulfilled')) {
      context[method](...args).then((result) => {
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
   * Checks if the async function changed
   *
   * @param {Object} context
   * @param {Function} method
   * @param {Array} args
   * @return {boolean} True if changed. Otherwise, false.
   */
  didMethodChange(context, method, args) {
    let didChange = false;

    if (
      this.get('state.context') !== context
      || this.get('state.method') !== method
    ) {
      didChange = true;
    }

    if (!didChange) {
      args.forEach((arg, index) => {
        const stateArg = this.get('state.args')[index];

        if (arg !== stateArg) {
          didChange = true;
        }
      });
    }

    return didChange;
  },
});
