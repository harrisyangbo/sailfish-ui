<template>
  <div>
    <CommonTable
      style="width: 100%"
      :table-attrs="tableAttrs"
      :table-events="tableEvents"
      :columns="columnsFormatted"
      :disable-pagination="disablePagination"
      :pagination-attrs.sync="paginationAttrs"
      :pagination-events="paginationEvents"
      ref="cTable"
    >
      <template #middle>
        <div style="height: 10px" />
      </template>
    </CommonTable>
    <div
      class="viewer"
      v-viewer="{toolbar: false}"
      v-show="false"
    >
      <img
        v-for="src in currentViewImage"
        :src="src"
        :key="src"
      >
    </div>
  </div>
</template>

<script>
import { decodeHTML } from '../common/dh_html_escape';

import { DhAuthorityItem, checkAuth } from '../authortity/index';

import bus from './event_bus';
import {elTableEvents, elPaginationEvents, orderStr} from './const';
import {getTableFields} from './fields';

import compMixin from '../mixin/catalyst_register';

const Fields = getTableFields();
const SELECTION_WIDTH = '30';
const FLAG_NO_AUTH = 'NO_AUTH';


export default {
  name: 'DhTable',
  mixins: [
    compMixin
  ],
  props: {
    tableData: {
      type: [Array, null],
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    },
    disablePagination: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selection: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    context: {
      type: Object,
      default() {
        return {};
      }
    },
    useCustomImageViewer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stopWatching: false,
      paginationAttrs: {
        layout: 'total, sizes, prev, pager, next, jumper',
        currentPage: this.currentPage,
        total: this.total,
        pageSize: this.pageSize,
        pageSizes: [10, 15, 20, 25, 30]
      },
      currentViewImage: []
    };
  },
  watch: {
    currentPage(val) {
      if (!this.stopWatching) this.paginationAttrs.currentPage = val;
    },
    total(val) {
      if (!this.stopWatching) this.paginationAttrs.total = val;
    },
    pageSize(val) {
      if (!this.stopWatching) this.paginationAttrs.pageSize = val;
    },
    paginationAttrs: {
      handler(val) {
        this.stopWatching = true;
        this.$emit('update:currentPage', val.currentPage);
        this.$emit('update:total', val.total);
        this.$emit('update:pageSize', val.pageSize);
        this.stopWatching = false;
      },
      deep: true
    }
  },
  computed: {
    tableAttrs() {
      return {
        stripe: true,
        'header-cell-class-name': 'dh-table-header',
        data: this.tableData,
        loading: this.loading,
      };
    },
    tableEvents() {
      return elTableEvents.reduce((newObj, key) => {
        return {
          ...newObj,
          [`NOFIXTHIS_${key}`]: function (event) {
            let tEvent = event;
            switch (key) {
            // 改造sort-change事件使之能配合项目
            // 对复合项目只能同时有一个数据处于sortable状态
            case 'sort-change':
              /* eslint-disable no-case-declarations */
              // 以下变量只在该case里使用
              let realColumn = this.columns.find(item => item.label === event.column.label);
              let field = realColumn.fields ? realColumn.fields.find(item => item.sortable) : realColumn.field;
              /* eslint-enable no-case-declarations */
              tEvent = {...event, field};
              tEvent.order = orderStr[tEvent.order] || null;
              break;
            }
            this.$emit(key, tEvent);
          }.bind(this)
        };
      }, {});
    },
    paginationEvents() {
      return elPaginationEvents.reduce((newObj, key) => {
        return {
          ...newObj,
          [`NOFIXTHIS_${key}`]: function (event) {
            let tEvent = event;
            switch (key) {
            case 'size-change':
              // 没有直接修改，只是传递了函数
              /* eslint-disable vue/no-side-effects-in-computed-properties */
              this.paginationAttrs.currentPage = 1;
              this.paginationAttrs.pageSize = event;
              /* eslint-enable vue/no-side-effects-in-computed-properties */
              break;
            }
            // 由于pagination和table都有current-change事件，为避免冲突改为page-change
            this.$nextTick(() => {
              this.$emit(key === 'current-change' ? 'page-change' : key, tEvent);
            });
          }.bind(this)
        };
      }, {});
    },
    columnsFormatted() {
      return [
        ...(this.selection ? [{type: 'selection', width: SELECTION_WIDTH}] : []),
        ...this.columns.filter(this.authCol).map(this.makeCol)
      ];
    },
  },
  methods: {
    makeCol(column) {
      let result = {};
      // 公共配置
      result.label = column.label;
      // 宽度
      if (column.width) result.width = column.width;
      // 是否显示tooltip
      result.showOverflowTooltip = !column.disableOverflowTooltip;
      // 是否固定当前页
      result.fixed = column.fixed;
      result['class-name'] = column['className'];
      result['label-class-name'] = column['labelClassName'];
      
      // 组件配置
      if (column.children) result.children = column.children.map(this.makeCol);
      else if (column.field) result = { ...result, ...this.makeField(column.field) };
      else if (column.fields) result = { ...result, ...this.makeFields(column.fields, column.disableOverflowTooltip) };
      return result;
    },

    authCol(column) {
      // 处理空数据
      if (!this.tableData) return true;
      else if (!this.tableData.length) return true;

      if (column.children) return column.children.map(this.authCol);
      else if (column.field) return this.tableData.some(row => this.authField(column.field, row));
      else if (column.fields) return column.fields.some(field => this.tableData.some(row => this.authField(field, row)));
      else return false;
    },

    authField(field, row) {
      let virtualComp = {
        showCondition: field.showCondition,
        authorityCode: field.authorityCode,
        context: {
          $dataModel: this.context.$dataModel,
          $row: row
        },
        hasPermit: this.hasPermit
      };
      return checkAuth(virtualComp);
    },

    makeField(field) {
      let result = {};
      // 是否可排序
      result.sortable = field.sortable ? 'custom' : false;
      result.component = scope => h => this.render(h, scope, field);
      return result;
    },

    makeFields(fields, disableOverflowTooltip = false) {
      let result = {};
      // 是否可排序
      result.sortable = fields.some(field => field.sortable) ? 'custom' : false;
      result.component = scope => h => h(
        'div',
        {
          style: {
            display: disableOverflowTooltip ? 'block' : 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            whiteSpace: disableOverflowTooltip ? 'wrap' : 'nowrap'
          }
        },
        fields.map(field => {
          if (typeof field === 'string') return h('span', {domProps: {innerHTML: decodeHTML(field)}});
          else return this.render(h, scope, field);
        }).filter(item => item !== FLAG_NO_AUTH)
      );
      return result;
    },

    render(h, scope, field) {
      if (!this.authField(field, scope.row)) return FLAG_NO_AUTH;


      // 构造内层表单组件props
      let fieldProps = {
        ...field,
        value: scope.row[field.keyName],
        field: {...field},
        row: {...scope.row},
        rowIndex: scope.$index,
        context: {
          $dataModel: this.context.$dataModel,
          $row: this.tableData ? this.tableData[scope.$index] : {}
        }
      };

      return h(
        DhAuthorityItem,
        {
          // 外层权限组件配置
          props: {
            showCondition: field.showCondition,
            authorityCode: field.authorityCode,
            context: {
              $dataModel: this.context.$dataModel,
              $row: scope.row
            }
          }
        },
        [
          // 内层表单组件配置
          h(Fields[field.type], {
            props: fieldProps
          })
        ]
      );
    }
  },
  created() {
    // 表格元素事件
    // thumbnail imageView
    bus.$on('imageView', event => {
      this.currentViewImage = [event];
      this.$emit('imageView', event);
      if (!this.useCustomImageViewer) {
        setTimeout(() => {
          this.$el.querySelector('.viewer').$viewer.view(0);
        }, 100);
      }
    });
  },
  mounted() {
    this.$mpNoticeReady();
  },
  destroyed() {
    bus.$off();
  }
};
</script>
