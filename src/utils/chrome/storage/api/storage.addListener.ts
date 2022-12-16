import { AreaKey } from '../storage.format';
import { ListenerDetails, AreaName } from '../storage.typings';

/**
 * Add a storage listener that only invokes when changes happen to a certain area of the storage.
 * @param details The area is defined by the provided details.
 * @returns The listener which is used to remove the listener again.
 */
export const addListener = <T extends AreaKey>(
  details: ListenerDetails<T>,
): ((
  changes: {
    [key: string]: chrome.storage.StorageChange;
  },
  areaName: AreaName,
) => void) => {
  const mountedCallback = (
    changes: {
      [key: string]: chrome.storage.StorageChange;
    },
    areaName: AreaName,
  ): void => {
    const keys = Object.keys(changes);

    if (keys.includes(details.key)) {
      const change = changes[details.key];

      if (change !== undefined && areaName === details.areaName) {
        details.callback(change, areaName);
      }
    }
  };

  chrome.storage.onChanged.addListener(mountedCallback);

  return mountedCallback;
};
