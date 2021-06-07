# DhTable说明

## 示例
```html
<dh-table
  :columns="columns"
  :table-data="tableData"
  :current-page.sync="pagination.currentPage"
  :total.sync="pagination.total"
  :page-size.sync="pagination.pageSize"
  selection
  :context="scriptContext"
  @selection-change="handleTableSelectChanged"
  @submitSuccess="handleSubmitSuccess"
  @showDialog="handleShowDialog"
  @showDocker="handleShowDocker"
  @sort-change="handleSortChange"
  @page-change="getTableData"
  @size-change="getTableData"
/>
```

## 配置项

**```tableData``` Array\<Object\>**
表格数据，等同于element table props中的```data```

**```loading``` Boolean**
table的loading状态，设置为true则会在表格上覆盖展示loading图

**```selection``` Boolean**
是否显示表格前的多选框，可以监听```selection-change```事件获取选项

**```currentPage``` Number**
当前页数，支持```.sync```

**```total``` Number**
当前条目总量，支持```.sync```

**```pageSize``` Number**
当前每页条数，支持```.sync```

**```context``` Object**

当前环境所在上下文，用于在组件中做一些有关于当前上下文的操作，目前只有```interaction```组件实现使用，其他组件有传递但使用还需后续开发。

**```useCustomImageViewer```** Boolean

是否使用自定义图片查看器。默认为false。如果此项开启，点击图片默认只向外发送包含图片url的事件，不再调起自带的图片查看器。

**```columns``` Object**
表格列配置， 格式如下

- ```label``` String
 
  表头名称

- ```width``` String

  表头宽度，只支持px，需要带上单位，如: ```'100px'```

- ```children``` Array\<Object\>

  多级表头时嵌套子表头配置，例：

  ```javascript
  {
    label: '地址',
    children: [
      { label: '省份', field: {} },
      { label: '市区', field: {} },
      { label: '地址', field: {} }
    ]
  }
  ```

- ```disableOverflowTooltip``` Boolean
默认在表格项无法全部显示时提供tooltip，设置该项为true可以禁用当前栏的这一设置

- ```field``` Object
对应栏内容组件配置

  #### field内容配置

  - ```keyName``` String 对应的data原始数据key, 类似于element table-column的```prop```
  - ```type``` String 对应的组件类型：

    |type|组件|组件说明|额外配置|
    |----|---|-----|-------|
    |audio|音频|以对应数据为源地址的音频组件|无|
    |datetime|时间点|将对应数据（秒数）转化为时间点|```format```|
    |enum_icon|枚举图标|将对应数据经过枚举配置转化为图标|```optionsId```|
    |enum_text|枚举文本|将对应数据经过枚举配置转化为指定文本|```optionsId```|
    |interaction|交互|可点击的文本|[参见交互元素配置](../interaction/readme.md)|
    |money|金钱|将对应数据转化成人民币符号和逗号分隔形式|无|
    |thumbnail|缩略图|以对应数据为源地址的图片，可点击查看大图|```height, width```|
    |timespan|时间段|将对应数据（秒数）转化为时间端，默认以XX小时XX分XX秒显示|```format```|
    |divider|分隔符|**只能用于fields中**，用来分隔fields复合结构元素，会根据元素展示情况自动显示或隐藏|```text```|
  
  - ```sortable``` Boolean 是否可排序
  - ```authorityCode``` String 权限码，用于验证权限
  - ```showCondition``` Boolean | String 强制性是否显示该栏，支持布尔值或一段可执行的js Function代码，代码必须包裹在```function() {}```内

  #### 特定组件的额外配置

  - ```format```（选填） String 用于```datetime```和```timespan```，指定时间格式。可以不声明，将使用默认格式。

    [datetime格式](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens)，默认格式 ```yyyy-MM-dd HH:mm:ss```

    [timespan格式](https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toFormat)，默认格式```h小时m分ss秒```

  - ```optionsId``` String 用于```enum_text```和```enum_icon```，指定枚举字典在通配平台中的key
  - ```height, width``` Number | String 用于```thumbnail```，指定缩略图在表格里展示的宽高，支持数字，带尺寸单位的文本。
  - ```text``` String 用于```divider```，指定分隔符文本。支持HTML文本
<br />
- ```fields``` Array\<Object\>

  多个field组合而成的复合结构，支持简单的字符串或html，例:

  ```javascript
  fields: [
    '组合信息：',
    '<span style="margin: 0 8px"></span>',
    {
      keyName: 'id',
      type: 'raw',
      sortable: true,
      authorityCode: '',
      showCondition: true
    },
    {
      type: 'divider',
      text: '<span style="margin: 0 8px"></span>'
    },
    {
      keyName: 'sex',
      type: 'enum_text',
      sortable: true,
      authorityCode: '',
      showCondition: true,
      optionsId: 'enum1',
    }
  ]
  ```

## 事件

### element原生事件

支持element table 和 pagination 上的所有事件。

> 注意：由于pagination和table上都有```current-change```事件，为避免冲突，pagination的```current-change```事件名改为```page-change```

### 额外的事件

额外的事件都以驼峰形式命名。

|事件名|说明|参数|
|------|---|----|
|showDialog|当interaction组件要求打开对话框时触发|对话框页面的路由地址|
|showDrawer|当interaction组件要求打开抽屉时触发|抽屉页面的路由地址|
|submitSuccess|当interaction组件发送一个请求成功后|params - 请求参数<br />result - 返回结果|
|imageView|当点击图片时触发|当前页面的url|




