import Raw from './types/raw';
import EnumText from './types/enum_text';
import EnumIcon from './types/enum_icon';
import Timespan from './types/timespan';
import Datetime from './types/datetime';
import Money from './types/money';
import Thumbnail from './types/thumbnail';
import Audio from './types/audio';
import InterAction from './types/interaction';
import Divider from './types/divider';

let Fields = {
  raw: Raw,
  enum_text: EnumText,
  enum_icon: EnumIcon,
  timespan: Timespan,
  datetime: Datetime,
  money: Money,
  thumbnail: Thumbnail,
  audio: Audio,
  interaction: InterAction,
  divider: Divider
};

// 内置组件列表
export const originalFieldList = [
  'raw',
  'enum_text',
  'enum_icon',
  'timespan', 
  'datetime',
  'money',
  'thumbnail',
  'audio',
  'interaction',
  'divider'
];

/**
 * 添加第三方Fields
 * @param {Array} components Fields列表对象, 结构为{组件别名: 组件}
 */
export function addTableFields(components) {
  Object.keys(components).forEach(key => {
    Fields[key] = components[key];
  });
}

export function getTableFields() {
  return Fields;
}