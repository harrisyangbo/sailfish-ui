/**
 * 支持Proxy的运行时采用下列方法模拟严格的作用域
 */
// 动态解析脚本d代码，由于目前未引入babel编译，不支持太高级的es语法特性，建议使用兼容程度较高的es5以下语法

import { decodeHTML } from './dh_html_escape';

const sandboxProxies = new WeakMap();

function compileCode(src) {
  src = 'with (sandbox) {' + src + '}';
  const code = new Function('sandbox', 'params', src);

  return function (sandbox, params) {
    if (!sandboxProxies.has(sandbox)) {
      const sandboxProxy = new Proxy(sandbox, {has, get});
      sandboxProxies.set(sandbox, sandboxProxy);
    }
    return code.apply(this, [sandboxProxies.get(sandbox), params]);
  };
}

function has() {
  return true;
}

function get(target, key) {
  if (key === Symbol.unscopables) return undefined;
  return target[key];
}

/**
 * 不支持Proxy的运行时采用下列方法模拟作用域，但是无法屏蔽全局作用域
 */
function compileCodeWithoutProxy(src) {
  src = 'with (sandbox) {' + src + '}';
  return new Function('sandbox', 'params', src);
}

function createRunnableScope(src) {
  if (window.Proxy) {
    return compileCode(src);
  } else {
    return compileCodeWithoutProxy(src);
  }
}

export default {
  runExpression(expression, thisObject, context = {}) {
    expression = decodeHTML(expression);
    let fn = createRunnableScope(`return ${expression};`);
    try {
      return Boolean(fn.call(thisObject, context));
    } catch (e) {
      throw new Error(e.message ? e.message : 'invalid expression');
    }
  },
  runFunction(functionScript, thisObject, context = {}, ...params) {
    functionScript = decodeHTML(functionScript);
    let fn = createRunnableScope(`return (${functionScript}).apply(this, params);`);
    try {
      let newContext = Object.assign({}, context, { console: console }); // debug
      return fn.apply(thisObject, [newContext, params]);
    } catch (e) {
      throw new Error(e.message ? e.message : 'invalid function');
    }
  },
  runFunctionWithoutSandbox(functionScript, thisObject, context = {}, ...params) {
    functionScript = decodeHTML(functionScript);
    let fn = compileCodeWithoutProxy(`return (${functionScript}).apply(this, params);`);
    try {
      return fn.apply(thisObject, [context, params]);
    } catch (e) {
      throw new Error(e.message ? e.message : 'invalid function');
    }
  }
};
