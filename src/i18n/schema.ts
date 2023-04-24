// If the subsequent English also needs front-end support, please add the English(en) translation and the logic of NodeConfigParamItem.vue
export default {
  // mqtt
  mqttCa: {
    zh: 'CA 证书',
    en: '',
  },
  mqttCaDesc: {
    zh: '签发服务器证书的 CA 证书',
    en: '',
  },
  mqttCacheDiskSize: {
    zh: '缓存磁盘大小（MB）',
    en: '',
  },
  mqttCacheDiskSizeDesc: {
    zh: '当 MQTT 连接异常时，最大的磁盘缓存大小（单位：MB）。应该大于缓存内存大小。如果不为 0，缓存内存大小也应该不为 0',
    en: '',
  },
  mqttCacheMemSize: {
    zh: '缓存内存大小（MB）',
    en: '',
  },
  mqttCacheMemSizeDesc: {
    zh: '当 MQTT 连接异常时，最大的内存缓存大小（单位：MB）。应该小于缓存磁盘大小',
    en: '',
  },
  mqttCert: {
    zh: '客户端证书',
    en: '',
  },
  mqttCertDesc: {
    zh: '使用双向认证时，客户端的 x509 证书',
    en: '',
  },
  mqttClientId: {
    zh: '客户端 ID',
    en: '',
  },
  mqttClientDesc: {
    zh: 'MQTT 客户端 ID',
    en: '',
  },
  mqttFormat: {
    zh: '上报数据格式',
    en: '',
  },
  mqttFormatDesc: {
    zh: '上报数据的 JSON 格式。在 values-format 格式下，数据被分为 `values` 和 `errors` 两个子对象。在 tags-format 格式下，数据被放在一个数组中',
    en: '',
  },

  mqttHost: {
    zh: '服务器地址',
    en: '',
  },
  mqttHostDesc: {
    zh: 'MQTT 服务器地址',
    en: '',
  },
  mqttKey: {
    zh: '客户端私钥',
    en: '',
  },
  mqttKeyDesc: {
    zh: '使用双向认证时，客户端的私钥',
    en: '',
  },
  mqttKeypass: {
    zh: '客户端私钥密码',
    en: '',
  },
  mqttKeypassDesc: {
    zh: '使用加密的客户端私钥进行双向认证时，客户端私钥的密码',
    en: '',
  },
  mqttOfflineCache: {
    zh: '离线缓存',
    en: '',
  },
  mqttOfflineCacheDesc: {
    zh: '离线缓存开关。连接断开时缓存 MQTT 消息，连接重建时同步缓存的 MQTT 消息到服务器',
    en: '',
  },
  mqttUsername: {
    zh: '用户名',
    en: '',
  },
  mqttUsernameDesc: {
    zh: 'MQTT 用户名',
    en: '',
  },
  mqttPassword: {
    zh: '密码',
    en: '',
  },
  mqttPasswordDesc: {
    zh: 'MQTT 用户密码',
    en: '',
  },
  mqttPort: {
    zh: '服务器端口',
    en: '',
  },
  mqttPortDesc: {
    zh: 'MQTT 服务器端口',
    en: '',
  },
  mqttQos: {
    zh: 'QoS 等级',
    en: '',
  },
  mqttQosDesc: {
    zh: 'MQTT 消息传输使用的服务质量等级',
    en: '',
  },
  mqttSsl: {
    zh: 'SSL',
    en: '',
  },
  mqttSslDesc: {
    zh: '是否启用 SSL 连接',
    en: '',
  },
  // ekuiper
  ekuiperHost: {
    zh: '本地 IP 地址',
    en: '',
  },
  ekuiperHostDesc: {
    zh: '绑定本地 IP 地址，等待 eKuiper 连接',
    en: '',
  },
  ekuiperPort: {
    zh: '本地端口',
    en: '',
  },
  ekuiperPortDesc: {
    zh: '绑定本地端口，等待 eKuiper 连接',
    en: '',
  },
  // monitor
  monitorCa: {
    zh: 'CA 证书',
    en: '',
  },
  monitorCaDesc: {
    zh: '签发服务器证书的 CA 证书',
    en: '',
  },
  monitorCert: {
    zh: '客户端证书',
    en: '',
  },
  monitorCertDesc: {
    zh: '使用双向认证时，客户端的 x509 证书',
    en: '',
  },
  monitorClientId: {
    zh: '客户端 ID',
    en: '',
  },
  monitorClientIdDesc: {
    zh: 'MQTT 客户端 ID',
    en: '',
  },
  monitorEventTopicPrefix: {
    zh: '事件主题前缀',
    en: '',
  },
  monitorEventTopicPrefixDesc: {
    zh: '事件消息发布的主题前缀',
    en: '',
  },
  monitorHeartbeatInterval: {
    zh: '心跳间隔',
    en: '',
  },
  monitorHeartbeatIntervalDesc: {
    zh: '每个心跳消息之间的间隔时间（秒），设置为 0 将禁用心跳消息',
    en: '',
  },
  monitorHeartbeatTopic: {
    zh: '心跳主题',
    en: '',
  },
  monitorHeartbeatTopicDesc: {
    zh: '心跳消息发布的主题',
    en: '',
  },
  monitorHost: {
    zh: '服务器地址',
    en: '',
  },
  monitorHostDesc: {
    zh: 'MQTT 服务器地址',
    en: '',
  },
  monitorKey: {
    zh: '客户端私钥',
    en: '',
  },
  monitorKeyDesc: {
    zh: '使用双向认证时，客户端的私钥',
    en: '',
  },
  monitorKeypass: {
    zh: '客户端私钥密码',
    en: '',
  },
  monitorKeypassDesc: {
    zh: '使用加密的客户端私钥进行双向认证时，客户端私钥的密码',
    en: '',
  },
  monitorUsername: {
    zh: '用户名',
    en: '',
  },
  monitorUsernameDesc: {
    zh: 'MQTT 用户名',
    en: '',
  },
  monitorPassword: {
    zh: '密码',
    en: '',
  },
  monitorPasswordDesc: {
    zh: 'MQTT 用户密码',
    en: '',
  },
  monitorPort: {
    zh: '服务器端口',
    en: '',
  },
  monitorPortDesc: {
    zh: 'MQTT 服务器端口',
    en: '',
  },
  monitorSsl: {
    zh: 'SSL',
    en: '',
  },
  monitorSslDesc: {
    zh: '是否启用 SSL 连接',
    en: '',
  },
  // modbustcp
  modbustcpConnectionMode: {
    zh: '连接模式',
    en: '',
  },
  modbustcpConnectionModeDesc: {
    zh: 'Neuron 作为客户端或服务端',
    en: '',
  },
  modbustcpHost: {
    zh: 'IP 地址',
    en: '',
  },
  modbustcpHostDesc: {
    zh: '服务端模式中填写本地 IP，客户端模式中填写目标设备 IP',
    en: '',
  },
  modbustcpInterval: {
    zh: '指令发送间隔',
    en: '',
  },
  modbustcpIntervalDesc: {
    zh: '发送读指令时间间隔，单位为毫秒',
    en: '',
  },
  modbustcpPort: {
    zh: '端口号',
    en: '',
  },
  modbustcpPortDesc: {
    zh: '服务端模式中填写本地端口号，客户端模式中填写远程设备端口号',
    en: '',
  },
  modbustcpTimeout: {
    zh: '连接超时时间',
    en: '',
  },
  modbustcpTimeoutDesc: {
    zh: '连接超时时间，单位为毫秒',
    en: '',
  },
  // modbusrtu
  modbusrtuBaud: {
    zh: '波特率',
    en: '',
  },
  modbusrtuBaudDesc: {
    zh: '波特率',
    en: '',
  },
  modbusrtuConnectionMode: {
    zh: '连接模式',
    en: '',
  },
  modbusrtuConnectionModeDesc: {
    zh: 'Neuron 作为客户端或服务端',
    en: '',
  },
  modbusrtuData: {
    zh: '数据位',
    en: '',
  },
  modbusrtuDataDesc: {
    zh: '数据位',
    en: '',
  },
  modbusrtuDevice: {
    zh: '串口设备',
    en: '',
  },
  modbusrtuDeviceDesc: {
    zh: '串口设备路径',
    en: '',
  },
  modbusrtuHost: {
    zh: 'IP 地址',
    en: '',
  },
  modbusrtuHostDesc: {
    zh: '服务端模式中填写本地 IP，客户端模式中填写目标设备 IP',
    en: '',
  },
  modbusrtuInterval: {
    zh: '指令发送间隔',
    en: '',
  },
  modbusrtuIntervalDesc: {
    zh: '发送读指令时间间隔，单位为毫秒',
    en: '',
  },
  modbusrtuLink: {
    zh: '物理链路',
    en: '',
  },
  modbusrtuLinkDesc: {
    zh: '串口连接或以太网连接',
    en: '',
  },
  modbusrtuParity: {
    zh: '校验位',
    en: '',
  },
  modbusrtuParityDesc: {
    zh: '校验位',
    en: '',
  },
  modbusrtuPort: {
    name: {
      zh: '端口号',
      en: '',
    },
    description: {
      zh: '服务端模式中填写本地端口号，客户端模式中填写远程设备端口号',
      en: '',
    },
  },
  modbusrtuStop: {
    zh: '停止位',
    en: '',
  },
  modbusrtuStopDesc: {
    zh: '停止位',
    en: '',
  },
  modbusrtuIimeout: {
    zh: '连接超时时间',
    en: '',
  },
  modbusrtuIimeoutDesc: {
    zh: '连接超时时间，单位为毫秒',
    en: '',
  },
  // file
  fileFileLength: {
    name: {
      zh: '文件最大长度',
      en: 'File Max Length',
    },
    description: {
      zh: '连接超时时间，单位为毫秒',
      en: '',
    },
  },
}
