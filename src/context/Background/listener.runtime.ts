import { ChromeUtils } from '@utils/index';

/**
 * Defines a functional scope which adds all runtime listeners at the background context.
 */
const addRuntimeListeners = (): void => {
  /**
   * Adds the runtime onInstalled listener which triggers on
   * 'install', 'update', 'chrome update' and 'shared module update'.
   *
   * Here we can handle application cleanup and initialization based on the event.
   */
  chrome.runtime.onInstalled.addListener(
    async (details: chrome.runtime.InstalledDetails): Promise<void> => {
      console.log('onInstalled _> info: ', details);

      const reason: chrome.runtime.OnInstalledReason = details.reason;

      switch (reason) {
        case 'install': {
          await ChromeUtils.TabsAPI.reloadTabs();
          break;
        }
        case 'update': {
          await ChromeUtils.TabsAPI.reloadTabs();
          break;
        }
      }
    },
  );
};

export default addRuntimeListeners;
