import Dep from "./dep";
import { isObject } from "../utils/getType";

export function observe(value: any | Array<any>) {
  walk(value);
}

function walk(obj: any) {
  const keys = Object.keys(obj);

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const value = obj[key];
    defineReactive(obj, key, value);
    if (isObject(value)) {
      observe(value);
    }
  }
}

export function defineReactive(obj: any, key: string, val: any) {
  //   const property = Object.getOwnPropertyDescriptor(obj, key) || {};
  //   const { get: getter, set: setter } = property;

  const dep: Dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(): any {
      console.log("get value");
      if (Dep.target) {
        dep.pushSub();
      }
      return val;
    },
    set(newVal) {
      console.log("setvalue");
      val = newVal;
      if (isObject(val)) {
        observe(val);
      }
      dep.notify();
    }
  });
}
