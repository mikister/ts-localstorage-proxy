# ts-localstorage-proxy

[![npm](https://img.shields.io/npm/l/ts-localstorage-proxy.svg)](https://github.com/mikister/ts-localstorage-proxy/blob/main/LICENSE)

Access `localStorage` like it's an object, using proxies.

## Usage

Define a storage object:

```ts
import { createLocalStorage } from ".";

export interface MySchema {
  propertyOne: number;
  propertyTwo: string;
}

export const myStorage = createLocalStorage<MySchema>("namespace_prefix", {
  propertyOne: 1,
  propertyTwo: "a string",
});
```

Use the object:

```ts
myStorage.propertyOne = 42;

console.log(myStorage.propertyOne);
// prints "42" to the console

myStorage.propertyTwo = 42;
// typescript throws an error since "propertyTwo" expects a string
```
