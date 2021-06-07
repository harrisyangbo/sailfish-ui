import validator from '../../../src/validator/index';

describe('validator_test', function () {
  before(function () {
    // 在本区块的所有测试用例之前执行
  });

  after(function () {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function () {
    // 在本区块的每个测试用例之后执行
  });

  it('text_filter_config_should_be_validated_correctly', () => {
    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: 'student_name',
        type: 'text',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }


    try {
      validator.checkFilter({
        key_name: 'student_name',
        type: 'text',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '',
        key_name: 'student_name',
        type: 'text',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: 'student_name',
        type: 3,
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: 'student_name',
        type: 'hello',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: '',
        type: 'text',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        type: 'text',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('dropdown_filter_config_should_be_validated_correctly', () => {
    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: 'student_name',
        type: 'dropdown',
        immediate: true,
        authority_code: '',
        show_condition: '1 === 2',
        options_id: 'student_names_id'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkFilter({
        label: '所在城市',
        key_name: 'city',
        type: 'cascade_dropdown',
        immediate: true,
        authority_code: '',
        show_condition: '1 === 2',
        options_id: 'cities_id'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: ['select_type', 'content'],
        type: 'dropdown',
        immediate: true,
        authority_code: '',
        show_condition: '1 === 2',
        options_id: 'student_names_id'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: 'student_name',
        type: 'dropdown',
        immediate: 'hello',
        authority_code: '',
        show_condition: '1 === 2',
        options_id: 'student_names_id'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '所在城市',
        key_name: 'city',
        type: 'cascade_dropdown',
        immediate: true,
        authority_code: 3,
        show_condition: '1 === 2',
        options_id: 'cities_id'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '所在城市',
        key_name: 'city',
        type: 'cascade_dropdown',
        immediate: true,
        authority_code: '',
        show_condition: '',
        options_id: 'cities_id'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '所在城市',
        key_name: 'city',
        type: 'cascade_dropdown',
        immediate: true,
        authority_code: '',
        show_condition: 3,
        options_id: 'cities_id'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '所在城市',
        key_name: 'city',
        type: 'cascade_dropdown',
        immediate: true,
        authority_code: '',
        show_condition: '1 === 2',
        options_id: ''
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

  });

  it('keyword_filter_config_should_be_validated_correctly', () => {
    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: ['student_name', 'word'],
        type: 'keyword',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false,
        options_id: 'student_names_id',
        uri: '/api/student/name'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: [],
        type: 'keyword',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false,
        options_id: 'student_names_id',
        uri: '/api/student/name'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: 'name',
        type: 'keyword',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false,
        options_id: 'student_names_id',
        uri: '/api/student/name'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: [1],
        type: 'keyword',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false,
        options_id: 'student_names_id',
        uri: '/api/student/name'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: ['student_name', 'word'],
        type: 'keyword',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false,
        options_id: 'student_names_id',
        uri: ''
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '学生姓名',
        key_name: ['student_name', 'word'],
        type: 'keyword',
        immediate: false,
        authority_code: 'teacher',
        show_condition: false,
        options_id: 'student_names_id',
        uri: 1
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('calendar_filter_config_should_be_validated_correctly', () => {
    try {
      validator.checkFilter({
        label: '日期',
        key_name: 'start_time',
        type: 'calendar',
        immediate: true,
        authority_code: 'calendar',
        show_condition: false,
        mode: 'date'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkFilter({
        label: '日期',
        key_name: ['start_date', 'end_date'],
        type: 'calendar',
        immediate: true,
        authority_code: 'calendar',
        show_condition: false,
        mode: 1
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
    try {
      validator.checkFilter({
        label: '日期',
        key_name: ['start_date', 'end_date'],
        type: 'calendar',
        immediate: true,
        authority_code: 'calendar',
        show_condition: false,
        mode: 'hello'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('range_filter_config_should_be_validated_correctly', () => {
    try {
      validator.checkFilter({
        label: '数量',
        key_name: 'count',
        type: 'range',
        immediate: true,
        authority_code: '',
        show_condition: true,
        range: [0, 100]
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkFilter({
        label: '数量',
        key_name: 'count',
        type: 'range',
        immediate: true,
        authority_code: '',
        show_condition: true,
        range: 100
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '数量',
        key_name: 'count',
        type: 'range',
        immediate: true,
        authority_code: '',
        show_condition: true,
        range: [1]
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '数量',
        key_name: 'count',
        type: 'range',
        immediate: true,
        authority_code: '',
        show_condition: true,
        range: ['1', '100']
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkFilter({
        label: '数量',
        key_name: 'count',
        type: 'range',
        immediate: true,
        authority_code: '',
        show_condition: true,
        range: [100, 1]
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('raw_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'id',
        type: 'raw',
        sortable: true,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkField({
        key_name: 'id',
        type: 1,
        sortable: true,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'id',
        type: 'hello',
        sortable: true,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'id',
        type: 'raw',
        sortable: 1,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'id',
        type: 'raw',
        sortable: true,
        authority_code: 123,
        show_condition: '1 == 2'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'id',
        type: 'raw',
        sortable: true,
        show_condition: ''
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'id',
        type: 'raw',
        sortable: true,
        show_condition: 34
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('enum_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'sex',
        type: 'enum_text',
        sortable: false,
        options_id: 'options_id',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkField({
        key_name: 'sex',
        type: 'enum_icon',
        sortable: false,
        options_id: 'options_id',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkField({
        key_name: 'sex',
        type: 'enum_icon',
        sortable: false,
        options_id: null,
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'sex',
        type: 'enum_icon',
        sortable: false,
        options_id: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('datetime_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'span',
        type: 'datetime',
        sortable: false,
        format: 'yyyy-MM-dd hh:mm:ss.S',
        authority_code: 'dateModify'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkField({
        key_name: 'span',
        type: 'datetime',
        sortable: false,
        format: '',
        authority_code: 'dateModify'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'span',
        type: 'datetime',
        sortable: false,
        authority_code: 'dateModify'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'span',
        type: 'datetime',
        sortable: false,
        format: null,
        authority_code: 'dateModify'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('timespan_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'span',
        type: 'timespan',
        sortable: true,
        format: 'h小时',
        authority_code: '',
        show_condition: '1 === 1'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkField({
        key_name: 'span',
        type: 'timespan',
        sortable: true,
        unit: '',
        authority_code: '',
        show_condition: '1 === 1'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'span',
        type: 'timespan',
        sortable: true,
        authority_code: '',
        show_condition: '1 === 1'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 'span',
        type: 'timespan',
        sortable: true,
        unit: 'hello',
        authority_code: '',
        show_condition: '1 === 1'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('money_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'amount',
        type: 'money',
        sortable: true,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }
  });

  it('thumbnail_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'img_url',
        type: 'thumbnail',
        sortable: true,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }
  });

  it('audio_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        key_name: 'audio_url',
        type: 'audio',
        sortable: true,
        authority_code: '',
        show_condition: '1 == 2'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }
  });

  it('interaction_field_confit_should_be_validated_correctly', () => {
    try {
      validator.checkField({
        type: 'interaction',
        sortable: true,
        mode: 'page',
        confirm_text: '确认吗？',
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkField({
        type: 'interaction',
        sortable: true,
        mode: '',
        confirm_text: '确认吗？',
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        type: 'interaction',
        sortable: true,
        confirm_text: '确认吗？',
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        type: 'interaction',
        sortable: true,
        mode: 'hello',
        confirm_text: '确认吗？',
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        type: 'interaction',
        sortable: true,
        mode: 'ajax',
        confirm_text: 123,
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        type: 'interaction',
        sortable: true,
        mode: 'js',
        confirm_text: '确认吗？',
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkField({
        key_name: 1,
        type: 'interaction',
        sortable: true,
        mode: 'page',
        confirm_text: '确认吗？',
        uri: '/account/manage',
        script: '',
        authority_code: '',
        show_condition: true
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('action_search_config_should_be_validated_correctly', () => {
    try {
      validator.checkSearch({
        uri: '/api/student/list',
        authority_code: 'student',
        show_condition: '1 === 1'
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkSearch({
        uri: '/api/student/list',
        authority_code: 1,
        show_condition: '1 === 1'
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkSearch({
        uri: '/api/student/list',
        authority_code: 'student',
        show_condition: ''
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkSearch({
        uri: '/api/student/list',
        authority_code: 'student',
        show_condition: 1
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });

  it('action_other_config_should_be_validated_correctly', () => {
    try {
      validator.checkAction({
        label: 'some action',
        mode: 'page',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'ajax',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'dialog',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.true;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.false;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'hello',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'page',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: 4,
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'page',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: 2
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'page',
        batch: false,
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: ''
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'ajax',
        batch: 'false',
        confirm_text: '确认吗？',
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }

    try {
      validator.checkAction({
        label: 'some action',
        mode: 'ajax',
        batch: false,
        confirm_text: 123,
        uri: '/detail/student',
        script: '',
        authority_code: '',
        show_condition: false
      });
      expect(true).to.be.false;
    } catch (e) {
      // console.error(e);
      expect(true).to.be.true;
    }
  });


});
