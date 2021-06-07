class TemplateAnalyzer {
  public sourceStr: string; // 源字符串
  public tempStart: string; // 开始字符
  public tempEnd: string; // 结束字符
  public regexp: RegExp | null; // 正则表达式
  public replaceReg: RegExp | null; // 替换字符串的正则表达式
  constructor(sourceStr: string, tempStart: string, tempEnd: string) {
    this.sourceStr = sourceStr || '';
    this.tempStart = tempStart || '{{';
    this.tempEnd = tempEnd || '}}';
    this.regexp = null;
    this.replaceReg = null;
  }

  createRegexp(): RegExp | null {
    if (this.tempStart.length > 2 || this.tempEnd.length > 2) {
      throw new Error('开始和结束模板字符超出最大长度限制!')
    }
    if (this.tempStart.length !== this.tempEnd.length) {
      throw new Error('开始和结束模板字符长度不相等!')
    }
    // 生成正则表达式
    if (this.tempStart.length > 1 && this.tempEnd.length > 1) {
      let startArr = this.tempStart.split('');
      let endArr = this.tempEnd.split('');
      eval("this.regexp = /\\" + startArr[0] + "\\" + startArr[1] + "[\\s\\S]*" + "\\" + endArr[0] + "\\" + endArr[1] + "/g")
      eval("this.replaceReg = /^\\" + startArr[0] + "\\" + startArr[1] + "|" + "\\" + endArr[0] + "\\" + endArr[1] + "$/g")
    } else {
      eval("this.regexp = /\\" + this.tempStart + "[\\s\\S]*" + "\\" + this.tempEnd + "/g")
      eval("this.replaceReg = /^\\" + this.tempStart + "|" + "\\" + this.tempEnd + "$/g")
    }
    return this.regexp;
  }

  matchTemplate() {
    // 匹配模板字符串
    let regexp = this.createRegexp();
    if (regexp !== null) {
      let matchArr = this.sourceStr.match(regexp);
      return matchArr || [];
    } else {
      throw new Error('没有生成有效的正则表达式!')
    }
  }

  createTemplateMap() {
    // 生成模板字符串的map
    let matchArr = this.matchTemplate();
    if (matchArr.length <= 0) throw new Error('没有匹配到模板字符!');
    if (this.replaceReg === null) throw new Error('没有生成可用于替换的正则表达式!');
    let tempMap = {};
    matchArr.forEach((item) => {
      if (this.replaceReg) {
        let param: string = item.replace(this.replaceReg, '');
        tempMap[param] = {
          source: item,
          result: null
        }
      }
    })
    return tempMap;
  }

  getDataModel(tempStr = '', dataModel = {}) {
    // 拆分要匹配的字符串并从dataModel取值
    let dataModelKeys = Object.keys(dataModel) || []
    let fn = new Function(...dataModelKeys ,`return ${tempStr}`)
    let args = dataModelKeys.map((item) => {
      return dataModel[item]
    })
    try {
      return fn(...args)
    } catch (e) {
      console.error("@xes/fe-template-analyzer: 模板解析失败!")
      return tempStr;
    }
    // if (tempStr.indexOf('.') !== -1) {
    //   let strArr = tempStr.split('.');
    //   if (dataModel[strArr[0]]) {
    //     let oneStr = `${strArr[0]}.`
    //     let otherStr = tempStr.replace(oneStr, '');
    //     return this.getDataModel(otherStr, dataModel[strArr[0]]);
    //   } else {
    //     return undefined;
    //   }
    // } else { 
    //   // 判断是否通过[]的方式取值
    //   let matchs = tempStr.match(/\[[a-zA-Z_.\d\$]\]/g)
    //   if (matchs && matchs.length > 0) {
    //     return this.getDataModelByArray(tempStr, dataModel)
    //   }
    //   return dataModel[tempStr]
    // }
  }
  
  getDataModelByArray(tempStr: string | number, dataModel: DataModel): any {
    // 处理通过[]的方式取值
    if (typeof tempStr === 'string' && tempStr.indexOf('\[') !== -1) {
      let matchs = tempStr.match(/\[[a-zA-Z_.\d\$]\]/g);
      let strKeys = tempStr.match(/[a-zA-Z_.\d\$]+(?=\[)/);
      if (strKeys && matchs) {
        let datas = dataModel[strKeys[0]]
        if (datas instanceof Array) {
          let matchInde = matchs[0].match(/\d/)
          let ind = matchInde ? ~~matchInde[0] : null;
          return ind === 0 || ind ? datas[ind] : tempStr;
        }
      }
    }
    return dataModel[tempStr]
  }

  result(dataModel: DataModel): boolean | string | number {
    // 结果
    let tempMap = this.createTemplateMap();
    let sourceStr = this.sourceStr
    Object.keys(tempMap).forEach((item) => {
      tempMap[item]['result'] = this.getDataModel(item, dataModel);
      let tempMapRes = '';
      if (sourceStr.indexOf(tempMap[item]['source']) !== -1) {
        if (typeof tempMap[item]['result'] === 'string') {
          tempMapRes = `'${tempMap[item]['result']}'`;
        } else {
          tempMapRes = tempMap[item]['result'];
        }
        sourceStr = sourceStr.replace(tempMap[item]['source'], tempMapRes) 
      }
    })
    try {
      let res = eval(sourceStr)
      return res;
    } catch(e) {
      return sourceStr;
    }
  }
}

export default TemplateAnalyzer;