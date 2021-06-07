### Input输入框

#### 基础用法

```
<dh-sizer-input
  v-model="input"
  :label="label"
/>
<script>
export default {
  data() {
    return {
      input: '',
      label: '标题'
    }
  }
}
</script>
```

#### 实时搜索
> 如果你需要每次input的值变化的时候都做一些你的操作，你需要设置immediate为true，并绑定一个search事件

```
<dh-sizer-input
  v-model="input"
  :immediate="true"
  @search="handleSearch"
  :label="label"
/>
<script>
export default {
  data() {
    return {
      input: '',
      label: '标题'
    }
  },
  methods: {
    handleSearch(val) {
      // val 是 String
      console.log(val)
    }
  }
}
</script>
```

#### 模糊搜索
> 可能你的业务有模糊匹配的场景，你需要传入一个uri也就是你要查询的api地址

```
<dh-sizer-input
  v-model="input"
  :uri="true"
  @querySearch="querySearch"
  :label="label"
/>
<script>
export default {
  data() {
    return {
      input: '',
      label: '标题'
    }
  },
  methods: {
    querySearch(query) {
      axios.get(query.uri).then((result) => {
        query.cb(result)
      })
    }
  }
}
</script>
```

****

#### Input Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| label | 标题 | string | —— | '' |
| clearable | 是否可清空 | boolean | —— | true |
| placeholder | 输入框占位文本 | string | —— | '' |
| immediate | 实时搜索 | boolean | —— | false |
| uri | 模糊搜索接口 | string | —— | '' |
