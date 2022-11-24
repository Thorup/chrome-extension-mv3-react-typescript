import { AreaKey, AreaFormat } from './storage.format';

/**
 * Defines the area names that reflect the chrome api area names.
 */
export type AreaName = 'sync' | 'local' | 'managed' | 'session';

/**
 * Defines the format of the details for providing the storage items for a certain area.
 */
export interface SetAreaDetails<T extends AreaKey> {
  areaName: AreaName;
  items: {
    [key in T]?: AreaFormat[T];
  };
}

/**
 * Defines the format of the details for updating the storage items for a certain area.
 */
export interface UpdateAreaDetails<T extends AreaKey> {
  areaName: AreaName;
  key: T;
  items: {
    [key in T]?: Partial<AreaFormat[T]>;
  };
}

/**
 * Defines the format of the details for retrieving items of a certain area of the storage.
 */
export interface GetAreaDetails<T extends AreaKey> {
  areaName: AreaName;
  key: T;
  callback: (item: AreaFormat[T]) => void;
}

/**
 * Defines the format for the details for adding a listener that only invokes when changes happen to a certain area.
 */
export interface ListenerDetails<T extends AreaKey> {
  areaName: AreaName;
  key: T;
  callback: (
    change: {
      newValue?: AreaFormat[T];
      oldValue?: AreaFormat[T];
    },
    areaName: AreaName,
  ) => void;
}

/**
 * Sets the storage area with the provided details.
 * @param details The format of the area is defined by the details.
 */
export const setArea = <T extends AreaKey>(details: SetAreaDetails<T>) => {
  chrome.storage[details.areaName].set(details.items);
};

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
