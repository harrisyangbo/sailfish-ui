import Vue from 'vue';
import { mount } from '@vue/test-utils';
// import messageBoxPlugin from '../../src/index';
import DhSizerDropdown from '../../../src/sizer_dropdown/index';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

describe('sizer_dropdown', function () {
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

  // it('dropdown选择框测试', async () => {
  //   let parentData = {
  //     label: 'label',
  //     name: 'test-name',
  //     immediate: false,
  //     value: {
  //       label: '测试1',
  //       value: '1'
  //     },
  //     options: [
  //       {
  //         label: '测试1',
  //         value: '1'
  //       },
  //       {
  //         label: '测试2',
  //         value: '2'
  //       }
  //     ]
  //   };
  //   let wrapper = mount(DhSizerDropdown, {
  //     propsData: parentData
  //   });
  //   expect(wrapper.name()).to.be.equal('DhSizerDropdown'); // 判断组件名是否正确
  //   const select = wrapper.findAll('.el-scrollbar').at(0);
  //   expect(select.is('div')).to.be.equal(true);

  // expect(wrapper.emitted().input).to.be.truthy(true);
  // });
  
});
