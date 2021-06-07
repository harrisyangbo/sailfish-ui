export default {
  tabs: 'tabs_id',
  filters: [
    {
      label: '活动区域',
      key_name: 'hello',
      type: 'text',
      immediate: false,
      authority_code: '',
      show_condition: '1 === 1',
      uri: ''
    },
    {
      label: '活动区域',
      key_name: 'region',
      type: 'dropdown',
      immediate: false,
      authority_code: '',
      show_condition: true,
      options_id: 'options_id'
    },
    {
      label: '活动区域',
      key_name: 'address',
      type: 'cascade_dropdown',
      immediate: false,
      authority_code: '',
      show_condition: true,
      options_id: 'cascadeOptions_id'
    },
    {
      label: '关键字',
      key_name: ['select_type', 'select_content'],
      type: 'keyword',
      immediate: true,
      authority_code: '',
      show_condition: true,
      options_id: 'options_id',
      uri: ''
    },
    {
      label: '日历',
      key_name: ['start_time', 'end_time'],
      type: 'calendar',
      immediate: false,
      authority_code: '',
      show_condition: true,
      mode: 'daterange'
    },
    {
      label: '性别',
      key_name: 'sex',
      type: 'radio',
      immediate: false,
      authority_code: '',
      show_condition: true,
      options_id: 'options_id'
    },
    {
      label: '角色',
      key_name: 'role',
      type: 'checkbox',
      immediate: false,
      authority_code: '',
      show_condition: true,
      options_id: 'options_id'
    },
    {
      label: '年龄',
      key_name: 'age',
      type: 'range',
      immediate: false,
      authority_code: '',
      show_condition: true,
      range: [0, 100]
    }
  ],
  actions: {
    search: {
      uri: '/api/search',
      authority_code: '',
      show_condition: true
    },
    other: [
      {
        label: 'some action',
        mode: 'page',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail',
        script: '',
        authority_code: '',
        show_condition: true
      }
    ]
  },
  columns: [
    {
      label: '编号',
      tips: '',
      field: {
        key_name: 'id',
        type: 'raw',
        sortable: true,
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        key_name: 'sex',
        type: 'enum_text',
        sortable: false,
        options_id: 'options_id',
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        key_name: 'course_type',
        type: 'enum_icon',
        sortable: false,
        options_id: 'options_id',
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        key_name: 'span',
        type: 'timespan',
        sortable: true,
        format: 'yyyy-MM-dd hh:mm:ss.S',
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        key_name: 'span',
        type: 'datetime',
        sortable: true,
        format: 'yyyy-MM-dd hh:mm:ss.S',
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        key_name: 'price',
        type: 'money',
        sortable: true,
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        key_name: 'img',
        type: 'thumbnail',
        sortable: false,
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: 'test tips',
      field: {
        key_name: 'audio',
        type: 'audio',
        sortable: false,
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'randome',
      tips: '',
      field: {
        type: 'interaction',
        sortable: true,
        mode: 'page',
        confirm_text: '确认吗？',
        uri: '/detail',
        script: '',
        authority_code: '',
        show_condition: true
      }
    },
    {
      label: 'cati',
      tips: '',
      fields: [
        '综合信息：',
        {
          key_name: 'name',
          type: 'raw',
          sortable: true,
          authority_code: '',
          show_condition: true
        },
        ' - ',
        {
          key_name: 'span',
          type: 'timespan',
          format: 'h小时',
          authority_code: '',
          show_condition: true
        }
      ]
    }
  ]
};

