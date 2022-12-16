/**
 * Defines the keys of the storage areas.
 */
export enum AreaKey {
  DEFAULT = 'default',
}

/**
 * Defines the format of the storage areas.
 * It is adviced to keep the area formats as shallow objects,
 * as the update method uses a partial of the format to ensure its consistency.
 */
export interface AreaFormat extends chrome.storage.StorageChange {
  [AreaKey.DEFAULT]: {
    storageDummy: string;
  };
}
