import validator from '../../../src/validator/index';
import config from './example';

describe('validator_test', function () {
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

  it('dropdown_filter_config_should_be_validated_correctly', () => {
    try {
      validator.check(config);
      expect(true).to.be.true;
    } catch (e) {
      console.error(e);
      expect(true).to.be.false;
    }


  });



});
