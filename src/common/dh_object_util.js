/**
 * 根据字符串形式的属性路径取值和赋值
 */
const propertyPathRegex = /^[\$\w]+(\[\d+\])*(\.[\$\w]+(\[\d+\])*)*$/; // eslint-disable-line
const splitter = /[\.\[\]]/; // eslint-disable-line

export function setProperty(target, propertyPath, value) {
  if (propertyPathRegex.test(propertyPath)) {
    let paths = parsePath(propertyPath);
    for (let i = 0; i < paths.length; ++i) {
      let p = paths[i];
      if (i === paths.length - 1) {
        target[p] = value;
      } else {
        if (target[p] === undefined || target[p] === null) {
          let nextP = paths[i + 1];
          if (typeof nextP === 'number') {
            target[p] = [];
          } else {
            target[p] = {};
          }
        }
        target = target[p];
      }
    }
  } else {
    throw new Error('invalid property path!');
  }
}

export function getProperty(obj, propertyPath) {
  if (propertyPathRegex.test(propertyPath)) {
    let paths = parsePath(propertyPath);
    for (let i = 0; i < paths.length; ++i) {
      let p = paths[i];
      obj = obj[p];
      if (obj === undefined || obj === null) {
        throw new Error(`property [${propertyPath}] is not defined`);
      }
    }
    return obj;
  } else {
    throw new Error('invalid property path!');
  }
}

function parsePath(path) {
  let arr = path.split(splitter);
  let ret = [];
  arr.forEach(elem => {
    if (elem) {
      let n = Number(elem);
      if (isNaN(n)) {
        ret.push(elem);
      } else {
        ret.push(n);
      }
    }
  });
  return ret;
}

/**
 * 遍历对象上的属性名称，过滤出以指定后缀结尾的属性和它的值，组装成一个新对象返回出来
 * @param {要读取的对象} obj
 * @param {属性名称后缀} propertyEndWithName
 */
export function getPropertyEndWith(obj, propertyEndWithName) {
  const regex = new RegExp(`(^|\\.)${propertyEndWithName}(#\\d+)?$`);
  return Object.keys(obj).filter(k => regex.test(k)).reduce((result, k) => {
    result[k] = obj[k];
    return result;
  }, {});
}
