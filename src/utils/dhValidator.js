import AsyncValidator from 'async-validator';

class DhValidator{
  /**
   * @params validateModel Object
   * {
   *   'keyName': {
   *     rules: [],
   *     value: '',
   *     callback: function(){}
   *    }
   * }
   * @params rules  校验规则
   * @params value  要校验的值
   * @params callback 校验失败的回调
   * **/
  constructor(validateModel) {
    this.validateModel = validateModel;
    this.descriptor = {};
    this.model = {};
    this.callback = {};
    this.asyncValidator = null;
  }
  init() {
    if (typeof this.validateModel !== 'object') {
      throw new Error('校验规则格式错误！');
    }
    Reflect.ownKeys(this.validateModel).forEach((item) => {
      this.descriptor[item] = this.validateModel[item]['custom'] || this.validateModel[item]['rules'] || [];
      this.model[item] = this.validateModel[item]['value'] || '';
      this.callback[item] = this.validateModel[item]['callback'] || null;
    });
    this.asyncValidator = new AsyncValidator(this.descriptor);
    return this;
  }
  dhValidate() {
    let valide = [];
    this.asyncValidator.validate(this.model, (errors, fields) => {
      if (errors && errors.length > 0) {
        errors.forEach((err) => {
          this.validateModel[err.field].callback(err, err.message);
        });
        valide.push(false);
      } else {
        valide.push(true);
      }
    });
    return valide;
  }

  validatePromise() {
    return new Promise((resolve, reject) => {
      this.asyncValidator.validate(this.model, (errors, fields) => {
        if (errors && errors.length > 0) {
          errors.forEach((err) => {
            this.validateModel[err.field].callback(err, err.message);
          });
          reject({
            errors,
            fields
          });
          // valide.push(false);
        } else {
          resolve();
          // valide.push(true);
        }
      });
    });
  }
}

export default DhValidator;