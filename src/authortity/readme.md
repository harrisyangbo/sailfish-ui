# dh-component-vue-authority

> 权限控制组件，如果不满足权限或者showCondition条件控制不显示，则不会渲染任何元素。默认是会显示的状态，即所有人可见
> 内部权限校验使用目前的BOSS系统的mixin的hasPermit接口

## Usage

* 单独用法

  ```html
  <template>
    <dh-authority-item :show-condition="true" :authority-code="'search'" :context="context">
      ......
    </dh-authority-item>
  </template>
  ```

* 批量用法
> 几个authorityItem可以包装在一个authorityContainer容器里，如果所有的authorityItem都没有权限访问，则整个authorityContainer都不可见

  ```html
  <template>
    <dh-authority-container>
      <dh-authority-item :authority-code="'search'" :show-condition="true" :context="context">...></dh-authority-item>
      <dh-authority-item :authority-code="'search'" :show-condition="true" :context="context">...</dh-authority-item>
      <dh-authority-item :authority-code="'search'" :show-condition="'1 === 1'" :context="context">...</dh-authority-item>
    </dh-authority-container>
  </template>
  ```

## API Reference

* parameter

  name|type|required|default|description
  -|-|-|-|-
  authorityCode|String|no||该筛选条件的权限码，不设置即为所有人员可见
  showCondition|Boolean \| String|no|true|一个布尔值或者一段js表达式代码，用来控制该筛选条件是否显示。如果传递了js表达式，则this指向当前vue实例，同时预设了三个变量$filter、$row、$rows来访问页面相关的数据
  context|Object|no|{}|如果showCondition传递了一段js表达式，则context即为这段表达式中用到的$filter、$row、$rows变量查找的上下文

## Options

## Examples

```html
<dh-authority-item :show-condition="true" :authority-code="'search'" :context="context">
  ......
</dh-authority-item>


<dh-authority-item :show-condition="'1 === 1'" :authority-code="'search'" :context="context">
  ......
</dh-authority-item>
```
