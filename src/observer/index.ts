import Dep from "./dep";
import { isObject } from "../utils/getType";

export function observe(value: any | Array<any>) {
  if (Array.isArray(value)) {
    observeArray(value);
  } else {
    walk(value);
  }
}

function walk(obj: any) {
  if (!isObject(obj)) return;
  const keys = Object.keys(obj);

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const value = obj[key];
    defineReactive(obj, key, value);
    if (typeof value === "object") {
      observe(value);
    }
  }
}

function observeArray(arr: any) {
  for (let item of arr) {
    walk(item);
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
      if (typeof val === "object") {
        observe(val);
      }
      dep.notify();
    }
  });
}
