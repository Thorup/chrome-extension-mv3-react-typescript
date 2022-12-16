import { AreaKey, AreaFormat } from '../storage.format';
import { GetAreaDetails } from '../storage.typings';

/**
 * Get the storage area with the provided details.
 * @param details The format of the area is defined by the details.
 */
export const getArea = <T extends AreaKey>(
  details: GetAreaDetails<T>,
): void => {
  chrome.storage[details.areaName].get([details.key]).then((items) => {
    if (items === undefined) {
      throw Error();
    }

    const keys = Object.keys(items);

    if (keys.includes(details.key)) {
      const item = items[details.key] as AreaFormat[T];

      details.callback(item);
    }

    const item = items[details.key];

    details.callback(item);
  });
};
