import Vue from 'vue';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import DhSizer from '../../../src/sizer/index';
import DhSizerInput from '../../../src/sizer_input/index';
import DhSizerDate from '../../../src/sizer_date/index';
// import DhSizerDropdown from '../../../src/sizer_dropdown/index';
import DhSizerRadio from '../../../src/sizer_radio/index';
import DhSizerCheckbox from '../../../src/sizer_checkbox/index';
import ElementUI from 'element-ui';
import ElRadio from 'element-ui/lib/radio';
import ElRadioGroup from 'element-ui/lib/radio-group';
import ElCheckbox from 'element-ui/lib/checkbox';
import { sizerData } from './mockData';
Vue.use(ElementUI);
describe('DhSizer组件单元测试', function () {
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
  const wrapper = mount(DhSizer, {
    propsData: {
      filters: sizerData.sizerProps.filters,
      filterable: sizerData.sizerProps.filterable
    },
    provide: {
      async $mpGetOptions(optionsId) {
        let optionData = sizerData['optionsData'][optionsId] ? sizerData['optionsData'][optionsId] : sizerData['optionsData']['default'];
        return optionData;
      }
    }
  });
  const currentDate = new Date();
  describe('基本渲染用例测试', function () {
    it('全量组件', () => {
      expect(wrapper.name()).to.be.equal('DhSizer'); // 判断组件名是否正确
      expect(wrapper.classes()[0]).to.be.equal('dh-sizer'); // 判断组件名是否正确
      expect(wrapper.contains('.dh-sizer-input')).to.be.equal(true); // 测试是否渲染出子组件
      expect(wrapper.contains('.dh-sizer-radio')).to.be.equal(true);
      expect(wrapper.contains('.dh-sizer-checkbox')).to.be.equal(true);
      expect(wrapper.contains('.dh-sizer-date')).to.be.equal(true);
      expect(wrapper.contains('.dh-sizer-time')).to.be.equal(false);
      expect(wrapper.contains('.dh-sizer-dropdown')).to.be.equal(false);
    });
    it('element-ui组件', () => {
      expect(wrapper.contains('.el-input')).to.be.equal(true); // 测试是否渲染出子组件
      // expect(wrapper.contains('.el-select')).to.be.equal(true);
      expect(wrapper.contains('.el-radio')).to.be.equal(true);
      expect(wrapper.contains('.el-checkbox')).to.be.equal(true);
      expect(wrapper.contains('.el-date-editor')).to.be.equal(true);
    });
  });
  describe('事件触发测试', function () {
    it('DhSizerInput组件', () => {
      const sizerInput = wrapper.find(DhSizerInput);
      const inputDom = sizerInput.find('input[type="text"]');
      inputDom.setValue('input输入测试');
      expect(inputDom.element.value).to.be.equal('input输入测试'); // 测试输入
      // expect(sizerInput.emitted().havechange.length).to.be.equal(1);
      // expect(sizerInput.emitted().input.length).to.be.equal(1);
      // expect(wrapper.emitted().sizerChange.length).to.be.equal(3);
    });
    it('DhSizerRadio组件', () => {
      // let sizerRadio = wrapper.find(DhSizerRadio);
      // expect(JSON.stringify(sizerRadio.vm.$data.options)).to.be.equal(JSON.stringify([{
      //   value: '1',
      //   label: 'a'
      // },{
      //   value: '2',
      //   label: 'b'
      // }]));
      // expect(sizerRadio.vm.$data.radioVal).to.be.equal('1');
      // expect(sizerRadio.emitted().input.length).to.be.equal(1);
      // expect(wrapper.emitted().sizerChange.length).to.be.equal(3); // 测试dh-sizer组件事件触发次数
      // let eleRadioGroup = sizerRadio.find(ElRadioGroup);
      // let radio2 = eleRadioGroup.findAll(ElRadio).at(1);
      // radio2.find('input[type="radio"]').setChecked();
      // expect(sizerRadio.vm.$data.radioVal).to.be.equal('2');
      // expect(wrapper.emitted().sizerChange.length).to.be.equal(4);
      // radio2.find('input[type="radio"]').trigger('click');
      // radio2.find('input[type="radio"]').trigger('change');
    });
    it('DhSizerDate组件', () => {
      let sizerDate = wrapper.find(DhSizerDate);
      expect(sizerDate.vm.$data.dataValue).to.be.equal('');
      sizerDate.vm.handleChange(currentDate);
      expect(wrapper.vm.$data.formModel.m_date).to.be.equal(currentDate);
      // expect(wrapper.emitted().sizerChange.length).to.be.equal(5);
    });
    it('DhSizerCheckbox组件', () => {
      // let sizerCheckbox = wrapper.find(DhSizerCheckbox);
      // expect(JSON.stringify(sizerCheckbox.vm.$data.options)).to.be.equal(JSON.stringify(sizerData['optionsData'][sizerCheckbox.vm.$props.optionsId]));
      // expect(sizerCheckbox.emitted().input.length).to.be.equal(1);
      // let checkbox3 = sizerCheckbox.findAll(ElCheckbox).at(2);
      // checkbox3.find('input[type="checkbox"]').setChecked(); // 选中第三个checkbox
      // expect(JSON.stringify(sizerCheckbox.vm.$data.checkboxVal)).to.be.equal(JSON.stringify(['3']));
      // expect(sizerCheckbox.emitted().input.length).to.be.equal(2);
      // let checkbox2 = sizerCheckbox.findAll(ElCheckbox).at(1);
      // checkbox2.find('input[type="checkbox"]').setChecked(); // 选中第二个checkbox
      // expect(JSON.stringify(sizerCheckbox.vm.$data.checkboxVal)).to.be.equal(JSON.stringify(['3','2']));
      // checkbox3.find('input[type="checkbox"]').setChecked(false);// 取消第三个checkbox选中状态
      // expect(JSON.stringify(sizerCheckbox.vm.$data.checkboxVal)).to.be.equal(JSON.stringify(['2']));
      // expect(sizerCheckbox.emitted().input.length).to.be.equal(4);
    });
    it('DhSizer组件事件触发次数', ()=> {
      // expect(wrapper.emitted().sizerChange.length).to.be.equal(8);
    });
    it('DhSizer组件数据', () => {
      expect(wrapper.vm.$data.formModel['name']).to.be.equal('input输入测试');
      expect(wrapper.vm.$data.formModel['m_date']).to.be.equal(currentDate);
      // expect(wrapper.vm.$data.formModel['sex']).to.be.equal('2');
      // expect(JSON.stringify(wrapper.vm.$data.formModel['connection'])).to.be.equal(JSON.stringify(['2']));
    });
  });
});
