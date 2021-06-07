<script>

export default {
  functional: true,
  name: 'BaseColumn',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    getSlots: {
      type: Function,
      default: () => {}
    }
  },
  render(h, ctx) {
    // 函数式组件中没有this,通过上下文（ctx）来实现。
    const { data, getSlots } = ctx.props;
    const { slotName, headerSlotName , ...others } = data;
    if (!data.type) {
      const slots = getSlots({ slotName, headerSlotName });
      // 组件或自定义渲染内容
      const renderWithComponent = (scope) => {
        if (data.component instanceof Function) {
          return data.component(scope)(h, ctx);
        } else {
          return data.component;
        }
      }
      // 默认内容
      const renderWithProp = (scope, key) => {
        return scope.row[key];
      }
      // 没有传入slotName默认处理
      const  handleDefaultRender = (scope) => {
        if (data.prop) {
          return renderWithProp(scope, data.prop);
        } else {
          return renderWithComponent(scope)
        }
      }

      // vue-jsx中slot的实现方法
      const scopedSlots = {
        default: (scope) => {
          if (slots.default)
            console.log(slots.default(scope), '&&&')
          return (slots.default ? slots.default(scope)
            : handleDefaultRender(scope))
        },
        header: () => (slots.header ? slots.header(scope)
          : data.label),
      };
      return h('el-table-column', { props: {...others}, scopedSlots: {...scopedSlots }});
      }
      return  h('el-table-column', { props: data});


    },
};
</script>