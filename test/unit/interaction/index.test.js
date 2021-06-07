import { shallowMount, createLocalVue } from '@vue/test-utils';
import dhInteraction from '../../../src/interaction/src/interaction.vue';
import { mock } from 'mockjs';
import elButton from 'element-ui/lib/button.js';
import request from '@xes/dh-module-request';

describe('interaction_index_test', function () {

  const localVue = createLocalVue();
  localVue.use(elButton);

  let newBrowserUrl = '';
  window.open = function (url) {
    newBrowserUrl = url;
  };

  let errorResult = {};
  let errorCallback = () => {};
  let successResult = {};
  let successCallback = () => {};
  const mockMessage = function ({
    message,
    type
  }) {
    successResult = { message, type };
    successCallback(successResult);
  };
  mockMessage.error = function (message) {
    errorResult = { message };
    errorCallback(errorResult);
  };

  let confirmResult = {};
  const mockConfirm = function (content, title, {
    confirmButtonText,
    cancelButtonText,
    type
  }) {
    return new Promise((resolve, reject) => {
      confirmResult = {
        content,
        title,
        confirmButtonText,
        cancelButtonText,
        type,
        clickConfirm: resolve,
        clickCancel: reject
      };
    });
  };

  const wrapper = shallowMount(dhInteraction, {
    slots: {
      default: 'edit'
    },
    localVue,
    provide: {
      async $mpDoAjaxAction(uri, params) {
        let res = await request.post(uri, params);
        if (res.error_code === 0) {
          return res.result;
        } else {
          throw new Error(res.message);
        }
      }
    },
    mocks: {
      $message: mockMessage,
      $confirm: mockConfirm
    }
  });

  let postResponseCallback = () => {};
  before(function () {
    // 在本区块的所有测试用例之前执行
    mock(/api\/teacher\/audit/, 'post', function (options) {
      postResponseCallback(JSON.parse(options.body));
      return {
        error_code: 0,
        message: 'ok~',
        result: {}
      };
    });

    mock(/api\/teacher\/fail/, 'post', function (options) {
      postResponseCallback(JSON.parse(options.body));
      return {
        error_code: 10011,
        message: 'some error',
        result: {}
      };
    });
  });

  beforeEach(function () {
    newBrowserUrl = '';
    errorResult = {};
    successResult = {};
    confirmResult = {};
    errorCallback = () => {};
    successCallback = () => {};
    postResponseCallback = () => {};
  });

  it('page模式下能够正确的渲染，并且正常打开新页面，不带参数', () => {
    wrapper.setProps({
      label: 'view',
      mode: 'page',
      batch: false,
      confirmText: '',
      uri: 'https://www.baidu.com',
      script: '',
      renderLinkButton: false,
      context: {}
    });

    expect(wrapper.vm.entityIds.length).to.be.equal(0);
    expect(wrapper.vm.isRenderLinkButton).to.be.true;

    let a = wrapper.find('a');
    expect(a.exists()).to.be.true;
    expect(a.text()).to.be.equal('edit');

    let b = wrapper.find(elButton);
    expect(b.exists()).to.be.false;

    a.trigger('click');
    expect(newBrowserUrl).to.be.equal('https://www.baidu.com');

  });

  it('page模式下能够正确打开新页面，带参数', () => {
    wrapper.setProps({
      label: 'view',
      mode: 'page',
      batch: false,
      confirmText: '',
      uri: 'https://www.baidu.com',
      script: '',
      renderLinkButton: false,
      context: {
        $rows: [
          {
            entity_id: 14
          }
        ]
      }
    });

    expect(wrapper.vm.entityIds.length).to.be.equal(1);
    expect(wrapper.vm.isRenderLinkButton).to.be.true;

    let a = wrapper.find('a');
    a.trigger('click');
    expect(newBrowserUrl).to.be.equal('https://www.baidu.com?entity_id=14');

  });

  it('ajax模式下能够正确渲染', () => {
    wrapper.setProps({
      mode: 'ajax',
      batch: true,
      confirmText: 'confirm?',
      uri: '/api/teacher/audit',
      script: '',
      renderLinkButton: false,
      context: {}
    });

    expect(wrapper.vm.entityIds.length).to.be.equal(0);
    expect(wrapper.vm.isRenderLinkButton).to.be.false;

    let a = wrapper.find('a');
    expect(a.exists()).to.be.false;

    let b = wrapper.find(elButton);
    expect(b.exists()).to.be.true;
    expect(b.text()).to.be.equal('edit');
  });

  it('ajax模式下没有传递处理参数，弹出错误提示', () => {
    wrapper.setProps({
      mode: 'ajax',
      batch: true,
      confirmText: 'confirm?',
      uri: '/api/teacher/audit',
      script: '',
      renderLinkButton: false,
      context: {}
    });
    let b = wrapper.find(elButton);
    b.vm.$emit('click');
    expect(errorResult.message).to.be.equal('没有传递需要处理的数据ID');
  });

  it('ajax模式下能够正确弹出确认框，并且正常取消', () => {
    wrapper.setProps({
      mode: 'ajax',
      batch: true,
      confirmText: 'confirm?',
      uri: '/api/teacher/audit',
      script: '',
      renderLinkButton: false,
      context: {
        $rows: [{
          entity_id: 1
        }, {
          entity_id: 2
        }]
      }
    });

    let b = wrapper.find(elButton);
    b.vm.$emit('click');
    expect(errorResult.message).to.be.undefined;
    expect(confirmResult.content).to.be.equal('confirm?');
    confirmResult.clickCancel();
  });

  it('ajax模式下能够批量传参，并且正确执行script注入脚本返回上报的数据，并且数据正确', (done) => {
    wrapper.setProps({
      mode: 'ajax',
      batch: true,
      confirmText: 'confirm?',
      uri: '/api/teacher/audit',
      script: `
      function() {
        return {
          sum: $rows.reduce((a, b) => a.entity_id + b.entity_id)
        };
      }
      `,
      renderLinkButton: false,
      context: {
        $rows: [{
          entity_id: 1
        }, {
          entity_id: 2
        }]
      }
    });
    postResponseCallback = postData => {
      expect(postData.entity_id.toString()).to.be.equal('1,2');
      expect(postData.sum).to.be.equal(3);
    };
    successCallback = function (data) {
      expect(data.message).to.be.equal('操作成功');
      done();
    };

    let b = wrapper.find(elButton);
    b.vm.$emit('click');
    expect(errorResult.message).to.be.undefined;
    expect(confirmResult.content).to.be.equal('confirm?');
    confirmResult.clickConfirm();
  });

  it('ajax模式下能够正确处理请求的错误', (done) => {
    wrapper.setProps({
      mode: 'ajax',
      batch: true,
      confirmText: 'confirm?',
      uri: '/api/teacher/fail',
      script: `
      function() {
        return {
          sum: $rows.reduce((a, b) => a.entity_id + b.entity_id)
        };
      }
      `,
      renderLinkButton: false,
      context: {
        $rows: [{
          entity_id: 1
        }, {
          entity_id: 2
        }]
      }
    });
    let b = wrapper.find(elButton);
    b.vm.$emit('click');
    errorCallback = function (error) {
      expect(error.message).to.be.equal('some error');
      done();
    };
    confirmResult.clickConfirm();

  });

  it('dialog模式下能够正确触发事件', (done) => {

    const wrapper1 = shallowMount(dhInteraction, {
      slots: {
        default: 'edit'
      },
      localVue,
      mocks: {
        $message: mockMessage,
        $confirm: mockConfirm
      }
    });

    wrapper1.setProps({
      label: 'view',
      mode: 'dialog',
      batch: true,
      confirmText: '',
      uri: '/portal/list/detail',
      script: '',
      renderLinkButton: false,
      context: {
        $rows: [
          {
            entity_id: 14
          },
          {
            entity_id: 15
          }
        ]
      }
    });

    expect(wrapper1.vm.entityIds.length).to.be.equal(2);
    expect(wrapper1.vm.isRenderLinkButton).to.be.false;
    wrapper1.vm.$on('showDialog', uri => {
      expect(uri).to.be.equal('/portal/list/detail?entity_id=14');
      done();
    });
    let b = wrapper1.find(elButton);
    b.vm.$emit('click');

  });

  it('docker模式下能够正确触发事件', (done) => {

    const wrapper1 = shallowMount(dhInteraction, {
      slots: {
        default: 'edit'
      },
      localVue,
      mocks: {
        $message: mockMessage,
        $confirm: mockConfirm
      }
    });

    wrapper1.setProps({
      label: 'view',
      mode: 'docker',
      batch: false,
      confirmText: '',
      uri: '/portal/list/detail',
      script: '',
      renderLinkButton: true,
      context: {
        $rows: [
          {
            entity_id: 14
          },
          {
            entity_id: 15
          }
        ]
      }
    });

    expect(wrapper1.vm.entityIds.length).to.be.equal(2);
    expect(wrapper1.vm.isRenderLinkButton).to.be.true;
    wrapper1.vm.$on('showDocker', uri => {
      expect(uri).to.be.equal('/portal/list/detail?entity_id=14');
      done();
    });
    let b = wrapper1.find('a');
    b.trigger('click');

  });

  it('js模式下报错', () => {
    wrapper.setProps({
      label: 'view',
      mode: 'js',
      batch: false,
      confirmText: '',
      uri: '',
      script: 'function () {}',
      renderLinkButton: false,
      context: {
        $rows: [
          {
            entity_id: 14
          },
          {
            entity_id: 15
          }
        ]
      }
    });

    try {
      let b = wrapper.find(elButton);
      b.vm.$emit('click');
    } catch (e) {
      expect(e.message).to.be.equal('暂不实现js模式');
    }
  });
});
