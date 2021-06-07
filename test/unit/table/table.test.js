import Vue from 'vue';
import { mount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import TestComp from './dev/app';
import DhTable from '../../../src/table/index';
import {mockData, mockColumns, mockOptions} from './testData';
import Init from '../../../src/index';
import TableInteraction from '../../../src/table/types/interaction';
import DhInteraction from '../../../src/interaction/src/interaction';
import { DateTime, Duration } from 'luxon';

// LOG
const LOG_SHOW = false;
const LOG = function () {
  if (LOG_SHOW) console.log.call(this, arguments);
};

Vue.use(ElementUI);
Vue.use(Init);

describe('Table', () => {
  const wrapper = mount(TestComp, {
    stubs: { transition: false },
    provide: {
      async $mpGetOptions(optionsId) {
        return mockOptions[optionsId];
      }
    }
  }).find(DhTable);

  describe('表头', () => {
    it('表头正确渲染', () => {
      let realized = wrapper.findAll('thead th:not(.gutter):not(.el-table-column--selection)').wrappers.map(item => item.text());
      let expected = mockColumns.map(item => item.label);
      LOG('表头正确渲染 - 数据比对', realized, expected);
      expect(realized).to.eql(expected);
    });
  });

  describe('表格内容', () => {
    let cells = function (columnIndex) {
      return wrapper.findAll('td:not(.el-table-column--selection) .cell').wrappers.filter((item, index) => index % mockColumns.length === columnIndex);
    };

    const Cell = {
      raw: 0,
      enumText: 1,
      enumIcon: 2,
      money: 3,
      timespan: 4,
      datetime: 5,
      thumbnail: 6,
      interaction: 7,
    };

    describe('raw', () => {
      it('正确渲染', () => {
        let realized = cells(Cell.raw).map(item => item.text());
        let expected = mockData.map(item => String(item.id));
        LOG('raw正确渲染 - 数据比对', realized, expected);
        expect(realized).to.eql(expected);
      });
    });

    describe('enum_text', () => {
      it('正确渲染', done => {
        wrapper.vm.$nextTick(() => {
          expect(cells(Cell.enumText).map(item => item.text()))
            .to.eql(mockData.map(item => mockOptions['enum1'].find(option => option.value === item.sex).label));
          done();
        });
      });
    });

    describe('enum_icon', () => {
      it('正确渲染', done => {
        wrapper.vm.$nextTick(() => {
          expect(cells(Cell.enumIcon).map(item => item.find('img').attributes('src')))
            .to.eql(mockData.map(item => mockOptions['logo'].find(option => option.value === item.icon).label));
          done();
        });
      });
      it('定义宽高', done => {
        wrapper.setProps({
          columns: mockColumns.map(item => {
            let result = {...item};
            if (item.field && item.field.keyName === 'icon') {
              result.field.width = '40px';
              result.field.height = '20px';
            }
            return result;
          })
        });
        wrapper.vm.$nextTick(() => {
          expect(cells(Cell.enumIcon).map(item => item.find('img').element.style.width))
            .to.eql(mockData.map(() => '40px'));
          expect(cells(Cell.enumIcon).map(item => item.find('img').element.style.height))
            .to.eql(mockData.map(() => '20px'));
          done();
        });
      });
      it('定义数字型宽高', done => {
        wrapper.setProps({
          columns: mockColumns.map(item => {
            let result = {...item};
            if (item.field && item.field.keyName === 'icon') {
              result.field.width = 40;
              result.field.height = 20;
            }
            return result;
          })
        });
        wrapper.vm.$nextTick(() => {
          expect(cells(Cell.enumIcon).map(item => item.find('img').element.style.width))
            .to.eql(mockData.map(() => '40px'));
          expect(cells(Cell.enumIcon).map(item => item.find('img').element.style.height))
            .to.eql(mockData.map(() => '20px'));
          done();
        });
      });
    });

    describe('datetime', () => {
      it('正确渲染', () => {
        let realized = cells(Cell.datetime).map(item => item.text());
        let expected = mockData.map(item => DateTime.fromSeconds(Number(item.startTime)).toFormat('yyyy-MM-dd HH:mm:ss'));
        LOG('datetime正确渲染 - 数据比对', realized, expected);
        expect(realized).to.eql(expected);
      });
      it('格式修改', () => {
        wrapper.setProps({
          columns: mockColumns.map(item => {
            let result = {...item};
            if (item.field && item.field.keyName === 'startTime') {
              result.field.format = 'yyyy!MM!dd HH:mm:ss';
            }
            return result;
          })
        });
        let realized = cells(Cell.datetime).map(item => item.text());
        let expected = mockData.map(item => DateTime.fromMillis(Number(item.startTime) * 1000).toFormat('yyyy!MM!dd HH:mm:ss'));
        LOG('datetime格式修改 - 数据比对', realized, expected);
        expect(realized).to.eql(expected);
      });
    });

    describe('money', () => {
      it('正确渲染', () => {
        expect(cells(Cell.money).map(item => item.text()))
          .to.eql(mockData.map(() => Number(100000000).toLocaleString('zh-cn', {style: 'currency', currency: 'CNY'})));
      });
    });

    describe('timespan', () => {
      it('正确渲染', () => {
        let realized = cells(Cell.timespan).map(item => item.text());
        let expected = mockData.map(item => Duration.fromMillis(Number(item.duration) * 1000).toFormat('h小时m分ss秒'));
        LOG('timespan正确渲染 - 数据比对', realized, expected);
        expect(realized).to.eql(expected);
      });
      it('格式修改', () => {
        wrapper.setProps({
          columns: mockColumns.map(item => {
            let result = {...item};
            if (item.field && item.field.keyName === 'duration') {
              result.field.format = 'hh-mm-ss';
            }
            return result;
          })
        });
        let realized = cells(Cell.timespan).map(item => item.text());
        let expected = mockData.map(item => Duration.fromMillis(Number(item.duration) * 1000).toFormat('hh-mm-ss'));
        LOG('timespan格式修改 - 数据比对', realized, expected);
        expect(realized).to.eql(expected);
      });
    });


    describe('thumbnail', () => {
      it('正确渲染', () => {
        let realized = cells(Cell.thumbnail).map(item => item.find('img').element.src);
        let expected = mockData.map(item => item.thumb);
        LOG('thumbnail正确渲染 - 数据比对', realized, expected);
        expect(realized).to.eql(expected);
      });
    });

    describe('interactions', () => {
      it('正确传递数据', () => {
        wrapper.findAll(TableInteraction).wrappers.map(item => item.vm.interactionProps).forEach((item, index) => {
          expect(item).to.include({
            'uri':'/api/mock/teacher/audit',
            'mode':'ajax',
            'type':'interaction',
            'label':'审核',
            'sortable':false,
            'confirmText':'确认通过吗？',
            'authorityCode':'',
            'showCondition':true,
          });
          expect(item.context).to.have.all.keys(['$filter', '$rows', '$row']);
          expect(item.context.$row).to.eql(mockData[Math.floor(index / 2)]);
        });
      });
      it('正确传递事件', () => {
        let interactions = wrapper.findAll(DhInteraction).wrappers;
        interactions.forEach(item => {
          item.vm.$emit('submitSuccess');
          item.vm.$emit('showDialog');
          item.vm.$emit('showDocker');
        });
        LOG('触发的事件', wrapper.emitted());
        expect(wrapper.emitted().submitSuccess).to.have.lengthOf(interactions.length);
        expect(wrapper.emitted().showDialog).to.have.lengthOf(interactions.length);
        expect(wrapper.emitted().showDocker).to.have.lengthOf(interactions.length);
      });
    });
  });
});
