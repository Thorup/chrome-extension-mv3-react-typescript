import { AreaKey } from '../storage.format';
import { SetAreaDetails } from '../storage.typings';

/**
 * Sets the storage area with the provided details.
 * @param details The format of the area is defined by the details.
 */
export const setArea = <T extends AreaKey>(details: SetAreaDetails<T>) => {
  chrome.storage[details.areaName].set(details.items);
};
