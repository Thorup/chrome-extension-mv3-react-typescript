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
