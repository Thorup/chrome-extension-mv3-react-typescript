import { MessageFormat, MessageKey, ResponseFormat } from './message.format';

/**
 * Defines the message that is sent through the message system.
 * The format is mapped to the message key to ensure the format of the message.
 */
export interface Message<T extends MessageKey> {
  type: T;
  payload: MessageFormat[T];
}

/**
 * Defines the response that is recieved after the message has been sent.
 * The format is mapped to the message key to ensure the format of the response.
 */
export interface Response<T extends MessageKey> {
  type: T;
  payload: ResponseFormat[T];
}

/**
 * Defines the message details for sending a message to the tab content.
 * The message and response are mapped to the message key to ensure the format of message and response.
 */
export interface ContentMessageDetails<T extends MessageKey> {
  type: T;
  tabId: number;
  payload: MessageFormat[T];
  response?: (response: Response<T>) => void;
}

/**
 * Defines the message details for sending a message to the background.
 * The message and response are mapped to the message key to ensure the format of message and response.
 */
export interface BackgroundMessageDetails<T extends MessageKey> {
  type: T;
  payload: MessageFormat[T];
  response?: (response: Response<T>) => void;
}

/**
 * Defines the details for setting a listener that only reponde on the message of a single type.
 * The message event is mapped to the message key to ensure the format of the message.
 */
export interface EventListenerDetails<T extends MessageKey> {
  type: T;
  callback: (event: MessageEvent<T>) => boolean | undefined;
}

/**
 * Defines the format of the event that triggers when a listener recieves a message.
 * The message and response are mapped to the message key to ensure the format of message and response.
 */
export type MessageEvent<T extends MessageKey> = {
  message: Message<T>;
  sender: chrome.runtime.MessageSender;
  sendResponse: (response: Response<T>) => void;
};

/**
 * Send a message to a tab with the provided details.
 * A response callback is not necessary when messaging the content.
 * All content scripts listening at the tab will recieve the message.
 * @param details The type defines the format of the message and response,
 * while the tabId defines the tab reciever of the message.
 */
export const messageContent = <T extends MessageKey>(
  details: ContentMessageDetails<T>,
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

/**
 * Send a message to the background with the provided details.
 * A response callback is not necessary when messaging the background.
 * All scripts listening at the background will recieve the message.
 * @param details The type defines the format of the message and response.
 */
export const messageBackground = <T extends MessageKey>(
  details: BackgroundMessageDetails<T>,
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

/**
 * Create a scoped message listener that triggers
 * for message of certain formats bound by the provided key.
 * @param details Defines what message format to listen for.
 * @returns The listener callback, this is used to remove the listener again.
 */
export const addListener = <T extends MessageKey>(
  details: EventListenerDetails<T>,
): ((
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) => boolean | undefined) => {
  const mountedCallback = (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ): boolean | undefined => {
    if (message.type === undefined) {
      return;
    }

    if (message.type === details.type) {
      const messageEvent = {
        message,
        sender,
        sendResponse,
      } as MessageEvent<T>;

      return details.callback(messageEvent);
    }

    return false;
  };

  chrome.runtime.onMessage.addListener(mountedCallback);

  return mountedCallback;
};

/**
 * Remove the listener from the chrome runtime.
 * @param listener The listener that is removed.
 */
export const removeListener = (
  listener: (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => boolean | undefined,
): void => {
  chrome.runtime.onMessage.removeListener(listener);
};
