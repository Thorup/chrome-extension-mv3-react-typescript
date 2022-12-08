import addManagementListeners from './listener.management';
import addRuntimeListeners from './listener.runtime';

/**
 * Adds the management listeners to the background service worker.
 */
addManagementListeners();

/**
 * Adds the runtime listeners to the background service worker.
 */
addRuntimeListeners();

// if (module.hot) {
//   const status: string = module.hot.status();

//   console.log('backgound _> status : ', status);

//   module.hot.accept((error) => {
//     console.warn('background _> error: ', error);
//     console.warn('background _> error.cause: ', error.cause);
//   });
// }
