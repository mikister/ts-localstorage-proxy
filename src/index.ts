export type StorageSchema = {
  [key: string]: any;
};

function keyBuilder(namespace: string, key: string): string {
  return `${namespace}-${key}`;
}

/**
 * Creates a proxy object that stores it's values in `localStorage`
 * @param  {String} namespace  the prefix used to namespace keys in `localStorage`
 * @param  {Schema} defaultValues  default values for properties
 *
 * @returns {Schema} the proxy object
 */
export function createLocalStorage<Schema extends StorageSchema>(
  namespace: string,
  defaultValues: Schema
): Schema {
  const proxy = new Proxy(defaultValues, {
    get(target, key) {
      const json = localStorage.getItem(keyBuilder(namespace, key as string));
      if (!json) return defaultValues[key as string];

      let data = JSON.parse(json);

      return data ?? defaultValues[key as string];
    },
    set(target, key, newValue) {
      localStorage.setItem(
        keyBuilder(namespace, key as string),
        JSON.stringify(newValue)
      );

      return true;
    },
  });

  return proxy;
}
