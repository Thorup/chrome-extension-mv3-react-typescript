import { MessageKey } from '../message.format';
import { ChromeContentMessageDetails } from '../message.typings';

/**
 * Send a message to a tab with the provided details.
 * A response callback is not necessary when messaging the content.
 * All content scripts listening at the tab will recieve the message.
 * @param details The type defines the format of the message and response,
 * while the tabId defines the tab reciever of the message.
 */
export const messageContent = <T extends MessageKey>(
  details: ChromeContentMessageDetails<T>,
): void => {
  const message = {
    type: details.type,
    payload: details.payload,
  };

  if (details.response === undefined) {
    chrome.tabs.sendMessage(details.tabId, message);
  } else {
    chrome.tabs.sendMessage(details.tabId, message, details.response);
  }
};
