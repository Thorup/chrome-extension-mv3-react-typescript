/**
 * Defines the keys of the message and response formats.
 */
export const enum MessageKey {
  DEFAULT = 'default',
}

/**
 * Defines the message format of messages send with the message api.
 */
export interface MessageFormat {
  [MessageKey.DEFAULT]: {
    messageDummy: string;
  };
}

/**
 * Defines the response format of responses recieved from the message api.
 */
export interface ResponseFormat {
  [MessageKey.DEFAULT]: {
    responseDummy: string;
  };
}
