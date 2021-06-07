import { shallowMount, createLocalVue } from '@vue/test-utils';
import authorityPlugin, { DhAuthorityContainer, DhAuthorityItem } from '../../../src/authortity/index';

authorityPlugin.hasPermitHandler = (authorityCode) => {
  return ['search'].includes(authorityCode);
};

describe('authorityContainer_test', function () {
  const localVue = createLocalVue();
  localVue.use(authorityPlugin);

  it('should_be_shown_correctly', () => {
    const wrapper = shallowMount(DhAuthorityContainer, {
      slots: {
        default: `
        <dh-authority-item :authority-code="'search'" :show-condition="true"><h3>hello</h3></dh-authority-item>
        <dh-authority-item :authority-code="'search'" :show-condition="true"><h4>hello</h4></dh-authority-item>
        <dh-authority-item :authority-code="'search'" :show-condition="'1 === 1'"><h5>hello</h5></dh-authority-item>
        `
      },
      localVue
    });
    expect(wrapper.find('h3').exists()).to.be.true;
    expect(wrapper.find('h4').exists()).to.be.true;
    expect(wrapper.find('h5').exists()).to.be.true;
  });

  it('should_be_hidden_correctly', () => {
    const wrapper = shallowMount(DhAuthorityContainer, {
      slots: {
        default: `
        <dh-authority-item :authority-code="'edit'" :show-condition="true"><h3>hello</h3></dh-authority-item>
        <dh-authority-item :authority-code="'search'" :show-condition="false"><h4>hello</h4></dh-authority-item>
        <dh-authority-item :authority-code="'search'" :show-condition="1 === 2"><h5>hello</h5></dh-authority-item>
        `
      },
      localVue
    });
    expect(wrapper.find('h3').exists()).to.be.false;
    expect(wrapper.find('h4').exists()).to.be.false;
    expect(wrapper.find('h5').exists()).to.be.false;
  });

  it('should_be_hidden_correctly_single_item', () => {
    const wrapper = shallowMount(DhAuthorityContainer, {
      slots: {
        default: `
        <dh-authority-item :authority-code="'edit'" :show-condition="true"><h3>hello</h3></dh-authority-item>
        `
      },
      localVue
    });
    expect(wrapper.find('h3').exists()).to.be.false;
  });
});

describe('authorityItem_test', function () {
  const localVue = createLocalVue();
  localVue.mixin({
    methods: {
      hasPermit(authorityCode) {
        return ['search'].includes(authorityCode);
      }
    }
  });
  const wrapper = shallowMount(DhAuthorityItem, {
    slots: {
      default: '<h6>hello</h6>'
    },
    localVue
  });

  it('should_be_rendered_correctly_by_default_props', async () => {
    expect(wrapper.find('h6').exists()).to.be.true;
  });

  it('should_be_rendered_correctly_by_typical_props', async () => {
    wrapper.setProps({
      authorityCode: 'search',
      showCondition: true
    });
    expect(wrapper.find('h6').exists()).to.be.true;
  });

  it('should_be_rendered_correctly_when_no_auth', () => {
    wrapper.setProps({
      authorityCode: 'edit',
      showCondition: true
    });
    expect(wrapper.find('h6').exists()).to.be.false;
  });

  it('should_be_rendered_correctly_when_showCondition_is_false', () => {
    wrapper.setProps({
      authorityCode: 'search',
      showCondition: false
    });
    expect(wrapper.find('h6').exists()).to.be.false;
  });

  it('should_be_rendered_correctly_when_showCondition_expression_is_false', () => {
    wrapper.setProps({
      authorityCode: 'search',
      showCondition: '1 === 2'
    });
    expect(wrapper.find('h6').exists()).to.be.false;
  });

  it('should_be_rendered_correctly_when_showCondition_expression_is_false', () => {
    wrapper.setProps({
      authorityCode: 'search',
      showCondition: 34
    });
    expect(wrapper.find('h6').exists()).to.be.true;
  });
});
