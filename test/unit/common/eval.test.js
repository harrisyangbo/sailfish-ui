import runtime from '../../../src/common/dh_eval';

describe('dh_eval_test', function () {
  const thisObject = {
    isServer: true
  };
  const context = {
    $filter: {
      uid: 12,
      teacherName: 'Tom',
      sex: 1
    },
    $row: {
      entityId: 13,
      teacherName: 'Lucy',
      createTime: '150383746593'
    }
  };
  before(function () {
    // 在本区块的所有测试用例之前执行
  });

  after(function () {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function () {
    // 在本区块的每个测试用例之后执行
  });

  it('run_expression_and_return_correctly', () => {
    let r = runtime.runExpression('this.isServer === true', thisObject, context);
    expect(r).to.be.true;
    r = runtime.runExpression('this.isServer === false', thisObject, context);
    expect(r).to.be.false;

    r = runtime.runExpression('$filter.uid === 12', thisObject, context);
    expect(r).to.be.true;
    r = runtime.runExpression('$row.teacherName === "Lucy"', thisObject, context);
    expect(r).to.be.true;

    let fn = () => runtime.runExpression('document.title === "Lucy"', thisObject, context);
    expect(fn).to.throw(Error);

    fn = () => runtime.runExpression('if (document.title === "Lucy")', thisObject, context);
    expect(fn).to.throw(Error);
  });

  it('run_script_and_return_correctly', () => {
    let r = runtime.runFunction(`
      function () {
        return {
          uid: $filter.uid,
          isServer: this.isServer,
          teacherName: $row.teacherName
        };
      }
    `, thisObject, context);
    expect(r.uid).to.be.equal(12);
    expect(r.isServer).to.be.true;
    expect(r.teacherName).to.be.equal('Lucy');
  });

  it('run_expression_and_return_correctly_without_Proxy', () => {
    const originalProxy = window.Proxy;
    try {
      window.Proxy = undefined;
      let r = runtime.runExpression('this.isServer === true', thisObject, context);
      expect(r).to.be.true;
      r = runtime.runExpression('this.isServer === false', thisObject, context);
      expect(r).to.be.false;

      r = runtime.runExpression('$filter.uid === 12', thisObject, context);
      expect(r).to.be.true;
      r = runtime.runExpression('$row.teacherName === "Lucy"', thisObject, context);
      expect(r).to.be.true;

      let fn = () => runtime.runExpression('document.title === "Lucy"', thisObject, context);
      let s = fn();
      expect(s).to.be.false;
    } finally {
      window.Proxy = originalProxy;
    }
  });

  it('run_script_and_return_correctly_without_Proxy', () => {
    const originalProxy = window.Proxy;
    try {
      window.Proxy = undefined;
      let r = runtime.runFunction(`
        function () {
          return {
            uid: $filter.uid,
            isServer: this.isServer,
            teacherName: $row.teacherName
          };
        }
      `, thisObject, context);
      expect(r.uid).to.be.equal(12);
      expect(r.isServer).to.be.true;
      expect(r.teacherName).to.be.equal('Lucy');

      let fn = () => runtime.runFunction(`
      {
        uid: $filter.uid,
        isServer: this.isServer,
        teacherName: $row.teacherName
      };
      `, thisObject, context);
      expect(fn).to.throw(Error);
    } finally {
      window.Proxy = originalProxy;
    }
  });
});
