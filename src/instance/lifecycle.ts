import Lvue from "../instance/index";

export function initLifecycle(vm: Lvue) {
  vm._isMounted = false;
}

export function callHook(vm: Lvue, hook: string) {
  const hookHandlers: Function = vm.$options[hook];
  if (hookHandlers) {
    try {
      hookHandlers.call(vm);
    } catch (e) {
      console.log(e);
    }
  }
}
