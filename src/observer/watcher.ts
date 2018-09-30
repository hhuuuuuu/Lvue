import Lvue from "../instance/index";
import Dep from "./dep";
let watcherId = 0;

export default class Watcher {
  vm: Lvue;
  getter: any;
  id: number;
  constructor(vm: Lvue, expOrFn: Function | string) {
    this.id = watcherId;
    watcherId++;
    this.vm = vm;
    const type = typeof expOrFn;
    if (type === "function") {
      this.getter = expOrFn;
    } else if (type === "string") {
      this.getter = function() {
        console.log("fake wather");
      };
    }
    this.get();
  }

  get(): void {
    Dep.setTarget(this);
    try {
      this.getter.call(this.vm);
    } catch (e) {
      console.log(e);
    }
  }

  update(): void {
    console.log("update");
    this.get();
  }
}
