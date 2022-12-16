import { MessageKey } from '../message.format';
import { ChromeBackgroundMessageDetails } from '../message.typings';

/**
 * Send a message to the background with the provided details.
 * A response callback is not necessary when messaging the background.
 * All scripts listening at the background will recieve the message.
 * @param details The type defines the format of the message and response.
 */
export const messageBackground = <T extends MessageKey>(
  details: ChromeBackgroundMessageDetails<T>,
): void => {
  const message = {
    type: details.type,
    payload: details.payload !== undefined ? details.payload : null,
  };

  if (details.response === undefined) {
    chrome.runtime.sendMessage(message);
  } else {
    chrome.runtime.sendMessage(message, details.response);
  }
};
