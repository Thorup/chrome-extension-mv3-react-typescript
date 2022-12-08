/**
 * Reload all tabs at chrome, this ensures that the extension content script is injection.
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

    if (matches === undefined || matches.length === 0) {
      continue;
    }

    const tabs = await chrome.tabs.query({ url: matches });

    for (let j = 0; j < tabs.length; j++) {
      const id = tabs[j].id;
      const url = tabs[j].url;
      const status = tabs[j].status;

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

        if (isWebAddress && !matchedTabs.includes(id)) {
          console.log('reload _> status: ', status);
          console.log('reload _> url: ', tabs[j].url);
          await chrome.tabs.reload(id);
          matchedTabs.push(id);
        }
      }
    }
  }

  return true;
};
