import { Promise } from 'rsvp';
import { next } from '@ember/runloop';

/**
 * @param {boolean} willResolve
 * @param {*} dataToReturn
 * @return {Promise.<*>} Promise resolving to `dataToReturn`
 */
export default function stubPromise(willResolve, dataToReturn) {
  return new Promise((resolve, reject) => {
    if (willResolve) {
      next(() => {
        resolve(dataToReturn);
      });
    } else {
      next(() => {
        reject(dataToReturn);
      });
    }
  });
}
