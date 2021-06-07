export const mockData =
  [
    {
      entityId: 1,
      id: 1,
      name: '姓名1',
      sex: 1,
      icon: 1,
      age: 24,
      startTime: 1566403200,
      duration: 1024,
      money: 100000000,
      thumb: 'http://p8.qhimg.com/t01732676a4cc2ba492.png',
      audio: 'http://10.29.51.167:5000/claris%20(%E3%82%AF%E3%83%A9%E3%83%AA%E3%82%B9)%20-%20%E3%81%B2%E3%82%89%E3%81%B2%E3%82%89%20%E3%81%B2%E3%82%89%E3%82%89%20(%E8%8A%B1%E7%93%A3%E7%BF%A9%E7%BF%A9)%20[mqms2].flac'
    },
    {
      entityId: 2,
      id: 2,
      name: '姓名2',
      sex: 2,
      icon: 2,
      age: 34,
      startTime: 1566403200,
      money: 100000000,
      duration: 1024,
      thumb: 'http://p3.qhimg.com/t0173bcfed4550db7eb.png'
    },
    {
      entityId: 3,
      id: 3,
      name: '姓名3',
      sex: 1,
      icon: 1,
      age: 24,
      startTime: 1566403200,
      money: 100000000,
      duration: 1024,
      thumb: 'http://p9.qhimg.com/t0171b586f06d29d044.png'
    },
    {
      entityId: 4,
      id: 4,
      name: '姓名4',
      sex: 2,
      icon: 2,
      age: 24,
      startTime: 1566403200,
      money: 100000000,
      duration: 1024,
      thumb: 'http://p4.qhimg.com/t01daba05650546a331.png'
    },
    {
      entityId: 5,
      id: 5,
      name: '姓名1',
      sex: 1,
      icon: 1,
      age: 24,
      startTime: 1566403200,
      money: 100000000,
      duration: 1024,
      thumb: 'http://p0.qhimg.com/t017a9f621c825a003d.png'
    },
    {
      entityId: 6,
      id: 6,
      name: '姓名6',
      sex: 1,
      icon: 1,
      age: 24,
      startTime: 1566403200,
      money: 100000000,
      duration: 1024,
      thumb: 'http://p0.qhimg.com/t017a9f621c825a003d.png'
    },
    {
      entityId: 7,
      id: 7,
      name: '姓名7',
      sex: 2,
      icon: 2,
      age: 24,
      startTime: 1566403200,
      money: 100000000,
      duration: 1024,
      thumb: 'http://p0.qhimg.com/t0142c5918e855c68a9.png'
    }
  ];

export const mockColumns = [
  {
    // 表格列绑定单个字段
    label: '编号',
    tip: '编号aaaaaa',
    field: {
      keyName: 'id',
      type: 'raw',
      sortable: true,
      authorityCode: '',
      showCondition: true
    }
  },
  {
    label: '性别',
    tips: '',
    field: {
      keyName: 'sex',
      type: 'enum_text',
      sortable: true,
      authorityCode: '',
      showCondition: true,
      optionsId: 'enum1',
    }
  },
  {
    label: 'icon',
    tips: '',
    field: {
      keyName: 'icon',
      type: 'enum_icon',
      sortable: true,
      authorityCode: '',
      showCondition: true,
      optionsId: 'logo',
    }
  },
  {
    label: '金钱',
    width: '100px',
    tip: '312312',
    disableOverflowTooltip: true,
    field: {
      keyName: 'money',
      type: 'money',
      sortable: true,
      authorityCode: '',
      showCondition: true
    }
  },
  {
    label: '时间段',
    tip: '312312',
    field: {
      keyName: 'duration',
      type: 'timespan',
      sortable: true,
      authorityCode: '',
      showCondition: true
    }
  },
  {
    label: '时间点',
    tips: '',
    field: {
      keyName: 'startTime',
      type: 'datetime',
      sortable: true,
      authorityCode: '',
      showCondition: true
    }
  },
  {
    label: '图片',
    tips: '',
    disableOverflowTooltip: true,
    field: {
      keyName: 'thumb',
      type: 'thumbnail',
      sortable: true,
      authorityCode: '',
      showCondition: true,
    }
  },
  {
    label: '音频',
    tips: '',
    width: '400px',
    field: {
      keyName: 'audio',
      type: 'audio',
      sortable: true,
      authorityCode: '',
      showCondition: true
    }
  },
  {
    label: '单点操作',
    field: {
      'uri':'/api/mock/teacher/audit',
      'mode':'ajax',
      'type':'interaction',
      'label':'审核',
      'sortable':false,
      'confirmText':'确认通过吗？',
      'authorityCode':'',
      'showCondition':true,
      context: {
        $filter: {
          a: 1,
          b: 2
        },
        $rows: mockData
      }
    }
  },
  {
    // 表格列绑定多个字段，会渲染成 '组合信息：{name} - {span}分钟'
    label: 'compose info',
    tips: '',
    width: '200px',
    fields: [
      // '组合信息：',
      {
        keyName: 'id',
        type: 'raw',
        sortable: true,
        authorityCode: '',
        showCondition: true
      },
      {
        type: 'divider',
        text: '<span style="margin: 0 8px; background: red;">|||</span>'
      },
      {
        keyName: 'sex',
        type: 'enum_text',
        sortable: true,
        authorityCode: '',
        showCondition: false,
        optionsId: 'enum1',
      },
      {
        keyName: 'icon',
        type: 'enum_icon',
        sortable: true,
        authorityCode: '',
        showCondition: false,
        optionsId: 'logo',
      },
      {
        keyName: 'money',
        type: 'money',
        sortable: true,
        authorityCode: '',
        showCondition: true
      },
      {
        keyName: 'duration',
        type: 'timespan',
        sortable: true,
        authorityCode: '',
        showCondition: true
      },
      {
        keyName: 'startTime',
        type: 'datetime',
        sortable: true,
        authorityCode: '',
        showCondition: true
      },
      {
        keyName: 'thumb',
        type: 'thumbnail',
        sortable: true,
        authorityCode: '',
        showCondition: true
      },
      {
        'uri':'/api/mock/teacher/audit',
        'mode':'ajax',
        'type':'interaction',
        'label':'审核',
        'sortable':false,
        'confirmText':'确认通过吗？',
        'authorityCode':'',
        'showCondition':true,
        context: {
          $filter: {
            a: 1,
            b: 2
          },
          $rows: mockData
        }
      }
    ]
  }
];

export const mockOptions = {
  enum1: [
    {value: 1, label: '男'},
    {value: 2, label: '女'}
  ],
  logo: [
    {value: 1, label: 'https://cn.vuejs.org/images/logo.png'},
    {value: 2, label: 'http://www.ruanyifeng.com/blogimg/asset/2015/bg2015033101.png'}
  ]
};