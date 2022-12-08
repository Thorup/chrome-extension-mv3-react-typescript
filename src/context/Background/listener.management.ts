import { ChromeUtils } from '@utils/index';

/**
 * Defines a functional scope which adds all management listeners at the background context.
 */
const addManagementListeners = () => {
  /**
   * Adds the management onEnabled listener which triggers when extensions are
   * enabled at the chrome browser. This makes it possible to handle events
   * when this extension is enabled after have been disabled.
   */
  chrome.management.onEnabled.addListener(
    async (info: chrome.management.ExtensionInfo): Promise<void> => {
      if (info.id === chrome.runtime.id) {
        console.log('onEnabled _> info: ', info);
        await ChromeUtils.TabsAPI.reloadTabs();
      }
    },
  );
};

export default addManagementListeners;
