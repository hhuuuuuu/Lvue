import Watcher from "./watcher";

export default class Dep {
  static target: any;
  private subs: Array<Watcher>;
  private subIds: Array<number>;

  constructor() {
    this.subs = [];
    this.subIds = [];
  }

  public pushSub(): void {
    const watcherId = Dep.target.id;
    if (this.subIds.indexOf(watcherId) < 0) {
      this.subIds.push(watcherId);
      this.subs.push(Dep.target);
    }
  }

  public notify(): void {
    this.subs.forEach(item => {
      item.update();
    });
  }

  public static setTarget(target: any): void {
    Dep.target = target;
  }
}
