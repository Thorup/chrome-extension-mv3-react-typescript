import { AreaName } from '../storage.typings';

/**
 * Remove the listener from the chrome storage.
 * @param listener The listener that is removed.
 */
export const removeListener = (
  listener: (
    changes: {
      [key: string]: chrome.storage.StorageChange;
    },
    areaName: AreaName,
  ) => void,
): void => {
  chrome.storage.onChanged.removeListener(listener);
};
