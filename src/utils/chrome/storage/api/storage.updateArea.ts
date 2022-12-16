import { AreaKey } from '../storage.format';
import { UpdateAreaDetails } from '../storage.typings';
import { getArea } from './storage.getArea';

/**
 * Update the storage area with the provided details.
 * The items can be a partial of the storage area keys.
 * @param details Defines the area that is to be updated.
 */
export const updateArea = <T extends AreaKey>(
  details: UpdateAreaDetails<T>,
) => {
  getArea({
    areaName: details.areaName,
    key: details.key,
    callback: (storage) => {
      chrome.storage[details.areaName].set({
        ...storage,
        ...details.items,
      });
    },
  });
};
