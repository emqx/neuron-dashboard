/**
 * When updating here, the @/utils/constants.ts file ERROR_CODE_ARR should be updated together.
 */
export default {
  1000: {
    zh: '通用错误',
    en: 'Generic error',
  },
  1001: {
    zh: '内部错误',
    en: 'Internal error',
  },
  1002: {
    zh: '请求 body 无效',
    en: 'Request body invalid',
  },
  1003: {
    zh: '请求 param 无效',
    en: 'Request param invalid',
  },
  1004: {
    zh: '缺少令牌',
    en: 'Missing token',
  },
  1005: {
    zh: '解码令牌错误',
    en: 'Decoding token error',
  },
  1006: {
    zh: '令牌过期',
    en: 'Expired token',
  },
  1007: {
    zh: '验证令牌错误',
    en: 'Validate token error',
  },
  1008: {
    zh: '无效令牌',
    en: 'Invalid token',
  },
  1009: {
    zh: '用户名或密码错误',
    en: 'User or password error',
  },
  1010: {
    zh: '程序繁忙',
    en: 'Is busy',
  },
  2002: {
    zh: 'Node 已存在',
    en: 'Node exist',
  },
  2003: {
    zh: 'Node 不存在',
    en: 'Node not exist',
  },
  2004: {
    zh: 'Node 设置无效',
    en: 'Node setting invalid',
  },
  2005: {
    zh: 'Node 设置未找到',
    en: 'Node setting not found',
  },
  2006: {
    zh: 'Node 未准备好',
    en: 'Node not ready',
  },
  2007: {
    zh: 'Node 正在运行',
    en: 'Node is running',
  },
  2008: {
    zh: 'Node 未运行',
    en: 'Node not running',
  },
  2009: {
    zh: 'Node 已停止',
    en: 'Node is stopped',
  },
  2010: {
    zh: 'Node 名称过长',
    en: 'Node name too long',
  },
  2101: {
    zh: 'Group 已经被订阅',
    en: 'Group already subscribed',
  },
  2102: {
    zh: 'Group 未被订阅',
    en: 'Group not subscribe',
  },
  2103: {
    zh: 'Group 不允许',
    en: 'Group not allow',
  },
  2104: {
    zh: 'Group 已存在',
    en: 'Group exist',
  },
  2105: {
    zh: 'Group 参数无效',
    en: 'Group parameter invalid',
  },
  2106: {
    zh: 'Group 不存在',
    en: 'Group not exist',
  },
  2107: {
    zh: 'Group 名称过长',
    en: 'Group name too long',
  },
  2201: {
    zh: 'Tag 不存在',
    en: 'Tag not exist',
  },
  2202: {
    zh: 'Tag 名称冲突',
    en: 'Tag name conflict',
  },
  2203: {
    zh: 'Tag 属性不支持',
    en: 'Tag attribute not support',
  },
  2204: {
    zh: 'Tag 类型不支持',
    en: 'Tag type not support',
  },
  2205: {
    zh: 'Tag 地址格式无效',
    en: 'Tag address format invalid',
  },
  2206: {
    zh: 'Tag 名称过长',
    en: 'Tag name too long',
  },
  2207: {
    zh: 'Tag 地址过长',
    en: 'Tag address too long',
  },
  2208: {
    zh: 'Tag 描述过长',
    en: 'Tag description too long',
  },
  2301: {
    zh: '库未找到',
    en: 'Library not found',
  },
  2302: {
    zh: '库信息无效',
    en: 'Library info invalid',
  },
  2303: {
    zh: '库名称冲突',
    en: 'Library name conflict',
  },
  2304: {
    zh: '库打开失败',
    en: 'Library failed to open',
  },
  2305: {
    zh: '库模块无效',
    en: 'Libraray module invalid',
  },
  2306: {
    zh: '系统库不允许删除',
    en: 'Library system not allow del',
  },
  2400: {
    zh: 'License 未找到',
    en: 'License not found',
  },
  2401: {
    zh: 'License 无效',
    en: 'License invalid',
  },
  2402: {
    zh: 'License 过期',
    en: 'License expired',
  },
  2403: {
    zh: 'License 未启用插件',
    en: 'Plugin disabled by license',
  },
  2404: {
    zh: '达到 license 授权的最大节点数',
    en: 'Reach licensed max number of nodes',
  },
  2405: {
    zh: '达到 license 授权的节点最大点位数',
    en: 'Reach licensed max number of tags per node',
  },
  3000: {
    zh: '插件读失败',
    en: 'Plugin read failure',
  },
  3001: {
    zh: '插件写失败',
    en: 'Plugin write failure',
  },
  3002: {
    zh: '插件未连接',
    en: 'Plugin disconnected',
  },
  3003: {
    zh: '插件 tag 不允许读',
    en: 'Plugin tag not allow read',
  },
  3004: {
    zh: '插件 tag 不允许写',
    en: 'Plugin tag not allow write',
  },
  3007: {
    zh: '插件 tag 类型不匹配',
    en: 'Plugin tag type mismatch',
  },
  3008: {
    zh: '插件 tag 值失效',
    en: 'Plugin tag value expired',
  },
  3009: {
    zh: '插件协议解析失败',
    en: 'Plugin protocol decode failure',
  },
  3010: {
    zh: '插件未运行',
    en: 'Plugin not running',
  },
  3011: {
    zh: '插件 tag 未就绪',
    en: 'Plugin tag not ready',
  },
  3012: {
    zh: '插件报文乱序',
    en: 'Plugin packet out of order',
  },
  10101: {
    zh: '硬件错误',
    en: 'S7comm hardware error',
  },
  10103: {
    zh: '对象无访问权限',
    en: 'S7comm accessing the object not allowed',
  },
  10105: {
    zh: '无效地址',
    en: 'S7comm invalid address',
  },
  10106: {
    zh: '数据类型不支持',
    en: 'S7comm data type not supported',
  },
  10107: {
    zh: '数据类型不一致',
    en: 'S7comm data type inconsistent',
  },
  10110: {
    zh: '对象不存在',
    en: 'S7comm object not exist',
  },
  10150: {
    zh: 'COTP 连接断开',
    en: 'S7comm cotp disconnected',
  },
  10151: {
    zh: 'S7 连接断开',
    en: 'S7comm disconnected',
  },
  10200: {
    zh: '设备不存在',
    en: 'Knx no devices',
  },
  10400: {
    zh: '无效地址',
    en: 'Nona11 invalid address',
  },
  10500: {
    zh: 'Fins 连接断开',
    en: 'Fins disconnected',
  },
  10501: {
    zh: 'Fins 错误',
    en: 'Fins error',
  },
  10502: {
    zh: '第一个地址处于无效区域',
    en: 'Fins first address in inaccessible area',
  },
  10503: {
    zh: '最后一个字超出范围',
    en: 'Fins end of word exceed range',
  },
  10504: {
    zh: '无效的数据大小',
    en: 'Fins invalid size of data',
  },
  10505: {
    zh: '响应块太长',
    en: 'Fins response too long',
  },
  10506: {
    zh: '数据受保护',
    en: 'Fins data is protected',
  },
  10507: {
    zh: '区域只读',
    en: 'Fins area read-only',
  },
  10508: {
    zh: ' 数据不可更改',
    en: 'Fins data cannot change',
  },
}
