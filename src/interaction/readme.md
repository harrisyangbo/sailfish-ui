# dh-component-vue-interaction

> 页面交互元素

## Usage

  ```html
  <dh-interaction
    :mode="mode"
    :batch="batch"
    :confirm-text="confirmText"
    :uri="uri"
    :script="script"
    :context="context"
    @showDialog="handleShowDialog"
    @showDocker="handleShowDocker"
  >
    <slot>{{ label }}</slot>
  </dh-interaction>
  ```

## API Reference

* parameter

  name|type|required|default|description
  -|-|-|-|-
  label|String|yes||交互元素显示的名称
  mode|String|no||交互元素行为模式，值包括：page(打开外链)、ajax(异步访问接口)、dialog(页面弹层)、docker(滑出弹层)、js(页面纯js逻辑)
  batch|Boolean|no|false|是否批处理行为，适用于ajax、dialog、docker、js模式
  confirmText|String|no||确认文案，会在按钮逻辑处理之前弹出，用以确认用户操作，适用于ajax、js模式
  uri|String|no||页面外链或api接口地址，适用于page、ajax、dialog、docker模式
  script|String|no||一段自定义js代码，适用于js模式
  context|Array|no|{}|如果script传递了一段js代码，则context即为这段代码中用到的$filter、$row、$rows变量查找的上下文

* event

  name|description
  -|-
  submitSuccess|提交成功的事件，ajax模式用到，表示异步请求执行成功
  showDialog|显示页面中部对话弹层的事件，dialog模式用到，事件第一个参数即为拼接好entity_id参数的uri
  showDocker|显示从右向左滑出弹层的事件，docker模式用到，事件第一个参数即为拼接好entity_id参数的uri
