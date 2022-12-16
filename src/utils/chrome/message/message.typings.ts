import { MessageFormat, MessageKey, ResponseFormat } from './message.format';

/**
 * Defines the message that is sent through the message system.
 * The format is mapped to the message key to ensure the format of the message.
 */
export interface ChromeMessage<T extends MessageKey> {
  type: T;
  payload: MessageFormat[T];
}

/**
 * Defines the response that is recieved after the message has been sent.
 * The format is mapped to the message key to ensure the format of the response.
 */
export interface ChromeResponse<T extends MessageKey> {
  type: T;
  payload: ResponseFormat[T];
}

/**
 * Defines the message details for sending a message to the tab content.
 * The message and response are mapped to the message key to ensure the format of message and response.
 */
export interface ChromeContentMessageDetails<T extends MessageKey> {
  type: T;
  tabId: number;
  payload: MessageFormat[T];
  response?: (response: ChromeResponse<T>) => void;
}

/**
 * Defines the message details for sending a message to the background.
 * The message and response are mapped to the message key to ensure the format of message and response.
 */
export interface ChromeBackgroundMessageDetails<T extends MessageKey> {
  type: T;
  payload: MessageFormat[T];
  response?: (response: ChromeResponse<T>) => void;
}

/**
 * Defines the details for setting a listener that only reponde on the message of a single type.
 * The message event is mapped to the message key to ensure the format of the message.
 */
export interface ChromeEventListenerDetails<T extends MessageKey> {
  type: T;
  callback: (event: ChromeMessageEvent<T>) => boolean | undefined;
}

/**
 * Defines the format of the event that triggers when a listener recieves a message.
 * The message and response are mapped to the message key to ensure the format of message and response.
 */
export type ChromeMessageEvent<T extends MessageKey> = {
  message: ChromeMessage<T>;
  sender: chrome.runtime.MessageSender;
  sendResponse: (response: ChromeResponse<T>) => void;
};
