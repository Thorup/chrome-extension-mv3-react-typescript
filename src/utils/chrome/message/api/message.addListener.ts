import { MessageKey } from '../message.format';
import {
  ChromeEventListenerDetails,
  ChromeMessage,
  ChromeMessageEvent,
  ChromeResponse,
} from '../message.typings';

/**
 * Create a scoped message listener that triggers
 * for message of certain formats bound by the provided key.
 * @param details Defines what message format to listen for.
 * @returns The listener callback, this is used to remove the listener again.
 */
export const addListener = <T extends MessageKey>(
  details: ChromeEventListenerDetails<T>,
): ((
  message: ChromeMessage<T>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: ChromeResponse<T>) => void,
) => boolean | undefined) => {
  const mountedCallback = (
    message: ChromeMessage<T>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: ChromeResponse<T>) => void,
  ): boolean | undefined => {
    if (message.type === undefined) {
      return;
    }

    if (message.type === details.type) {
      const messageEvent: ChromeMessageEvent<T> = {
        message,
        sender,
        sendResponse,
      };

      return details.callback(messageEvent);
    }

    return false;
  };

  chrome.runtime.onMessage.addListener(mountedCallback);

  return mountedCallback;
};
