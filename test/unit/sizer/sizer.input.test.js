import Vue from 'vue';
import { mount } from '@vue/test-utils';
// import messageBoxPlugin from '../../src/index';
import DhSizerInput from '../../../src/sizer_input/index';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

describe('sizer_input组件', function () {
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

  it('input输入框测试', async () => {
    let parentData = {
      label: 'label',
      name: 'test-name',
      immediate: false,
      placeholder: '测试placeholder',
      value: '测试value'
    };
    let wrapper = mount(DhSizerInput, {
      propsData: parentData
    });
    expect(wrapper.name()).to.be.equal('DhSizerInput'); // 判断组件名是否正确
    // expect(wrapper.classes('dh-sizer-input')).to.be.equal(true); // 判断是否渲染出元素
    expect(wrapper.html()).contain('<input type="text" autocomplete="off" placeholder="测试placeholder" class="el-input__inner">'); // 判断是否渲染出el-input
    
    // 测试v-model
    wrapper.find('input[type="text"]').setValue('测试输入');
    wrapper.find('input[type="text"]').setValue('测试输入22');
    expect(wrapper.emitted().input.length).to.be.equal(2);

    wrapper.setProps({
      immediate: true
    });
    wrapper.find('input[type="text"]').setValue('测试实时搜索');
    expect(wrapper.emitted().input.length).to.be.equal(3);
    // expect(wrapper.emitted().search.length).to.be.equal(1);
  });
  
});
