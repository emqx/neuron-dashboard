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
  1011: {
    zh: '文件不存在',
    en: 'File not exist',
  },
  1012: {
    zh: '密码长度太短或太长',
    en: 'Password length too short or too long',
  },
  1013: {
    zh: '密码重复',
    en: 'Duplicate password',
  },
  1014: {
    zh: '执行指令失败',
    en: 'Command execution failed',
  },
  1015: {
    zh: 'IP 地址无效',
    en: 'Invalid ip address',
  },
  1016: {
    zh: 'IP 地址已占用',
    en: 'IP address in use',
  },
  1017: {
    zh: '用户名无效',
    en: 'Invalid user',
  },
  1018: {
    zh: '密码无效',
    en: 'Invalid password',
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
  2011: {
    zh: 'Node 不允许删除',
    en: 'Node not allow delete',
  },
  2012: {
    zh: 'Node 不允许订阅',
    en: 'Node not allow subscribe',
  },
  2013: {
    zh: 'Node 不允许更新',
    en: 'Node not allow update',
  },
  2014: {
    zh: 'Node 不支持图',
    en: 'Node not allow map',
  },
  2015: {
    zh: 'Node 名称不允许为空',
    en: 'Node name is empty',
  },
  2101: {
    zh: '组已经被订阅',
    en: 'Group already subscribed',
  },
  2102: {
    zh: '组未被订阅',
    en: 'Group not subscribe',
  },
  2103: {
    zh: '组不允许',
    en: 'Group not allow',
  },
  2104: {
    zh: '组已存在',
    en: 'Group exist',
  },
  2105: {
    zh: '组参数无效',
    en: 'Group parameter invalid',
  },
  2106: {
    zh: '组不存在',
    en: 'Group not exist',
  },
  2107: {
    zh: '组名称过长',
    en: 'Group name too long',
  },
  2201: {
    zh: '点位不存在',
    en: 'Tag not exist',
  },
  2202: {
    zh: '点位名称冲突',
    en: 'Tag name conflict',
  },
  2203: {
    zh: '点位属性不支持',
    en: 'Tag attribute not support',
  },
  2204: {
    zh: '点位类型不支持',
    en: 'Tag type not support',
  },
  2205: {
    zh: '点位地址格式无效',
    en: 'Tag address format invalid',
  },
  2206: {
    zh: '点位名称过长',
    en: 'Tag name too long',
  },
  2207: {
    zh: '点位地址过长',
    en: 'Tag address too long',
  },
  2208: {
    zh: '点位描述过长',
    en: 'Tag description too long',
  },
  2209: {
    zh: '点位精度无效',
    en: 'Tag precision invalid',
  },
  2210: {
    zh: '点位已存在',
    en: 'Tag exist',
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
  2307: {
    zh: '插件不允许实例化',
    en: 'Library not allow create instance',
  },
  2308: {
    zh: '插件不支持此架构',
    en: 'Library arch not support',
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
  uploadLicense2402: {
    zh: `您的 License 已过期，
    请<a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">更新 License</a>
    或联系销售人员更新 License。`,
    en: `Your License has expired,
    please <a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">update the License</a>
    or contact the sales staff to update the License.`,
  },
  2403: {
    zh: 'License 未启用插件',
    en: 'Plugin disabled by license',
  },
  uploadLicense2403: {
    zh: `导入 License 失败，请先删除 License 不包含的驱动`,
    en: `Failed to import the License, please delete the driver not included in the License.`,
  },
  2404: {
    zh: '达到 license 授权的最大节点数',
    en: 'Reach licensed max number of nodes',
  },
  uploadLicense2404: {
    zh: `节点数超过 License 限制，Neuron 无法正常使用，
    请<a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">更新 License</a>
    或删除部分驱动节点。`,
    en: `The count of nodes exceeds the license limit, and Neuron cannot be used normally.
    Please <a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">update the license</a>
    or delete some driver nodes.`,
  },
  addDriverByPlugin2404: {
    zh: '节点数超过 License 限制，创建驱动失败',
    en: 'The count of nodes exceeds the limit of the license, and the creation of the driver fails',
  },
  addDriverByTemplate2404: {
    zh: '节点数超过 License 限制，创建驱动失败',
    en: 'The count of nodes exceeds the limit of the license, and the creation of the driver fails',
  },
  2405: {
    zh: '达到 license 授权的节点最大点位数',
    en: 'Reach licensed max number of tags per node',
  },
  uploadLicense2405: {
    zh: `点位数超过 License 限制，Neuron 无法正常使用，
    请<a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">更新 License</a>
    或删除部分点位。`,
    en: `The count of data tags exceeds the license limit, and Neuron cannot be used normally.
    Please <a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">update the license</a>
    or delete some data tags.`,
  },
  addDriverByTemplate2405: {
    zh: `点位数超过 License 限制，模版创建驱动失败`,
    en: `The count of data points exceeds the limit of the license, and the creation of the driver fails`,
  },
  addTagByNode2405: {
    zh: `点位数超过 License 限制，添加失败`,
    en: `The count of data points exceeds the license limit, and the addition fails`,
  },
  importTag2405: {
    zh: `点位数超过 License 限制，导入失败`,
    en: `The count of data points exceeds the license limit, and the import fails`,
  },
  2406: {
    zh: 'License 硬件不匹配',
    en: 'License hardware token not match',
  },
  uploadLicense2406: {
    zh: `License 与该硬件不匹配，Neuron 无法正常使用，
    请<a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">更新 License</a>
    或联系销售人员更新 License。`,
    en: `The license does not match the hardware, and Neuron cannot be used normally.
    Please <a target="_blank" rel="noopener norefferrer" href="https://www.emqx.com/zh/apply-licenses/neuron">update the license</a>
    or contact the sales staff to update the License.`,
  },
  2407: {
    zh: 'License 检测到时钟异常',
    en: 'License detect bad clock',
  },
  2408: {
    zh: 'License 模块无效',
    en: 'License module invalid',
  },
  2500: {
    zh: '模板已存在',
    en: 'Template exist',
  },
  2501: {
    zh: '模板未找到',
    en: 'Template not found',
  },
  2502: {
    zh: '模板名称太长',
    en: 'Template name too long',
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
  3013: {
    zh: '插件名称太长',
    en: 'Plugin name too long',
  },
  3014: {
    zh: '插件未找到',
    en: 'Plugin not found',
  },
  3015: {
    zh: '插件设备未回复',
    en: 'Plugin device not response',
  },
  3016: {
    zh: '插件不支持模板',
    en: 'Plugin not support template',
  },
  3017: {
    zh: '插件不支持写点位',
    en: 'Plugin not support write tags',
  },
  4100: {
    zh: '字符串太长',
    en: 'String too long',
  },
  4101: {
    zh: '打开文件失败',
    en: 'File open failure',
  },
  4102: {
    zh: '读文件失败',
    en: 'File read failure',
  },
  4103: {
    zh: '写文件失败',
    en: 'File write failure',
  },
  10001: {
    zh: 'Opcua 点位不存在',
    en: 'Opcua tag does not exist',
  },
  10002: {
    zh: 'Opcua 连接配置错误',
    en: 'Opcua connection configuration error',
  },
  10003: {
    zh: 'Opcua 访问超时',
    en: 'Opcua access timeout',
  },
  10004: {
    zh: 'Opcua 点位不可读',
    en: 'Opcua tag is not readable',
  },
  10005: {
    zh: 'Opcua 点位不可写',
    en: 'Opcua tag is not writable',
  },
  10006: {
    zh: 'Opcua 点位不支持',
    en: 'Opcua tag is not supported',
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
  10152: {
    zh: '没有值',
    en: 'S7comm no value',
  },
  10153: {
    zh: '值长度太短',
    en: 'S7comm value too short',
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
    zh: '本地节点错误',
    en: 'Fins local node error',
  },
  10503: {
    zh: '目标节点错误',
    en: 'Fins dest node error',
  },
  10504: {
    zh: '控制器错误',
    en: 'Fins communication controller error',
  },
  10505: {
    zh: '服务不受支持',
    en: 'Fins not executable',
  },
  10506: {
    zh: '路由表错误',
    en: 'Fins routing error',
  },
  10507: {
    zh: '命令格式错误',
    en: 'Fins command format error',
  },
  10508: {
    zh: '参数错误',
    en: 'Fins parameter error',
  },
  10509: {
    zh: '无法读取',
    en: 'Fins read not possible',
  },
  10510: {
    zh: '无法写入',
    en: 'Fins write not possible',
  },
  10511: {
    zh: '当前模式不可执行',
    en: 'Fins not executable in current mode',
  },
  10512: {
    zh: '单元不存在',
    en: 'Fins no unit',
  },
  10513: {
    zh: '无法启动/停止',
    en: 'Fins start/stop not possible',
  },
  10514: {
    zh: '单元错误',
    en: 'Fins unit error',
  },
  10515: {
    zh: '命令错误',
    en: 'Fins command error',
  },
  10516: {
    zh: '访问权限错误',
    en: 'Fins access error',
  },
  10517: {
    zh: '中止',
    en: 'Fins abort',
  },
  10600: {
    zh: 'Focas 错误',
    en: 'Focas error',
  },
  // 10701 - 10744
  10701: {
    zh: 'EtherNet/IP 错误',
    en: 'EtherNet/IP error',
  },
  10797: {
    zh: 'EtherNet/IP 没有 CIP 连接',
    en: 'EtherNet/IP no CIP connection',
  },
  10798: {
    zh: 'EtherNet/IP 数据类型不匹配',
    en: 'EtherNet/IP data type mismatch',
  },
  10799: {
    zh: 'EtherNet/IP 未注册session',
    en: 'EtherNet/IP no session',
  },
  // Profinet IO
  10800: {
    zh: 'Profinet IO 未识别',
    en: 'Profinet IO unidentified',
  },
  10801: {
    zh: 'Profinet IO 未连接',
    en: 'Profinet IO not connected',
  },
  10802: {
    zh: 'Profinet IO 未准备好',
    en: 'Profinet IO not ready',
  },
  10803: {
    zh: 'Profinet IO 参数未准备好',
    en: 'Profinet IO not param end',
  },
  10804: {
    zh: 'Profinet IO 没有写入权限',
    en: 'Profinet IO not DWRITE',
  },
  10805: {
    zh: 'Profinet IO 等待 HELLO 响应',
    en: 'Profinet IO wait HELLO',
  },
}
