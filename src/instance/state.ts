import Lvue from "../instance/index";
import { observe } from "../observer/index";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true
};

export function proxy(target: Lvue, sourceKey: string, key: string) {
  Object.defineProperty(target, key, {
    ...sharedPropertyDefinition,
    get() {
      return this[sourceKey][key];
    },
    set(value) {
      this[sourceKey][key] = value;
    }
  });
}

export function initState(vm: Lvue) {
  const data = (vm._data = vm.$options.data.call(vm));

  Object.keys(data).forEach(key => {
    proxy(vm, "_data", key);
  });

  observe(data);
}
