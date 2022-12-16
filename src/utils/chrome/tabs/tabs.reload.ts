/**
 * Reload all tabs that contains content scripts.
 * @returns True if the tabs are successfully reloaded.
 */
export const reloadTabs = async (): Promise<boolean> => {
  const contentScripts = chrome.runtime.getManifest().content_scripts;

  if (contentScripts === undefined) {
    return false;
  }

  const matchedTabs: number[] = [];

  for (let i = 0; i < contentScripts.length; i++) {
    const matches = contentScripts[i].matches;

    // Skip if there is no matches.
    if (matches === undefined || matches.length === 0) {
      continue;
    }

    const tabs = await chrome.tabs.query({ url: matches });

    for (let j = 0; j < tabs.length; j++) {
      const id = tabs[j].id;
      const url = tabs[j].url;
      const status = tabs[j].status;

      // Only reload if tab has an id, url, status not loading, is not discarded or incognito.
      // If there is no id then we cannot ensure that the tab is reloaded only once.
      // We only want to refresh web sites that contains an url.
      // Ignore incognito tabs as they do not contain content scripts.
      // Discarded tabs will reload automatically when they become active again..
      // If tab is loading then we assume that the content script is being reloaded.
      if (
        id === undefined ||
        url === undefined ||
        tabs[j].discarded ||
        tabs[j].incognito ||
        status === undefined ||
        status === 'loading'
      ) {
        continue;
      } else {
        const isWebAddress = url.match(/^http[s]?:\/\//);

        // Reload if the tab is a website.
        if (isWebAddress && !matchedTabs.includes(id)) {
          await chrome.tabs.reload(id);
          matchedTabs.push(id);
        }
      }
    }
  }

  return true;
};
