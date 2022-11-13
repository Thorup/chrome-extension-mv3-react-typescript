console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails): void => {
    console.log('I got installed!');
  },
);
