<script>
import BaseColumn from './baseColumn.vue';
export default {
  functional: true,
  name: 'CommonTableColumn',
  components: { BaseColumn },
  props: {
    column: {
      type: Object,
      default: () => ({})
    },
    getSlots: {
      type: Function,
      default: () => {}
    }
  },
  render(h, context) {
    let { column, getSlots } = context.props;
    const baseColumn = (props) => h(BaseColumn, { props: { data: props, getSlots } });
    const self = (props) => h(this, { props: { column: props } });
    if (column.children) {
      const childrenEles = column.children.map((item) => {
        return baseColumn(item)
      });
      return h('el-table-column', { props: column}, childrenEles);
    } else {
      return baseColumn(column)
    }
  },
};
</script>