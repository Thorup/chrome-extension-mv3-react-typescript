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
