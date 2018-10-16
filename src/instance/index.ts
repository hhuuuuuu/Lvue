import mixins from "../utils/mixins";
import { initState } from "./state";
import { initLifecycle, callHook } from "./lifecycle";
import { options } from "../type/options";
import Watcher from "../observer/watcher";
import renderTemplate from "../vnode/renderTemplate";

/**
 *
 * @class Lvue
 */
// @mixins(state)
class Lvue {
  public $options: any;
  public _data: object;
  public _isMounted: boolean;
  private render: () => string | void;
  private a: string | void;
  constructor(optoins: options) {
    this._init(optoins);
  }

  /**
   * 实例初始化
   */
  private _init(options: options) {
    const vm: Lvue = this;
    vm.$options = options;
    this.render = options.render;

    initLifecycle(vm);
    callHook(vm, "beforeCreate");
    initState(vm);
    callHook(vm, "created");

    callHook(vm, "beforeMount");
    new Watcher(vm, this.renderComponent);
    callHook(vm, "mounted");
  }

  private renderComponent(vm: Lvue): void {
    const $app = document.querySelector(this.$options.el);
    const renderResult = this.render();
    if (renderResult) {
      $app.innerHTML = renderTemplate.call(this, renderResult);
    }
    // if ($app.hasChildNodes()) {
    //   $app.replaceChild(newNode, $app.childNodes[0]);
    // } else {
    //   $app.appendChild(newNode);
    // }
  }

  get $data(): object {
    return this._data;
  }
}

export default Lvue;
