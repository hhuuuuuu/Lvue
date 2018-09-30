import Dep from "./dep";

export function observe(value: any | Array<any>) {
  walk(value);
}

function walk(obj: any) {
  const keys = Object.keys(obj);

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    defineReactive(obj, key, obj[key]);
  }
}

export function defineReactive(obj: any, key: string, val: any) {
  //   const property = Object.getOwnPropertyDescriptor(obj, key) || {};
  //   const { get: getter, set: setter } = property;

  const dep: Dep = new Dep();
  console.log(dep);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(): any {
      //const value: any = getter ? getter.call(this) : val;
      console.log("get value");
      if (Dep.target) {
        dep.pushSub();
      }
      return val;
    },
    set(newVal) {
      console.log("setvalue");
      //const value = getter ? getter.call(obj) : val;
      //   if (setter) {
      //     setter.call(obj, newVal);
      //   } else {
      //     val = newVal;
      //   }

      val = newVal;
      dep.notify();
    }
  });
}
