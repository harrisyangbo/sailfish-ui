export const sizerData = {
  sizerProps: {
    filters: [
      {
        'fold': true,
        'type': 'text',
        'label': '学生姓名',
        'key_name': 'name',
        'immediate': true
      },
      {
        'fold': true,
        'mode': 'date',
        'type': 'calendar',
        'label': '日历',
        'key_name': 'm_date',
        'immediate': true
      },
      {
        'fold': true,
        'type': 'radio',
        'label': '性别',
        'key_name': 'sex',
        'immediate': true,
        'options_id': 'sex'
      },
      {
        'fold': true,
        'type': 'checkbox',
        'label': '沟通节点',
        'key_name': 'connection',
        'immediate': true,
        'options_id': 'connection_timing'
      }
    ],
    filterable: false
  },
  optionsData: {
    connection_timing: [{
      value: '1',
      label: 'a'
    },{
      value: '2',
      label: 'b'
    },{
      value: '3',
      label: 'c'
    }],
    sex: [{
      value: '1',
      label: 'a'
    },{
      value: '2',
      label: 'b'
    }],
    account_status: [{
      'label': '启用',
      'value': '0'
    },
    {
      'label': '禁用',
      'value': '1'
    }],
    default: [{
      value: '1',
      label: 'a'
    },{
      value: '2',
      label: 'b'
    }]
  }
};