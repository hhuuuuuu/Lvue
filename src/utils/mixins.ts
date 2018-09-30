/**
 * 多重继承装饰器
 * @param baseCtors {Function[]}
 * @return Function
 */
const mixins: Function = function(...baseCtors: Function[]): Function {
  return function(derivedCtor: Function): Function {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
    });
    return derivedCtor;
  };
};

export default mixins;
