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
