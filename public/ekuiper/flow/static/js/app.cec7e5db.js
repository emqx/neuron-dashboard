;(function (e, t) {
  'object' === typeof exports && 'object' === typeof module
    ? (module.exports = t())
    : 'function' === typeof define && define.amd
    ? define([], t)
    : 'object' === typeof exports
    ? (exports['flow-ekuiper'] = t())
    : (e['flow-ekuiper'] = t())
})(self, function () {
  return (function () {
    var e = {
        2031: function (e, t, a) {
          'use strict'
          a.r(t),
            (t['default'] = {
              language: { zh: '语言', en: 'Language' },
              listPage: { zh: '列表页', en: 'List' },
              name: { zh: '名称', en: 'Name' },
              type: { zh: '类型', en: 'Type' },
              version: { zh: '版本', en: 'Version' },
              operations: { zh: '操作', en: 'Operations' },
              create: { zh: '创建', en: 'Create' },
              view: { zh: '查看', en: 'View' },
              edit: { zh: '编辑', en: 'Edit' },
              delete: { zh: '删除', en: 'Delete' },
              update: { zh: '更新', en: 'Update' },
              upload: { zh: '上传', en: 'Upload' },
              uploadFile: { zh: '上传文件', en: 'Upload ' },
              uploadSuccess: { zh: '上传成功', en: 'Upload successfully' },
              submit: { zh: '提交', en: 'Submit' },
              submitData: { zh: '提交数据', en: 'Submit data' },
              noConfigurationItems: { zh: '暂无配置项', en: 'No configuration items' },
              save: { zh: '保存', en: 'Save' },
              saveSuccess: { zh: '保存成功 ', en: 'Save successfully' },
              saveToBrowser: { zh: '保存至浏览器', en: 'Save to browser' },
              recoverSavedToBrowser: { zh: '恢复保存至浏览器的数据', en: 'Recover data saved to browser' },
              exportDataToLocal: { zh: '导出数据至本地', en: 'Export data to local' },
              uploadLocalData: { zh: '上传本地数据', en: 'Upload local data' },
              reset: { zh: '重置', en: 'Reset' },
              colse: { zh: '关闭', en: 'Close' },
              add: { zh: '添加', en: 'Add' },
              cancel: { zh: '取消', en: 'Cancel' },
              close: { zh: '关闭', en: 'Close' },
              addSuccess: { zh: '添加成功', en: 'Added successfully' },
              createSuccess: { zh: '创建成功', en: 'Create successfully' },
              confirmDelete: { zh: '确认删除吗？', en: 'Confirm delete?' },
              deleteSuccess: { zh: '删除成功', en: 'Delete successfully' },
              editSuccess: { zh: '编辑成功', en: 'Edit successfully' },
              restartSuccess: { zh: '重启成功', en: 'Restart successfully' },
              saveConfigurationSuccess: { zh: '配置保存成功', en: 'Configuration saved successfully' },
              warning: { zh: '警告', en: 'Warning' },
              ok: { zh: '确认', en: 'OK' },
              status: { zh: '状态', en: 'Status' },
              restart: { zh: '重启', en: 'Restart' },
              stop: { zh: '停止', en: 'Stop' },
              start: { zh: '启动', en: 'Start' },
              startSuccess: { zh: '启动成功', en: 'Start successfully' },
              stopSuccess: { zh: '停止成功', en: 'Stop successfully' },
              updateSuccess: { zh: '更新成功', en: 'Updated successfully' },
              login: { zh: '登 录', en: 'LOG IN' },
              logout: { zh: '退出登录', en: 'Logout' },
              username: { zh: '用户名', en: 'Username' },
              password: { zh: '密码', en: 'Password' },
              remember: { zh: '记住', en: 'Remember' },
              usernameRequried: { zh: '用户名不能为空', en: 'Please fill in the Username' },
              passwordRequired: { zh: '密码不能为空', en: 'Please fill in the password' },
              fillContent: { zh: '请填写内容', en: 'Please fill in the content' },
              changePassword: { zh: '修改密码', en: 'Change password' },
              oldPassword: { zh: '旧密码', en: 'Old password' },
              newPassword: { zh: '新密码', en: 'New password' },
              confirmPassword: { zh: '确认密码', en: 'Confirm password' },
              pleaseEnterYourPasswordAgain: { zh: '请再次输入密码', en: 'Please enter your password again' },
              confirmNotMatch: { zh: '两次输入密码不一致', en: 'The two input passwords do not match' },
              changePasswordSuccess: {
                zh: '密码修改成功，请重新登录',
                en: 'The modification is successful, please log in again',
              },
              selectCurrentNode: {
                zh: '请先选择当前使用的服务',
                en: 'Please select the service you need to use first',
              },
              day: { zh: '天', en: 'days' },
              hour: { zh: '时', en: 'hours' },
              min: { zh: '分', en: 'minutes' },
              seconds: { zh: '秒', en: 'seconds' },
              documentation: { zh: '使用文档', en: 'Documentation' },
              advanced: { zh: '高级', en: 'Advanced' },
              description: { zh: '描述', en: 'Description' },
              trial: { zh: '试用版', en: 'Trial' },
              yes: { zh: '是', en: 'Yes' },
              no: { zh: '否', en: 'No' },
              key: { zh: '键', en: 'Key' },
              value: { zh: '值', en: 'Value' },
              install: { zh: '安装', en: 'Install' },
              none: { zh: '无', en: 'None' },
              invalidateForm: { zh: '未验证表单', en: 'Invalidate Form' },
              createdAt: { zh: '创建时间', en: 'Created At' },
              updateAt: { zh: '更新时间', en: 'Update At' },
              forExample: { zh: '例如{value}', en: 'For example {value}' },
              testConnection: { zh: '测试连接', en: 'Test Connection' },
              TestConnectionSuccess: { zh: '测试连接成功', en: 'Test connection successfully' },
              TestConnectionfailed: { zh: '测试连接失败', en: 'Test connection failed' },
              copySuccess: { zh: '复制成功', en: 'Copy successfully' },
              back: { zh: '返回', en: 'Back' },
              file: { zh: '文件', en: 'File' },
              text: { zh: '文本', en: 'Text' },
              itemRequired: { zh: '请输入{name}', en: '{name} is required' },
              notCorrectlyForm: { zh: '请正确填写内容', en: 'Please fill in the correct content' },
              emptyForm: { zh: '表单未正确填写', en: 'The form is not filled out correctly' },
              placeholderByname: { zh: '请输入{name}', en: 'Enter {name}' },
              unlock: { zh: '解锁', en: 'Unlock' },
              lock: { zh: '锁定', en: 'Lock' },
              shrink: { zh: '缩小', en: 'Shrink' },
              zoom: { zh: '放大', en: 'Zoom' },
              recover: { zh: '恢复', en: 'Recover' },
              clear: { zh: '清除', en: 'Clear' },
              true: { zh: '是', en: 'True' },
              false: { zh: '否', en: 'False' },
              more: { zh: '更多', en: 'More' },
              expand: { zh: '展开', en: 'Expand' },
              collapse: { zh: '收起', en: 'Collapse' },
            })
        },
        4600: function (e, t, a) {
          'use strict'
          a.r(t),
            (t['default'] = {
              configuration: { zh: '配置', en: 'Configuration' },
              connection: { zh: '连接', en: 'Connection' },
              schema: { zh: '模式', en: 'Schema' },
              fileManagement: { zh: '文件管理', en: 'Files Management' },
              resource: { zh: '资源', en: 'Resources' },
              confKeyResource: { zh: '配置组资源', en: 'Configuration Key Resources' },
              sourceConfKeys: { zh: '源配置组', en: 'Source configuration keys' },
              sinkTemplates: { zh: '传输与存储模板', en: 'Sink templates' },
              confKey: { zh: '配置组', en: 'Configuration key' },
              viewConfKey: { zh: '查看配置组', en: 'View configuration key' },
              addConfKey: { zh: '添加配置组', en: 'Add configuration key' },
              editConfKey: { zh: '编辑配置组', en: 'Edit configuration key' },
              addSourceConfKey: { zh: '添加源配置组', en: 'Add source configuration key' },
              addSinkTemplate: { zh: '添加传输与存储模板', en: 'Add sink template' },
              editSourceConfKey: { zh: '编辑源配置组', en: 'Edit source configuration key' },
              editSinkTemplate: { zh: '编辑传输与存储模板', en: 'Edit sink template' },
              connectionSelector: { zh: '连接选择器', en: 'Connection Selector' },
            })
        },
        354: function (e, t, a) {
          'use strict'
          a.r(t)
          var l = a(7330),
            o = a(4642)
          const n = ['common', 'rules', 'streams', 'configuration', 'node', 'validate'],
            s = { en: {}, zh: {} }
          n.forEach((e) => {
            const t = a(1054)(`./${e}`).default
            Object.keys(t).forEach((a) => {
              const { en: l, zh: o } = t[a]
              ;(s.en[e] = s.en[e] || {}), (s.zh[e] = s.zh[e] || {}), (s.en[e][a] = l), (s.zh[e][a] = o)
            })
          })
          const r = { en: s.en, zh: s.zh },
            u = (0, l.o)({ legacy: !1, globalInjection: !0, locale: o.Z.state.lang, fallbackLocale: 'zh', messages: r })
          t['default'] = u
        },
        8451: function (e, t, a) {
          'use strict'
          a.r(t),
            (t['default'] = {
              viewChart: { zh: '查看图表', en: 'View Chart' },
              chart: { zh: '图表', en: 'Chart' },
              data: { zh: '数据', en: 'Data' },
              noNodeToConfig: { zh: '请选择节点进行配置', en: 'Please select the node for configuration' },
              saveLocalSuccess: { zh: '本地保存成功', en: 'Local save successful' },
              recoverDataSuccess: { zh: '数据恢复成功', en: 'Data recovery successful' },
              dataSources: { zh: '数据源', en: 'Data Sources' },
              dataProcessing: { zh: '数据处理', en: 'Data Processing' },
              aggregateData: { zh: '聚合数据', en: 'Aggregate Data' },
              operators: { zh: '操作符', en: 'Operators' },
              transportAndStorage: { zh: ' 传输与存储', en: 'Transport and Storage' },
              notAllowMultiInputsTip: { zh: '{name}节点仅支持 1 条输入', en: 'The {name} node supports only 1 input' },
            })
        },
        4520: function (e, t, a) {
          'use strict'
          a.r(t),
            (t['default'] = {
              rules: { zh: '规则', en: 'Rules' },
              createRule: { zh: '新建规则', en: 'Create rule' },
              editRule: { zh: '编辑规则', en: 'Edit rule' },
              actionTip: { zh: 'JSON 数组表示', en: 'JSON array representation' },
              ruleId: { zh: '规则 ID', en: 'Rule ID' },
              idRequired: { zh: '请填写 Rule ID', en: 'Rule ID is Required' },
              actionsRequired: { zh: '请填写 Actions', en: 'Actions is required' },
              startStop: { zh: '启动/停止', en: 'Start/Stop' },
              isEventTime: { zh: '是否使用时间事件', en: 'Is Event Time' },
              isEventTimeDesc: {
                zh: '使用事件时间还是将时间用作事件的时间戳。 如果使用事件时间，则将从有效负载中提取时间戳。 必须通过 stream 定义指定时间戳记。',
                en: 'Whether to use event time or processing time as the timestamp for an event. If event time is used, the timestamp will be extracted from the payload. The timestamp filed must be specified by the stream definition.',
              },
              lateTolerance: { zh: '延迟多少毫秒', en: 'Late Tolerance (ms)' },
              lateToleranceDesc: {
                zh: '在使用事件时间窗口时，可能会出现元素延迟到达的情况。 LateTolerance可以指定在删除元素之前可以延迟多少时间（单位为毫秒）。 默认情况下，该值为0，表示后期元素将被删除。',
                en: 'When working with event-time windowing, it can happen that elements arrive late. LateTolerance can specify by how much time(unit is millisecond) elements can be late before they are dropped. By default, the value is 0 which means late elements are dropped.',
              },
              concurrency: { zh: '线程数', en: 'Concurrency' },
              concurrencyDesc: {
                zh: '一条规则运行时会根据 sql 语句分解成多个 plan 运行。该参数设置每个 plan 运行的线程数。该参数值大于1时，消息处理顺序可能无法保证。',
                en: 'A rule is processed by several phases of plans according to the sql statement. This option will specify how many instances will be run for each plan. If the value is bigger than 1, the order of the messages may not be retained.',
              },
              sinkConcurrencyDesc: {
                zh: '设置运行的线程数。该参数值大于1时，消息发出的顺序可能无法保证。',
                en: 'Specify how many instances of the sink will be run. If the value is bigger than 1, the order of the messages may not be retained.',
              },
              bufferLength: { zh: '缓存大小', en: 'Buffer Length' },
              bufferLengthDesc: {
                zh: '指定每个 plan 可缓存消息数。若缓存消息数超过此限制，plan 将阻塞消息接收，直到缓存消息被消费使得缓存消息数目小于限制为止。此选项值越大，则消息吞吐能力越强，但是内存占用也会越多。',
                en: 'Specify how many messages can be buffered in memory for each plan. If the buffered messages exceed the limit, the plan will block message receiving until the buffered messages have been sent out so that the buffered size is less than the limit. A bigger value will accommodate more throughput but will also take up more memory footprint.',
              },
              sinkBufferLengthDesc: {
                zh: '设置可缓存消息数目。若缓存消息数超过此限制，sink将阻塞消息接收，直到缓存消息被消费使得缓存消息数目小于限制为止。',
                en: 'Specify how many messages can be buffered in memory. If the buffered messages exceed the limit, the sink will block message receiving until the buffered messages have been sent out so that the buffered size is less than the limit.',
              },
              sendMetaToSink: { zh: '是否发送元数据', en: 'Send Meta To Sink' },
              sendMetaToSinkDesc: {
                zh: '指定是否将事件的元数据发送到目标。 如果为 true，则目标可以获取元数据信息。',
                en: 'Specify whether the meta data of an event will be sent to the sink. If true, the sink can get te meta data information.',
              },
              qos: { zh: '流的 QoS', en: 'QoS' },
              qosDesc: {
                zh: '指定流的 qos。 值为0对应最多一次； 1对应至少一次，2对应恰好一次。 如果 qos 大于0，将激活检查点机制以定期保存状态，以便可以从错误中恢复规则。',
                en: 'Specify the qos of the stream. The options are 0: At most once; 1: At least once and 2: Exactly once. If qos is bigger than 0, the checkpoint mechanism will be activated to save states periodically so that the rule can be resumed from errors.',
              },
              checkpointInterval: { zh: '检查点间隔毫秒数', en: 'Check Point Interval (ms)' },
              checkpointIntervalDesc: {
                zh: '指定触发检查点的时间间隔（单位为 ms）。 仅当 qos 大于0时才有效。',
                en: 'Specify the time interval in milliseconds to trigger a checkpoint. This is only effective when qos is bigger than 0.',
              },
              attempts: { zh: '最大重试次数', en: 'Attempts' },
              attemptsDesc: {
                zh: '最大重试次数。如果设置为0，该规则将立即失败，不会进行重试',
                en: 'Maximum number of retries. If set to 0, the rule will fail immediately and no retries will be made.',
              },
              delay: { zh: '重试间隔时间', en: 'Delay' },
              delayDesc: {
                zh: '默认的重试间隔时间，以毫秒为单位。如果没有设置multiplier，重试的时间间隔将固定为这个值。',
                en: 'The default retry interval, in milliseconds. If multiplier is not set, the retry interval will be fixed to this value.',
              },
              maxDelay: { zh: '重试的最大间隔时间', en: 'Max Delay' },
              maxDelayDesc: {
                zh: '重试的最大间隔时间，单位是毫秒。只有当multiplier有设置时，从而使得每次重试的延迟都会增加时才会生效。默认的重试间隔时间，以毫秒为单位。如果没有设置multiplier，重试的时间间隔将固定为这个值。',
                en: 'The maximum time between retries in milliseconds. This only takes effect if multiplier has a setting, thus making the delay increase for each retry.',
              },
              multiplier: { zh: '重试间隔时间系数', en: 'Multiplier' },
              multiplierDesc: { zh: '重试间隔时间的乘数。', en: 'The multiplier of the retry interval time.' },
              jitterFactor: { zh: '随机值系数', en: 'Jitter Factor' },
              jitterFactorDesc: {
                zh: '添加或减去延迟的随机值系数，防止在同一时间重新启动多个规则。',
                en: 'Add or subtract delayed random value factors to prevent restarting multiple rules at the same time.',
              },
              actions: { zh: '动作', en: 'Actions' },
              actionName: { zh: '动作名称', en: 'Action Name' },
              addAction: { zh: '添加动作', en: 'Add action' },
              editAction: { zh: '编辑动作', en: 'Edit action' },
              viewAction: { zh: '查看动作', en: 'View action' },
              sinkRequired: { zh: '请选择 Sink', en: 'Sink is required' },
              resourceIdRequired: { zh: '请选择 Resource ID', en: 'Resource ID is required' },
              customProperty: { zh: '自定义属性', en: 'Custom property' },
              baseProperty: { zh: '基础属性', en: 'Base property' },
              options: { en: 'Options', zh: '选项' },
              enterCreate: {
                zh: '输入新条目后，按下回车键即可新建条目',
                en: 'After entering a new item, press the Enter key to create a new item',
              },
              text: { zh: '文本内容', en: 'Text' },
              textMode: { zh: '文本模式', en: 'Text mode' },
              visualizationMode: { zh: '可视化模式', en: 'Visualization mode' },
              topo: { zh: '拓扑图', en: 'Topology' },
              omitIfEmpty: { zh: '是否忽略输出', en: 'Omit if content is empty' },
              omitIfEmptyDesc: {
                zh: '如果选择结果为空，则忽略输出。',
                en: 'If the configuration item is set to true, when SELECT result is empty, then the result will not feed to sink operator.',
              },
              sendSingle: { zh: '将结果数据按条发送', en: 'Send single' },
              sendSingleDesc: {
                zh: "输出消息以数组形式接收，该属性意味着是否将结果一一发送。默认为 false。\n\n      如果为 false，则输出消息将为 {'{'}\"result\": \"{'$'}{'{'} the string of received message {'}'}\"{'}'}。\n\n      例如 {'{'}\"result\":\"[{'{'}\"count\":30{'}'}, {'{'}\"count\":20{'}'}]\"{'}'}。\n\n      否则，结果消息将与实际字段名称一一对应发送。\n\n      对于与上述相同的示例，它将发送 {'{'}\"count\":30{'}'}，然后发送 {'{'}\"count\":20{'}'} 到 RESTful 端点。\n      ",
                en: "The output messages are received as an array. This is indicate whether to send the results one by one. Default to false.\n\n      If false, the output message will be {'{'}\"result\": \"{'$'}{'{'} the string of received message {'}'}\" {'}'}.\n\n      For example, {'{'}\"result\":\"[{'{'}\"count\":30{'}'}, {'{'}\"count\":20{'}'}]\"{'}'}\n\n      Otherwise, the result message will be sent one by one with the actual field name.\n\n      For the same example as above, it will send {'{'}\"count\":30 {'}'}, then send {'{'}\"count\":20 {'}'} to the RESTful endpoint\n      ",
              },
              dataTemplate: { zh: '数据模版', en: 'Data template' },
              dataTemplateDesc: {
                zh: 'Golang 模板格式字符串，用于指定输出数据格式。 模板的输入是目标消息，该消息始终是 map 数组。 如果未指定数据模板，则将数据作为原始输入。',
                en: 'The golang template format string to specify the output data format. The input of the template is the sink message which is always an array of map. If no data template is specified, the raw input will be the data.',
              },
              runAsync: { zh: '是否异步运行', en: 'Run async' },
              runAsyncDesc: {
                zh: '设置是否异步运行输出操作以提升性能。请注意，异步运行的情况下，输出结果顺序不能保证。',
                en: 'Whether the sink will run asynchronously for better performance. If it is true, the sink result order is not promised.',
              },
              enableCache: { zh: '启用缓存', en: 'Enable Cache' },
              enableCacheDesc: {
                zh: '控制是否启用缓存。如果它设置为 true，那么缓存将被启用，否则，它将被禁用。',
                en: "Control to enable cache or not. If it's set to true, then the cache will be enabled, otherwise, it will be disabled.",
              },
              memoryCacheThreshold: { zh: '内存缓存阈值', en: 'Memory Cache Threshold' },
              memoryCacheThresholdDesc: {
                zh: '内存中缓存的最大消息数。',
                en: 'The maximum number of messages to be cached in memory.',
              },
              maxDiskCache: { zh: '最大磁盘缓存', en: 'Max Disk Cache' },
              maxDiskCacheDesc: {
                zh: '缓存在磁盘中的最大消息数。',
                en: 'The maximum number of messages to be cached in the disk.',
              },
              cleanCacheAtStop: { zh: '停止时清理缓存', en: 'Clean Cache At Stop' },
              cleanCacheAtStopDesc: {
                zh: '规则停止时是否清理缓存',
                en: 'Whether to clean the cache when the rule stops.',
              },
              bufferPageSize: { zh: '缓冲区页面大小', en: 'Buffer Page Size' },
              bufferPageSizeDesc: {
                zh: '缓冲区页的消息数，单位为批量读/写磁盘，防止频繁 IO。',
                en: 'The number of messages for a buffer page which is the unit to read/write to disk batchly to prevent frequent IO.',
              },
              resendInterval: { zh: '重发间隔', en: 'Resend Interval' },
              resendIntervalDesc: {
                zh: '重新发送缓存消息的时间间隔（毫秒）。',
                en: 'The interval in millisecond to resend the cached messages.',
              },
              textTip: {
                zh: '文本模式下，需要填写完整的 JSON 格式的规则描述,\n例如：\n    {\n      "sql": "SELECT revert(a) FROM demo",\n      "actions": [{\n        "log": {\n          "sendSingle": true\n        }\n      }]\n    }\n    ',
                en: 'In text mode, you need to fill in the full JSON format of the rule description,\nfor example:\n    {\n      "sql": "SELECT revert(a) FROM demo",\n      "actions": [{\n        "log": {\n          "sendSingle": true\n        }\n      }]\n    }\n    ',
              },
              alarmCounts: { zh: '告警次数', en: 'Alarm Times' },
              lastAlarm: { zh: '最近一次告警', en: 'Last Alarm' },
              clearAlarm: { zh: '清除告警', en: 'Clear Alarm' },
              copyRule: { zh: '复制规则', en: 'Copy Rule' },
              emptyRule: { zh: '请填写规则信息', en: 'Please fill in the rule information' },
              openCurrentlyCreatedRule: { zh: '打开当前创建的规则', en: 'Open the currently created rules' },
            })
        },
        600: function (e, t, a) {
          'use strict'
          a.r(t),
            (t['default'] = {
              stream: { zh: '流管理', en: 'Stream' },
              source: { zh: '源管理', en: 'Source' },
              createStream: { zh: '创建流', en: 'Create stream' },
              viewStream: { zh: '查看流', en: 'View stream' },
              streamName: { zh: '流名称', en: 'Stream Name' },
              streamType: { zh: '流类型', en: 'Stream Type' },
              isSchemaType: { zh: '是否为带结构的流', en: 'Whether the schema stream' },
              schemaTip: {
                zh: '自定义流字段结构，\n例如对应 SQL 语句中的：\n(\n        USERID BIGINT,\n        FIRST_NAME STRING,\n        LAST_NAME STRING,\n        NICKNAMES ARRAY(STRING),\n        Gender BOOLEAN,\n        ADDRESS STRUCT(\n            STREET_NAME STRING,\n            NUMBER BIGINT\n        ),\n    )',
                en: 'Custom stream fields, \nE.g the SQL statement:\n(\n        USERID BIGINT,\n        FIRST_NAME STRING,\n        LAST_NAME STRING,\n        NICKNAMES ARRAY(STRING),\n        Gender BOOLEAN,\n        ADDRESS STRUCT(\n            STREET_NAME STRING,\n            NUMBER BIGINT\n        ),\n    )',
              },
              sqlRequired: { zh: '请输入 SQL', en: 'SQL is required' },
              dataSource: { zh: '数据源', en: 'Data Source' },
              format: { zh: '流格式', en: 'Stream Format' },
              key: { zh: '主键', en: 'Key' },
              streamFields: { zh: '流字段', en: 'Stream Fields' },
              sourceConfig: { zh: '源配置', en: 'Source Config' },
              fieldType: { zh: '字段类型', en: 'Field Type' },
              typeFirst: { zh: '请先选择流类型', en: 'Please select Stream Type first' },
              addField: { zh: '添加流字段', en: 'Add stream field' },
              arrayType: { zh: '数组类型', en: 'Array Type' },
              streamNameSpace: { zh: '流名称不能包含空格', en: 'Stream Name can not contain space characters' },
              shared: { zh: '共享', en: 'Shared' },
              schema: { zh: '模式', en: 'Schema' },
              schemaMessage: { zh: '模式消息', en: 'Schema Message' },
              schemaName: { zh: '模式名称', en: 'Schema Name' },
              fileName: { zh: '文件名称', en: 'File Name' },
              endPoint: { zh: '端点', en: 'End Point' },
              topic: { zh: '主题', en: 'Topic' },
              deleteStreamWarning: {
                zh: '所有使用该流的规则将继续使用被删除的配置运行，直到重新启动，如果不正确，请手动停止它们。',
                en: 'All rules using this stream will continue to run with the deleted configuration until restart, if it is not correct, please stop them manually.',
              },
              delimited: { zh: '分隔符', en: 'Delimited' },
            })
        },
        4098: function (e, t, a) {
          'use strict'
          a.r(t),
            (t['default'] = {
              emptyContentByName: { zh: '请输入{name}', en: 'fill in {name}' },
              emptySelectByName: { zh: '请选择{name}', en: 'select a {name}' },
            })
        },
        1054: function (e, t, a) {
          var l = {
            './': 354,
            './common': 2031,
            './common.js': 2031,
            './configuration': 4600,
            './configuration.js': 4600,
            './index': 354,
            './index.js': 354,
            './node': 8451,
            './node.js': 8451,
            './rules': 4520,
            './rules.js': 4520,
            './streams': 600,
            './streams.js': 600,
            './validate': 4098,
            './validate.js': 4098,
          }
          function o(e) {
            var t = n(e)
            return a(t)
          }
          function n(e) {
            if (!a.o(l, e)) {
              var t = new Error("Cannot find module '" + e + "'")
              throw ((t.code = 'MODULE_NOT_FOUND'), t)
            }
            return l[e]
          }
          ;(o.keys = function () {
            return Object.keys(l)
          }),
            (o.resolve = n),
            (e.exports = o),
            (o.id = 1054)
        },
        2511: function (e, t, a) {
          'use strict'
          a.r(t),
            a.d(t, {
              bootstrap: function () {
                return Jl
              },
              mount: function () {
                return to
              },
              unmount: function () {
                return ao
              },
            })
          var l = a(4642)
          const o = window.__POWERED_BY_QIANKUN__,
            n = (e) => {
              const t = l.Z.state.currentNode.id
              return o ? `/kuiper/${t}${e}` : e
            },
            s = (e) => {
              const t = o ? `/flowEditor/${e}` : e
              return t
            }
          o && (a.p = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
          var r = a(2119),
            u = a(6252)
          function i(e, t) {
            const a = (0, u.up)('router-view')
            return (0, u.wg)(), (0, u.j4)(a)
          }
          var d = a(3744)
          const c = {},
            m = (0, d.Z)(c, [['render', i]])
          var p = m,
            f = a(9963),
            h = a(2262),
            v = a(3577),
            y = a(283),
            g = a.n(y),
            w = a(3907),
            b = a(7330),
            S = a(5244)
          const _ = (e) => {
              const t = new Map([
                ['source', ['', 'source', 'output', 'source']],
                ['function', ['function', 'operator', 'default', 'function']],
                ['operator', ['', 'operator', 'default', 'operator']],
                ['sink', ['', 'sink', 'input', 'sink']],
                ['chart', ['nop', 'sink', 'input', 'chart']],
              ])
              return t.get(e) ? t.get(e) : []
            },
            k = new Map([
              ['en', ['en', 'en_US']],
              ['zh', ['zh', 'zh_CN']],
            ])
          var z = a(6486)
          const U = 97,
            V =
              (String.fromCharCode(...new Array(26).fill(U).map((e, t) => e + t)),
              (e = 4) =>
                Math.random()
                  .toString()
                  .substring(2, e + 2)),
            C = (e, t) => {
              const a = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(e)),
                l = document.createElement('a')
              l.setAttribute('href', a),
                l.setAttribute('download', t + '.json'),
                document.body.appendChild(l),
                l.click(),
                l.remove()
            },
            D = async (e) => {
              const t = new FileReader()
              return (
                t.readAsText(e, 'UTF-8'),
                new Promise((e, a) => {
                  t.onload = function (t) {
                    const l = t?.target?.result
                    l ? e(l) : ('' === l || void 0 === l) && a()
                  }
                })
              )
            },
            W = () => Math.random().toString(16).substr(2, 8),
            T = (e) => {
              if (!e) return []
              const t = (0, z.cloneDeep)(e) || [],
                a = t.length ? t.map((e) => e?.value) : []
              return a
            }
          function j(e) {
            const t = Object.prototype.toString.call(e),
              a = new Map([
                ['[object String]', 'string'],
                ['[object Number]', 'number'],
                ['[object Boolean]', 'boolean'],
                ['[object Undefined]', 'undefined'],
                ['[object Object]', 'object'],
                ['[object Array]', 'array'],
                ['[object Null]', 'null'],
                ['[object RegExp]', 'RegExp'],
                ['[object Symbol]', 'symbol'],
                ['[object JSON]', 'json'],
                ['[object Math]', 'math'],
                ['default', 'object'],
              ])
            return a.get(t) || a.get('default')
          }
          var x = () => {
              const e = (0, w.oR)(),
                t = (0, u.Fl)(() => e.state.lang),
                a = (0, u.Fl)(() => (e) => {
                  if (!e) return ''
                  if ('object' !== j(e)) return e
                  const a = k.get(t.value)
                  if (!a) return e[t.value]
                  const l = e[a[0]] || e[a[1]] || ''
                  return l
                })
              return { lang: t, i18nLabel: a }
            },
            N = a(9669),
            $ = a.n(N),
            I = a(7139)
          const { VUE_APP_HOST_URL: F, NODE_ENV: A } = {
              VUE_APP_BUILD_ENV: 'sub-app',
              NODE_ENV: 'production',
              BASE_URL: '/web/common/flow/',
            },
            E = (e, t = 'category') => {
              const a = (0, I.cloneDeep)(e),
                l = 'id'
              let o = {}
              const n = []
              return (
                a.forEach((e) => {
                  const a = e[l],
                    s = e[t]
                  ;(o[a] = e), o[s] ? (o[s].children ? o[s].children.push(e) : (o[s].children = [e])) : n.push(e)
                }),
                n
              )
            },
            P = () => {
              if ('development' === A) return '/'
              let e = F
              if (!e) {
                const t = location.protocol,
                  a = location.hostname
                e = `${t}//${a}:9081`
              }
              return e
            },
            R = localStorage.getItem('language'),
            H = o ? '/api' : P(),
            O = {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Content-Language': 'zh' === R ? 'zh-CN' : 'en-US',
            }
          o || (O['Cache-Control'] = 'no-cache'), Object.assign($().defaults, { headers: O, baseURL: H, timeout: 1e5 })
          let q = 0
          const L = async (e) => {
            console.log('error', e)
            const t = e.config,
              { status: a, data: l, config: o } = e.response,
              n = 401 === a && !1
            if (n) return (t._retry = !0), $()(t)
            const { url: s } = o
            return (
              -1 === s.indexOf('/prebuild') &&
                q < 3 &&
                ((q += 1),
                (0, S.z8)({
                  showClose: !0,
                  dangerouslyUseHTMLString: !0,
                  type: 'error',
                  duration: 0,
                  onClose: () => {
                    q -= 1
                  },
                  message: `<span>${l}</span>`,
                })),
              Promise.reject(e)
            )
          }
          $().interceptors.request.use(
            (e) => {
              const t = l.Z.state.user.token
              return (e.headers.Authorization = t), (e.params = e.params || {}), e
            },
            (e) => Promise.reject(e),
          ),
            $().interceptors.response.use((e) => e, L)
          var M = $()
          const K = async (e, t = {}) => {
              localStorage.setItem('baseURL', e)
              const a = n('/rules')
              return M.post(a, t)
            },
            Y = async (e, t = {}) => {
              const a = n(`/rules/${e}`)
              return M.put(a, t)
            },
            B = async (e) => {
              const t = n(`/rules/${e}`)
              return M.get(t)
            },
            G = async (e) => {
              const t = n(`/rules/${e}/status`)
              return M.get(t)
            },
            Z = async () => {
              const e = n('/config/uploads')
              return M.get(e)
            },
            Q = async (e) => {
              const t = new FormData()
              t.append('uploadFile', e)
              const a = n('/config/uploads')
              return M.post(a, t)
            },
            J = (e) => M.get(n(`/schemas/${e}`))
          var X = a(8645)
          const ee = (e) => {
              const t = Object.keys(e).filter((t) => 'nop' === e[t].props.node.data.nodeType)
              return t || []
            },
            te = (e, t) => `${e}_${t}_0_output_data`,
            ae = (e, t) => {
              const { edges: a } = t
              return Object.keys(a).find((t) => {
                if (a[t].includes(e)) return t
              })
            },
            le = (e) => {
              const t = /^.+\sas\s(?<metricsKey>(.+))$/,
                a = e.match(t)
              return a ? a.groups.metricsKey.trim() : ''
            },
            oe = (e) => (e.every((e) => e % 1 === 0) ? 'line' : 'scatter'),
            ne = /^.+\[(?<index>\d+)\]$/,
            se = (e) => {
              const t = e.match(ne)
              return t?.groups?.index ? Number(t?.groups?.index) : 0
            },
            re = async (e, t) => {
              const { nodes: a, topo: l } = e,
                o = ee(a)
              if (!o || 0 === o.length) return !1
              const { data: n } = await G(t)
              return o.reduce((e, t) => {
                const o = a[t].props.node.data,
                  s = te(o.trueType, t)
                let r = {}
                try {
                  r = JSON.parse(n[s])[0]
                } catch (p) {}
                const u = ae(t, l),
                  i = le(a[u].props.expr)
                let d = [],
                  c = []
                const m = r[i]
                if (m && Array.isArray(m) && m.length > 0) {
                  const { visualization: e } = a[t].props,
                    { x: l, y: o } = e,
                    n = void 0 === l ? void 0 : se(l),
                    s = void 0 === o ? void 0 : se(o)
                  if (Array.isArray(m[0]) && Array.isArray(m[1])) {
                    const e = new Array(m[0].length).fill(0).map((e, t) => e + t)
                    ;(d = void 0 === n ? e : m[n]), (c = void 0 === s ? e : m[s])
                  } else if ('object' !== typeof m[0]) {
                    const e = new Array(m.length).fill(0).map((e, t) => e + t)
                    ;(d = void 0 === n ? e : m), (c = 0 === s ? m : e)
                  }
                }
                return { ...e, [t]: { xData: d, yData: c } }
              }, {})
            },
            ue = { class: 'node-name' },
            ie = { key: 0, class: 'node-bd' },
            de = { class: 'node-hooks is-input' },
            ce = { class: 'node-hooks is-output' }
          var me = {
            name: 'BasicNode',
            setup(e) {
              const t = (0, h.iH)(''),
                a = (0, h.iH)(null),
                l = (0, u.FN)().appContext.app._context.config.globalProperties.$df,
                o = (0, w.oR)(),
                { t: n } = (0, b.QT)(),
                { i18nLabel: s } = x(),
                r = (0, h.iH)([]),
                i = (0, h.iH)([]),
                d = (0, h.iH)(''),
                c = (0, u.Fl)(() => o.state.chartData),
                m = (0, h.iH)(null),
                p = (0, h.iH)(!1),
                f = (0, h.iH)(!1),
                y = (0, h.iH)({}),
                g = (0, h.iH)({}),
                S = (0, u.Fl)(() => r.value.length > 0 || i.value.length > 0),
                _ = (e, t) => ({
                  title: {},
                  tooltip: { trigger: 'axis' },
                  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: !0 },
                  toolbox: { feature: { saveAsImage: {} } },
                  xAxis: { type: 'category', boundaryGap: !1, data: e },
                  yAxis: { type: 'value' },
                  series: [{ name: n('node.data'), type: 'line', stack: 'Total', data: t }],
                }),
                k = (e, t) => {
                  g.value?.setOption({
                    xAxis: { data: e },
                    series: [{ name: n('node.data'), type: 'line', stack: 'Total', data: t }],
                  })
                },
                z = (e, t) => e.reduce((e, a, l) => [...e, [a, t[l]]], []),
                U = (e, t) => {
                  const a = z(e, t)
                  return {
                    xAxis: { type: 'value' },
                    yAxis: { type: 'value' },
                    tooltip: {},
                    series: [{ encode: { tooltip: [0, 1] }, symbolSize: 8, data: a, type: 'scatter' }],
                  }
                },
                V = (e, t) => {
                  const a = z(e, t)
                  g.value?.setOption({
                    series: [{ encode: { tooltip: [0, 1] }, symbolSize: 8, data: a, type: 'scatter' }],
                  })
                },
                C = () => {
                  if ((g.value?.length || (g.value = (0, h.Xl)(X.S1(m.value))), Object.keys(c.value).length)) {
                    const { xData: e, yData: t } = c.value[d.value],
                      a = oe(e, t),
                      l = 'line' === a ? _ : U
                    ;(y.value = l(e, t)), g.value?.setOption(y.value)
                  }
                },
                D = () => {
                  const { xData: e, yData: t } = c.value[d.value],
                    a = oe(e, t)
                  'line' === a ? k(e, t) : V(e, t)
                },
                W = () => {
                  g.value.dispose(), (g.value = null)
                }
              ;(0, u.YP)(
                () => c.value,
                (e) => {
                  p.value && f.value && D()
                },
              )
              const T = (0, u.Fl)(() => {
                  const { id: e } = a.value.parentElement.parentElement
                  return e.slice(5)
                }),
                j = (e) => {
                  ;(t.value = s.value(e?.label || {})),
                    (d.value = e.id),
                    (r.value = e.inputs || []),
                    (i.value = e.outputs || []),
                    (p.value = 'chart' === e.group)
                }
              return (
                (0, u.bv)(async () => {
                  await (0, u.Y3)()
                  const e = l.value.getNodeFromId(T.value)
                  j(e.data)
                }),
                (e, l) => {
                  const o = (0, u.up)('el-button'),
                    n = (0, u.up)('el-dialog')
                  return (
                    (0, u.wg)(),
                    (0, u.iD)(
                      u.HY,
                      null,
                      [
                        (0, u._)(
                          'div',
                          { ref_key: 'el', ref: a, class: 'basic-node' },
                          [
                            (0, u._)(
                              'div',
                              { class: (0, v.C_)(['node-hd', { 'is-absolute': (0, h.SU)(S) }]) },
                              [
                                (0, u._)('p', ue, (0, v.zw)(t.value), 1),
                                p.value
                                  ? ((0, u.wg)(),
                                    (0, u.j4)(
                                      o,
                                      {
                                        key: 0,
                                        class: 'show-chart',
                                        type: 'primary',
                                        link: '',
                                        onClick: l[0] || (l[0] = (e) => (f.value = !0)),
                                      },
                                      {
                                        default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.$t('node.viewChart')), 1)]),
                                        _: 1,
                                      },
                                    ))
                                  : (0, u.kq)('', !0),
                              ],
                              2,
                            ),
                            (0, h.SU)(S)
                              ? ((0, u.wg)(),
                                (0, u.iD)('div', ie, [
                                  (0, u._)('ul', de, [
                                    ((0, u.wg)(!0),
                                    (0, u.iD)(
                                      u.HY,
                                      null,
                                      (0, u.Ko)(
                                        r.value,
                                        ({ label: e, value: t }) => (
                                          (0, u.wg)(), (0, u.iD)('li', { key: t }, (0, v.zw)((0, h.SU)(s)(e)), 1)
                                        ),
                                      ),
                                      128,
                                    )),
                                  ]),
                                  (0, u._)('ul', ce, [
                                    ((0, u.wg)(!0),
                                    (0, u.iD)(
                                      u.HY,
                                      null,
                                      (0, u.Ko)(
                                        i.value,
                                        ({ label: e, value: t }) => (
                                          (0, u.wg)(), (0, u.iD)('li', { key: t }, (0, v.zw)((0, h.SU)(s)(e)), 1)
                                        ),
                                      ),
                                      128,
                                    )),
                                  ]),
                                ]))
                              : (0, u.kq)('', !0),
                          ],
                          512,
                        ),
                        (0, u.Wm)(
                          n,
                          {
                            modelValue: f.value,
                            'onUpdate:modelValue': l[1] || (l[1] = (e) => (f.value = e)),
                            title: e.$t('node.chart'),
                            width: '60%',
                            draggable: '',
                            onOpened: C,
                            'append-to-body': '',
                            onClosed: W,
                          },
                          {
                            default: (0, u.w5)(() => [
                              (0, u._)(
                                'div',
                                { ref_key: 'lineChartDom', ref: m, style: { width: '100%', height: '400px' } },
                                null,
                                512,
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['modelValue', 'title'],
                        ),
                      ],
                      64,
                    )
                  )
                }
              )
            },
          }
          const pe = me
          var fe = pe
          const he = ['prop'],
            ve = { class: 'label-content' },
            ye = (0, u.aZ)({ name: 'FileItem' })
          var ge = Object.assign(ye, {
            props: { property: { type: Object }, modelValue: { type: String } },
            emits: ['update:modelValue'],
            setup(e, { emit: t }) {
              const a = e,
                { t: l } = (0, b.QT)(),
                o = (0, u.Fl)({
                  get() {
                    return a.modelValue
                  },
                  set(e) {
                    t('update:modelValue', e)
                  },
                }),
                n = (0, h.iH)([]),
                s = async () => {
                  const { data: e } = await Z()
                  n.value = e
                },
                r = async (e) => {
                  try {
                    const { data: t } = await Q(e)
                    S.z8.success(l('common.uploadSuccess')), await s(), (o.value = t)
                  } catch (t) {}
                  return Promise.reject()
                }
              return (
                s(),
                (t, a) => {
                  const l = (0, u.up)('el-button'),
                    s = (0, u.up)('el-upload'),
                    i = (0, u.up)('el-option'),
                    d = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.iD)(
                      'div',
                      { class: 'file-item', prop: e.property.name, 'show-message': !1 },
                      [
                        (0, u._)('div', ve, [
                          (0, u.Wm)(
                            s,
                            { 'before-upload': r, 'show-file-list': !1 },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(
                                  l,
                                  { size: 'small', type: 'primary' },
                                  {
                                    default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(t.$t('common.uploadFile')), 1)]),
                                    _: 1,
                                  },
                                ),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        (0, u.Wm)(
                          d,
                          {
                            modelValue: (0, h.SU)(o),
                            'onUpdate:modelValue': a[0] || (a[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                            'allow-create': '',
                            filterable: '',
                            'popper-class': 'select-popper',
                          },
                          {
                            default: (0, u.w5)(() => [
                              ((0, u.wg)(!0),
                              (0, u.iD)(
                                u.HY,
                                null,
                                (0, u.Ko)(
                                  n.value,
                                  (e) => (
                                    (0, u.wg)(),
                                    (0, u.j4)(i, { key: e, value: e, label: e }, null, 8, ['value', 'label'])
                                  ),
                                ),
                                128,
                              )),
                            ]),
                            _: 1,
                          },
                          8,
                          ['modelValue'],
                        ),
                      ],
                      8,
                      he,
                    )
                  )
                }
              )
            },
          })
          const we = ge
          var be = we,
            Se = a(5781)
          const _e = { class: 'key-value-editor' }
          var ke = {
            name: 'KeyValueEditor',
            props: {
              modelValue: { type: [Object, Array], default: () => ({}) },
              templateData: { type: [Object, Array], default: null },
              disabled: { type: Boolean, default: !1 },
              modalVisible: { type: Boolean, default: !1 },
              properties: { type: Array, default: null },
            },
            emits: ['update:modelValue'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                o = (0, h.iH)({ tableData: [] }),
                n = (0, h.iH)(null),
                s = (0, u.Fl)(() => ({ name: [{ required: !0, trigger: 'blur' }] })),
                r = (0, u.Fl)(() => (e) => {
                  if (!e) return 'string'
                  const t = new Map([
                    ['int', 'number'],
                    ['string', 'string'],
                    ['bool', 'boolean'],
                    ['default', 'string'],
                  ])
                  return t.get(e) || t.get('default')
                }),
                i = (e) => {
                  const t = e || l.modelValue
                  if (!l.templateData || t) {
                    if (t) {
                      const e = [],
                        a = t
                      'array' === j(a)
                        ? a.forEach((t, a) => {
                            const { type: l, name: o } = t
                            if ('object' === j(t)) {
                              const a = { name: o || '', default: t.default || '', type: l || 'string' }
                              e.push(a)
                            } else e.push({ name: a, default: t || '', type: l })
                          })
                        : 'object' === j(a) &&
                          Object.entries(a).forEach(([t, a]) => {
                            const o = l.properties ? l.properties.find((e) => e.name === t) : null,
                              n = o ? o.type : 'string'
                            e.push({ name: t, default: a || '', type: n })
                          }),
                        (o.value.tableData = e)
                    }
                  } else {
                    const e = l.templateData || {}
                    o.value.tableData = Object.keys(e).map((t) => ({
                      name: t,
                      default: e[t] || '',
                      type: t.type || 'string',
                    }))
                  }
                },
                d = () => {
                  const e = Array.isArray(l.modelValue),
                    t = e ? o.value.tableData : {}
                  e ||
                    o.value.tableData.forEach((e) => {
                      const { name: a } = e
                      t[a] = e.default
                    }),
                    a('update:modelValue', t)
                },
                c = (e) => {
                  o.value.tableData.splice(e, 1), d()
                },
                m = () => {
                  o.value.tableData.push({ name: '', default: '', type: 'string' })
                },
                p = async () => {
                  try {
                    const e = await n.value.validate()
                    return Promise.resolve(e)
                  } catch (e) {
                    return Promise.reject(e)
                  }
                }
              return (
                (0, u.YP)(
                  () => l.modalVisible,
                  (e) => {
                    e && i()
                  },
                ),
                (0, u.YP)(
                  () => l.modelValue,
                  (e) => {
                    i(e)
                  },
                  { immediate: !0, deep: !0 },
                ),
                i(),
                d(),
                t({ validateKeyValueEditor: p }),
                (t, a) => {
                  const l = (0, u.up)('el-input'),
                    i = (0, u.up)('el-form-item'),
                    p = (0, u.up)('el-table-column'),
                    f = (0, u.up)('el-switch'),
                    y = (0, u.up)('el-icon'),
                    g = (0, u.up)('el-table'),
                    w = (0, u.up)('el-form'),
                    b = (0, u.up)('el-button')
                  return (
                    (0, u.wg)(),
                    (0, u.iD)('div', _e, [
                      (0, u.Wm)(
                        w,
                        { ref_key: 'tableFormRef', ref: n, model: o.value, rules: (0, h.SU)(s) },
                        {
                          default: (0, u.w5)(() => [
                            (0, u.Wm)(
                              g,
                              { data: o.value.tableData },
                              {
                                default: (0, u.w5)(() => [
                                  (0, u.Wm)(
                                    p,
                                    { label: t.$t('common.key'), prop: 'key' },
                                    {
                                      default: (0, u.w5)(({ row: t, $index: a }) => [
                                        (0, u.Wm)(
                                          i,
                                          { prop: 'tableData.' + a + '.name', rules: (0, h.SU)(s).name },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                l,
                                                {
                                                  modelValue: o.value.tableData[a].name,
                                                  'onUpdate:modelValue': (e) => (o.value.tableData[a].name = e),
                                                  disabled: e.disabled,
                                                  placeholder: o.value.tableData[a].name.toString(),
                                                  onBlur: (e) => d(t),
                                                },
                                                null,
                                                8,
                                                [
                                                  'modelValue',
                                                  'onUpdate:modelValue',
                                                  'disabled',
                                                  'placeholder',
                                                  'onBlur',
                                                ],
                                              ),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ['prop', 'rules'],
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['label'],
                                  ),
                                  (0, u.Wm)(
                                    p,
                                    { label: t.$t('common.value'), prop: 'value' },
                                    {
                                      default: (0, u.w5)(({ row: t, $index: a }) => [
                                        (0, u.Wm)(
                                          i,
                                          {
                                            prop: 'tableData.' + a + '.default',
                                            rules: [{ required: !0, trigger: 'blur', type: (0, h.SU)(r)(t.type) }],
                                          },
                                          {
                                            default: (0, u.w5)(() => [
                                              'int' === t.type
                                                ? ((0, u.wg)(),
                                                  (0, u.j4)(
                                                    l,
                                                    {
                                                      key: 0,
                                                      modelValue: o.value.tableData[a].default,
                                                      'onUpdate:modelValue': (e) => (o.value.tableData[a].default = e),
                                                      modelModifiers: { number: !0 },
                                                      placeholder: o.value.tableData[a].default.toString(),
                                                      type: 'number',
                                                      disabled: e.disabled,
                                                      onBlur: (e) => d(t),
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      'modelValue',
                                                      'onUpdate:modelValue',
                                                      'placeholder',
                                                      'disabled',
                                                      'onBlur',
                                                    ],
                                                  ))
                                                : 'bool' === t.type
                                                ? ((0, u.wg)(),
                                                  (0, u.j4)(
                                                    f,
                                                    {
                                                      key: 1,
                                                      modelValue: o.value.tableData[a].default,
                                                      'onUpdate:modelValue': (e) => (o.value.tableData[a].default = e),
                                                      size: 'small',
                                                    },
                                                    null,
                                                    8,
                                                    ['modelValue', 'onUpdate:modelValue'],
                                                  ))
                                                : ((0, u.wg)(),
                                                  (0, u.j4)(
                                                    l,
                                                    {
                                                      key: 2,
                                                      modelValue: o.value.tableData[a].default,
                                                      'onUpdate:modelValue': (e) => (o.value.tableData[a].default = e),
                                                      placeholder: o.value.tableData[a].default.toString(),
                                                      disabled: e.disabled,
                                                      onBlur: (e) => d(t),
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      'modelValue',
                                                      'onUpdate:modelValue',
                                                      'placeholder',
                                                      'disabled',
                                                      'onBlur',
                                                    ],
                                                  )),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ['prop', 'rules'],
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['label'],
                                  ),
                                  (0, u.Wm)(
                                    p,
                                    {
                                      label: t.$t('common.operations'),
                                      'min-width': '60',
                                      'max-width': '80',
                                      fixed: 'right',
                                    },
                                    {
                                      default: (0, u.w5)(({ row: e, $index: t }) => [
                                        (0, u.Wm)(
                                          y,
                                          { onClick: (a) => c(t, e) },
                                          { default: (0, u.w5)(() => [(0, u.Wm)((0, h.SU)(Se.RemoveFilled))]), _: 2 },
                                          1032,
                                          ['onClick'],
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['label'],
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ['data'],
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['model', 'rules'],
                      ),
                      e.disabled
                        ? (0, u.kq)('', !0)
                        : ((0, u.wg)(),
                          (0, u.j4)(
                            b,
                            { key: 0, link: '', class: 'add-kv--btn', icon: 'md-add', onClick: m },
                            { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(t.$t('common.add')), 1)]), _: 1 },
                          )),
                    ])
                  )
                }
              )
            },
          }
          const ze = (0, d.Z)(ke, [['__scopeId', 'data-v-24f2abd6']])
          var Ue = ze
          function Ve(e, t) {
            const a = (0, h.iH)(''),
              l = (0, h.iH)(!1),
              o = (0, h.iH)([]),
              n = (0, h.iH)(null)
            ;(0, u.YP)(
              () => e.modelValue,
              (e) => {
                a.value = e
              },
              { immediate: !0 },
            ),
              (0, u.YP)(
                () => a.value,
                (e, a) => {
                  t('update:modelValue', e)
                },
              )
            const s = () =>
                new Promise((e, t) => {
                  e(['test1', 'test2'])
                }),
              r = async (e) => {
                try {
                  ;(l.value = !0), (o.value = e ? await e() : await s())
                } catch (t) {
                  ;(a.value = ''), (o.value = [])
                } finally {
                  l.value = !1
                }
              },
              i = (l) => {
                void 0 === l && (a.value = e.modelValue),
                  (0, u.Y3)(async () => {
                    a.value = l
                    let e = l
                    l && (e = o.value.find((e) => e?.name === l || e === l)), t('onChange', e)
                  })
              }
            return { props: e, myValue: a, loading: l, selectorRef: n, list: o, init: r, getList: s, onChange: i }
          }
          const Ce = { class: 'title' }
          var De = {
            name: 'FormatSelector',
            props: { modelValue: { type: String, default: () => '' }, formats: { type: Array, default: () => null } },
            emits: ['update:modelValue', 'onChange'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { myValue: o, list: n, init: s, loading: r, onChange: i, selectorRef: d } = Ve(l, a),
                c = () =>
                  new Promise((e) => {
                    const t = l.formats || ['json', 'binary', 'protobuf', 'delimited', 'custom']
                    e(t)
                  })
              return (
                s(c),
                t({ selectorRef: d, init: s, getList: c }),
                (e, t) => {
                  const a = (0, u.up)('el-option'),
                    l = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      l,
                      (0, u.dG)(
                        {
                          ref_key: 'selectorRef',
                          ref: d,
                          modelValue: (0, h.SU)(o),
                          'onUpdate:modelValue': t[0] || (t[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                          'popper-class': 'select-popper',
                          clearable: '',
                        },
                        e.$attrs,
                        { onChange: (0, h.SU)(i) },
                      ),
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              (0, h.SU)(n),
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  a,
                                  { key: e, value: e, label: e },
                                  { default: (0, u.w5)(() => [(0, u._)('span', Ce, (0, v.zw)(e), 1)]), _: 2 },
                                  1032,
                                  ['value', 'label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      16,
                      ['modelValue', 'onChange'],
                    )
                  )
                }
              )
            },
          }
          const We = De
          var Te = We
          const je = (e = 'sources', t, a = {}) => {
              let l = n(`/metadata/${e}`)
              return t && (l = `${l}/${t}`), M.get(l, { params: a })
            },
            xe = (e = 'sources', t, a = {}) => {
              let l = n(`/metadata/${e}/yaml`)
              return t && (l = `${l}/${t}`), M.get(l, { params: a })
            },
            Ne = (e = 'sources', t, a = {}) => {
              const l = n(`/metadata/${e}/connection/${t}`)
              return M.post(l, a)
            },
            $e = (e = 'sources', t, a, l = {}, o) => {
              let s = n(`/metadata/${e}/${t}/confKeys`)
              return a && (s = `${s}/${a}`), o && (s = `${s}/${o}`), M.put(s, l)
            },
            Ie = { class: 'title' }
          var Fe = {
            name: 'ConfKeysSelector',
            props: {
              modelValue: { type: String, default: () => '' },
              category: { type: String, default: '' },
              nodeName: { type: String, default: '' },
            },
            emits: ['update:modelValue', 'onChange'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { myValue: o, list: n, init: s, loading: r, onChange: i, selectorRef: d } = Ve(l, a)
              ;(0, u.YP)(
                () => l.nodeName,
                (e) => {
                  ;(0, u.Y3)(() => {
                    e ? s(c) : ((o.value = ''), (n.value = []))
                  })
                },
                { immediate: !0 },
              )
              const c = () =>
                new Promise((e, t) => {
                  l.nodeName && l.category
                    ? xe(l.category, l.nodeName)
                        .then((t) => {
                          const { data: a } = t,
                            l = Object.keys(a)
                          e(l)
                        })
                        .catch((e) => {
                          t(e)
                        })
                    : e([])
                })
              return (
                t({ selectorRef: d, init: s, getList: c }),
                (e, t) => {
                  const a = (0, u.up)('el-option'),
                    l = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      l,
                      (0, u.dG)(
                        {
                          ref_key: 'selectorRef',
                          ref: d,
                          modelValue: (0, h.SU)(o),
                          'onUpdate:modelValue': t[0] || (t[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                          'popper-class': 'select-popper',
                          clearable: '',
                        },
                        e.$attrs,
                        { onChange: (0, h.SU)(i) },
                      ),
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              (0, h.SU)(n),
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  a,
                                  { key: e, value: e, label: e },
                                  { default: (0, u.w5)(() => [(0, u._)('span', Ie, (0, v.zw)(e), 1)]), _: 2 },
                                  1032,
                                  ['value', 'label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      16,
                      ['modelValue', 'onChange'],
                    )
                  )
                }
              )
            },
          }
          const Ae = Fe
          var Ee = Ae,
            Pe = () => {
              const e = () =>
                new Promise((e, t) => {
                  Promise.allSettled([J('protobuf'), J('custom')])
                    .then((t) => {
                      const { data: a } = t[0].value,
                        { data: l } = t[1].value,
                        o = a.map((e) => ({ name: e, type: 'protobuf' })),
                        n = l.map((e) => ({ name: e, type: 'custom' })),
                        s = [...o, ...n]
                      e(s)
                    })
                    .catch((e) => {
                      t(e)
                    })
                })
              return { getSchemaList: e }
            }
          const Re = { class: 'title' }
          var He = {
            name: 'SchemasSelector',
            props: { modelValue: { type: String, default: () => '' }, type: { type: String, default: '' } },
            emits: ['update:modelValue', 'onChange'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { myValue: o, list: n, init: s, loading: r, onChange: i, selectorRef: d } = Ve(l, a),
                { getSchemaList: c } = Pe()
              ;(0, u.YP)(
                () => l.type,
                (e) => {
                  ;(0, u.Y3)(() => {
                    e && s(m)
                  })
                },
                { immediate: !0 },
              )
              const m = () =>
                l.type
                  ? new Promise((e, t) => {
                      J(l.type)
                        .then((t) => {
                          const a = t.data || []
                          e(a)
                        })
                        .catch((e) => {
                          t(e)
                        })
                    })
                  : c
              return (
                t({ selectorRef: d, init: s, getList: m }),
                (e, t) => {
                  const a = (0, u.up)('el-option'),
                    l = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      l,
                      (0, u.dG)(
                        {
                          ref_key: 'selectorRef',
                          ref: d,
                          modelValue: (0, h.SU)(o),
                          'onUpdate:modelValue': t[0] || (t[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                          'popper-class': 'select-popper',
                          clearable: '',
                        },
                        e.$attrs,
                        { onChange: (0, h.SU)(i) },
                      ),
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              (0, h.SU)(n),
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  a,
                                  { key: e.name || e, value: e.name || e, label: e.name || e },
                                  { default: (0, u.w5)(() => [(0, u._)('span', Re, (0, v.zw)(e.name || e), 1)]), _: 2 },
                                  1032,
                                  ['value', 'label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      16,
                      ['modelValue', 'onChange'],
                    )
                  )
                }
              )
            },
          }
          const Oe = He
          var qe = Oe
          function Le(e) {
            if ('object' !== typeof e) return e
            const t = (0, z.cloneDeep)(e),
              a = Object.keys(t)
            return (
              a.forEach((e) => {
                const a = t[e]
                void 0 === a || null === a || '' === a
                  ? delete t[e]
                  : 'object' === typeof a && (Object.keys(a).length ? Le(a) : delete t[e])
              }),
              t
            )
          }
          function Me(e, t, a) {
            if (void 0 === a || null === a) {
              const a = new Map([
                  ['text_string', ''],
                  ['text_int', null],
                  ['text_default', ''],
                  ['textarea_string', ''],
                  ['textarea_default', ''],
                  ['radio_bool', null],
                  ['radio_default', null],
                  ['select_string', ''],
                  ['select_list_string', ''],
                  ['select_default', ''],
                  ['list_string', ''],
                  ['list_list_object', {}],
                  ['list_object', {}],
                  ['list_default', ''],
                ]),
                l = a.get(`${e}_${t}`) || a.get(`${e}_default`)
              return l
            }
            let l = a
            return Array.isArray(a) && (l = a[0]), l
          }
          function Ke(e) {
            if (!Array.isArray(e)) return {}
            const t = (0, z.cloneDeep)(e)
            if (!t.length) return {}
            const a = {}
            return (
              t.forEach((e) => {
                const { name: t, default: l, control: o, type: n } = e
                a[t] = l || Me(o, n, l)
              }),
              a
            )
          }
          var Ye = {
            name: 'KeyValueTextare',
            props: {
              modelValue: { type: [Object, String], default: () => {} },
              placeholder: { type: String, default: 'Enter headers' },
            },
            emits: ['update:modelValue'],
            setup(e, { emit: t }) {
              const a = e,
                l = (0, h.iH)(''),
                o = (0, u.Fl)(() => 'string' === typeof a.modelValue)
              ;(0, u.YP)(
                () => a.modelValue,
                (e) => {
                  if (e)
                    if (o.value) l.value = e
                    else {
                      const t = Object.entries(e)
                      let a = ''
                      for (let e = 0; e < t.length; e += 1) {
                        const l = t[e],
                          o = l[0],
                          n = l[1] || '',
                          s = `${o}:${n}`
                        a += `${s}\n`
                      }
                      l.value = a.slice(0, a.length - 1)
                    }
                  else l.value = ''
                },
              )
              const n = () => {
                if (l.value)
                  if (o.value) t('update:modelValue', l.value)
                  else {
                    const e = l.value,
                      a = {},
                      o = e.split('\n')
                    for (let t = 0; t < o.length; t += 1) {
                      const e = o[t],
                        l = e.indexOf(':')
                      if (e) {
                        let t = '',
                          o = ''
                        l > -1 && e.slice(0, l) ? ((t = e.slice(0, l).trim()), (o = e.slice(l + 1).trim())) : (t = e),
                          (a[t] = o)
                      }
                    }
                    t('update:modelValue', a)
                  }
                else {
                  const e = o.value ? '' : {}
                  t('update:modelValue', e)
                }
              }
              return (t, a) => {
                const o = (0, u.up)('el-input')
                return (
                  (0, u.wg)(),
                  (0, u.j4)(
                    o,
                    {
                      modelValue: l.value,
                      'onUpdate:modelValue': a[0] || (a[0] = (e) => (l.value = e)),
                      type: 'textarea',
                      autosize: { minRows: 3, maxRows: 6 },
                      class: 'json-input',
                      placeholder: e.placeholder,
                      onOnBlur: n,
                    },
                    null,
                    8,
                    ['modelValue', 'placeholder'],
                  )
                )
              }
            },
          }
          const Be = Ye
          var Ge = Be
          const Ze = { class: 'table-list-editor' }
          var Qe = {
            name: 'TableListEdtior',
            props: {
              modelValue: { type: Array, default: () => [] },
              columns: { type: Array, default: () => () => [{ prop: 'value', lable: '值', control: 'input' }] },
              type: { type: String, default: 'string' },
              defaultItem: { type: Object, default: { value: '' } },
              rules: { type: Object, default: () => {} },
            },
            emits: ['update:modelValue'],
            setup(e, { emit: t }) {
              const a = e,
                l = (0, h.iH)(!0),
                o = (0, h.iH)([])
              ;(0, u.YP)(
                () => a.modelValue,
                (e) => {
                  let t = e || []
                  if ('string' === a.type) {
                    const e = t.every((e) => 'string' === typeof e)
                    t.length && e ? (o.value = t.map((e) => ({ value: e }))) : (o.value = t)
                  }
                },
                { immediate: !0, deep: !0 },
              ),
                (0, u.YP)(
                  () => o.value,
                  (e) => {
                    t('update:modelValue', e)
                  },
                  { immediate: !0, deep: !0 },
                )
              const n = () => {
                  const e = (0, z.cloneDeep)(a.defaultItem)
                  o.value.push(e)
                },
                s = (e) => {
                  o.value.splice(e, 1)
                }
              return (t, a) => {
                const r = (0, u.up)('el-input'),
                  i = (0, u.up)('el-icon'),
                  d = (0, u.up)('el-table-column'),
                  c = (0, u.up)('el-table'),
                  m = (0, u.up)('el-button')
                return (
                  (0, u.wg)(),
                  (0, u.iD)('section', Ze, [
                    (0, u.Wm)(
                      c,
                      { data: o.value, style: { width: '100%' } },
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              e.columns,
                              (e) => (
                                (0, u.wg)(),
                                (0, u.iD)(
                                  u.HY,
                                  { key: e.prop },
                                  [
                                    e.slot
                                      ? (0, u.WI)(t.$slots, e.slot, { key: 0 })
                                      : ((0, u.wg)(),
                                        (0, u.j4)(
                                          d,
                                          { key: 1, label: e.label, width: e?.width, 'show-overflow-tooltip': l.value },
                                          {
                                            default: (0, u.w5)(({ $index: t }) => [
                                              'input' === e.control
                                                ? ((0, u.wg)(),
                                                  (0, u.j4)(
                                                    r,
                                                    {
                                                      key: 0,
                                                      modelValue: o.value[t][e.prop],
                                                      'onUpdate:modelValue': (a) => (o.value[t][e.prop] = a),
                                                    },
                                                    null,
                                                    8,
                                                    ['modelValue', 'onUpdate:modelValue'],
                                                  ))
                                                : 'actions' === e.prop
                                                ? ((0, u.wg)(),
                                                  (0, u.j4)(
                                                    i,
                                                    { key: 1, onClick: (e) => s(t) },
                                                    {
                                                      default: (0, u.w5)(() => [(0, u.Wm)((0, h.SU)(Se.RemoveFilled))]),
                                                      _: 2,
                                                    },
                                                    1032,
                                                    ['onClick'],
                                                  ))
                                                : (0, u.kq)('', !0),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ['label', 'width', 'show-overflow-tooltip'],
                                        )),
                                  ],
                                  64,
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 3,
                      },
                      8,
                      ['data'],
                    ),
                    (0, u.Wm)(
                      m,
                      { type: 'success', link: '', icon: (0, h.SU)(Se.Plus), class: 'btn-add', onClick: n },
                      null,
                      8,
                      ['icon'],
                    ),
                  ])
                )
              }
            },
          }
          const Je = (0, d.Z)(Qe, [['__scopeId', 'data-v-4ead2f11']])
          var Xe = Je
          const et = { key: 3, class: 'radio-control' },
            tt = { class: 'radio-item' },
            at = ['id', 'onUpdate:modelValue'],
            lt = ['for'],
            ot = { class: 'radio-item' },
            nt = ['id', 'onUpdate:modelValue'],
            st = ['for'],
            rt = { class: 'list-objet-mode' },
            ut = { class: 'text' }
          var it = {
            name: 'PropertiesForm',
            props: {
              modelValue: { type: Object, default: () => {} },
              properties: { type: Array, default: () => null },
              formColSpan: { type: Number, default: 24 },
              nodeId: { type: Number, default: null },
              nodeName: { type: String, default: '' },
              isEdit: { type: Boolean, default: !1 },
              modalVisible: { type: Boolean, default: !1 },
            },
            emits: ['update:modelValue', 'update:properties'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { t: o } = (0, b.QT)(),
                { i18nLabel: n } = x(),
                s = (0, h.iH)(null),
                r = (0, h.iH)([]),
                i = (0, h.iH)({ mode: !0, placeholder: '{"key":"{{value}}"}' }),
                d = (0, h.iH)(null),
                c = (0, h.iH)([
                  { prop: 'value', label: o('common.value'), control: 'input' },
                  { prop: 'actions', label: o('common.operations'), width: '60', minWdith: '60' },
                ]),
                m = (0, u.Fl)({
                  get: () => l.modelValue,
                  set: (e) => {
                    a('update:modelValue', e)
                  },
                }),
                p = (0, u.Fl)(() => (e) => {
                  const t = 'string' === typeof m.value[e]
                  return (i.value.mode = !t), t
                }),
                y = (0, u.Fl)(() => (i.value.mode ? 'rules.visualizationMode' : 'rules.textMode'))
              ;(0, u.YP)(
                () => l.properties,
                (e) => {
                  e && (r.value = e)
                },
                { immediate: !0, deep: !0 },
              )
              const g = (e) => (e.placeholder ? e.placeholder.toString() : ''),
                w = (e, t) => {
                  r.value.forEach((a) => {
                    a.name === t && a.values.push(e)
                  })
                },
                S = (e) => {
                  m.value[e] = i.value.mode ? {} : ''
                },
                _ = async () => {
                  try {
                    const e = [s.value.validate()],
                      t = d.value || []
                    t.length &&
                      t.forEach((t) => {
                        const a = t.validateKeyValueEditor
                        e.push(a())
                      })
                    const a = await Promise.allSettled(e),
                      l = a.every((e) => e?.value)
                    return l ? Promise.resolve(l) : Promise.reject(o('common.emptyForm'))
                  } catch (e) {
                    return Promise.reject(e)
                  }
                }
              return (
                t({ validatePropertiesForm: _ }),
                (t, a) => {
                  const l = (0, u.up)('QuestionFilled'),
                    o = (0, u.up)('el-icon'),
                    b = (0, u.up)('el-tooltip'),
                    _ = (0, u.up)('el-input'),
                    k = (0, u.up)('el-option'),
                    z = (0, u.up)('el-select'),
                    U = (0, u.up)('el-switch'),
                    V = (0, u.up)('el-form-item'),
                    C = (0, u.up)('el-col'),
                    D = (0, u.up)('el-row'),
                    W = (0, u.up)('el-form')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      W,
                      { ref_key: 'propertiesFormRef', ref: s, model: (0, h.SU)(m), 'label-position': 'top' },
                      {
                        default: (0, u.w5)(() => [
                          (0, u.Wm)(
                            D,
                            { gutter: 20 },
                            {
                              default: (0, u.w5)(() => [
                                ((0, u.wg)(!0),
                                (0, u.iD)(
                                  u.HY,
                                  null,
                                  (0, u.Ko)(
                                    r.value,
                                    (s, r) => (
                                      (0, u.wg)(),
                                      (0, u.j4)(
                                        C,
                                        {
                                          key: s.name,
                                          span: ['list', 'textarea'].includes(s.control) ? 24 : e.formColSpan,
                                        },
                                        {
                                          default: (0, u.w5)(() => [
                                            (0, u.Wm)(
                                              V,
                                              {
                                                prop: s.name,
                                                rules: [
                                                  {
                                                    required: !s.optional,
                                                    message: t.$t('common.itemRequired', {
                                                      name: (0, h.SU)(n)(s.label),
                                                    }),
                                                  },
                                                ],
                                              },
                                              {
                                                label: (0, u.w5)(() => [
                                                  (0, u.Uk)((0, v.zw)((0, h.SU)(n)(s.label)) + ' ', 1),
                                                  (0, h.SU)(n)(s.hint)
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        b,
                                                        {
                                                          key: 0,
                                                          'max-width': '250px',
                                                          placement: 'top',
                                                          content: (0, h.SU)(n)(s.hint),
                                                        },
                                                        {
                                                          default: (0, u.w5)(() => [
                                                            (0, u.Wm)(
                                                              o,
                                                              { class: 'field-help' },
                                                              { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                            ),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        ['content'],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                ]),
                                                default: (0, u.w5)(() => [
                                                  ('text' === s.control && 'int' !== s.type) || 'field' === s.control
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        _,
                                                        {
                                                          key: 0,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          type: 'password' === s.name ? 'password' : 'text',
                                                          password: 'password' === s.name,
                                                          autocomplete: 'new-password',
                                                          placeholder: g(s),
                                                          clearable: '',
                                                        },
                                                        null,
                                                        8,
                                                        [
                                                          'modelValue',
                                                          'onUpdate:modelValue',
                                                          'type',
                                                          'password',
                                                          'placeholder',
                                                        ],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'textarea' === s.control && 'int' !== s.type
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        _,
                                                        {
                                                          key: 1,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          type: 'textarea',
                                                          rows: 3,
                                                          placeholder: g(s),
                                                          clearable: '',
                                                        },
                                                        null,
                                                        8,
                                                        ['modelValue', 'onUpdate:modelValue', 'placeholder'],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'text' === s.control && 'int' === s.type
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        _,
                                                        {
                                                          key: 2,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          modelModifiers: { number: !0 },
                                                          type: 'number',
                                                          placeholder: g(s),
                                                        },
                                                        null,
                                                        8,
                                                        ['modelValue', 'onUpdate:modelValue', 'placeholder'],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  ('radio' !== s.control && 'checkbox' !== s.control) ||
                                                  !s.type.includes('bool')
                                                    ? (0, u.kq)('', !0)
                                                    : ((0, u.wg)(),
                                                      (0, u.iD)('div', et, [
                                                        (0, u._)('span', tt, [
                                                          (0, u.wy)(
                                                            (0, u._)(
                                                              'input',
                                                              {
                                                                id: `true-${r}-radio`,
                                                                type: 'radio',
                                                                'onUpdate:modelValue': (e) =>
                                                                  ((0, h.SU)(m)[s.name] = e),
                                                                value: !0,
                                                              },
                                                              null,
                                                              8,
                                                              at,
                                                            ),
                                                            [[f.G2, (0, h.SU)(m)[s.name]]],
                                                          ),
                                                          (0, u._)('label', { for: `true-${r}-radio` }, 'True', 8, lt),
                                                        ]),
                                                        (0, u._)('span', ot, [
                                                          (0, u.wy)(
                                                            (0, u._)(
                                                              'input',
                                                              {
                                                                id: `false-${r}-radio`,
                                                                type: 'radio',
                                                                'onUpdate:modelValue': (e) =>
                                                                  ((0, h.SU)(m)[s.name] = e),
                                                                value: !1,
                                                              },
                                                              null,
                                                              8,
                                                              nt,
                                                            ),
                                                            [[f.G2, (0, h.SU)(m)[s.name]]],
                                                          ),
                                                          (0, u._)(
                                                            'label',
                                                            { for: `false-${r}-radio` },
                                                            'False',
                                                            8,
                                                            st,
                                                          ),
                                                        ]),
                                                      ])),
                                                  'select' === s.control
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        z,
                                                        {
                                                          key: 4,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          placeholder: g(s),
                                                          clearable: '',
                                                          'popper-class': 'select-popper',
                                                        },
                                                        {
                                                          default: (0, u.w5)(() => [
                                                            ((0, u.wg)(!0),
                                                            (0, u.iD)(
                                                              u.HY,
                                                              null,
                                                              (0, u.Ko)(
                                                                s.values,
                                                                (e, t) => (
                                                                  (0, u.wg)(),
                                                                  (0, u.j4)(
                                                                    k,
                                                                    {
                                                                      key: t,
                                                                      value: e.label ? e.value : e,
                                                                      label: e.label ? (0, h.SU)(n)(e.label) : e,
                                                                    },
                                                                    null,
                                                                    8,
                                                                    ['value', 'label'],
                                                                  )
                                                                ),
                                                              ),
                                                              128,
                                                            )),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        ['modelValue', 'onUpdate:modelValue', 'placeholder'],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'col_selector' === s.control && 'array' === s.type
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        z,
                                                        {
                                                          key: 5,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          placeholder: g(s),
                                                          filterable: '',
                                                          multiple: '',
                                                          'allow-create': '',
                                                          'popper-class': 'select-popper',
                                                          onOnCreate: (e) => w(e, s.name),
                                                        },
                                                        {
                                                          default: (0, u.w5)(() => [
                                                            ((0, u.wg)(!0),
                                                            (0, u.iD)(
                                                              u.HY,
                                                              null,
                                                              (0, u.Ko)(
                                                                s.values,
                                                                (e, t) => (
                                                                  (0, u.wg)(),
                                                                  (0, u.j4)(
                                                                    k,
                                                                    { key: t, value: e },
                                                                    {
                                                                      default: (0, u.w5)(() => [
                                                                        (0, u.Uk)((0, v.zw)(e), 1),
                                                                      ]),
                                                                      _: 2,
                                                                    },
                                                                    1032,
                                                                    ['value'],
                                                                  )
                                                                ),
                                                              ),
                                                              128,
                                                            )),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        [
                                                          'modelValue',
                                                          'onUpdate:modelValue',
                                                          'placeholder',
                                                          'onOnCreate',
                                                        ],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'list' === s.control && 'list_string' === s.type
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        z,
                                                        {
                                                          key: 6,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          placeholder: g(s),
                                                          filterable: '',
                                                          multiple: '',
                                                          'allow-create': '',
                                                          'popper-class': 'select-popper',
                                                          onOnCreate: (e) => w(e, s.name),
                                                        },
                                                        {
                                                          default: (0, u.w5)(() => [
                                                            ((0, u.wg)(!0),
                                                            (0, u.iD)(
                                                              u.HY,
                                                              null,
                                                              (0, u.Ko)(
                                                                s.values,
                                                                (e, t) => (
                                                                  (0, u.wg)(),
                                                                  (0, u.j4)(
                                                                    k,
                                                                    { key: t, value: e },
                                                                    {
                                                                      default: (0, u.w5)(() => [
                                                                        (0, u.Uk)((0, v.zw)(e), 1),
                                                                      ]),
                                                                      _: 2,
                                                                    },
                                                                    1032,
                                                                    ['value'],
                                                                  )
                                                                ),
                                                              ),
                                                              128,
                                                            )),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        [
                                                          'modelValue',
                                                          'onUpdate:modelValue',
                                                          'placeholder',
                                                          'onOnCreate',
                                                        ],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'headers' === String(s.name).toLocaleLowerCase() &&
                                                  'list' === s.control
                                                    ? ((0, u.wg)(),
                                                      (0, u.iD)(
                                                        u.HY,
                                                        { key: 7 },
                                                        [
                                                          (0, u._)('span', rt, [
                                                            (0, u._)('span', ut, (0, v.zw)(t.$t(`${(0, h.SU)(y)}`)), 1),
                                                            (0, u.Wm)(
                                                              U,
                                                              {
                                                                modelValue: i.value.mode,
                                                                'onUpdate:modelValue':
                                                                  a[0] || (a[0] = (e) => (i.value.mode = e)),
                                                                size: 'small',
                                                                onOnChange: (e) => S(s.name),
                                                              },
                                                              null,
                                                              8,
                                                              ['modelValue', 'onOnChange'],
                                                            ),
                                                          ]),
                                                          (0, h.SU)(p)(s.name)
                                                            ? ((0, u.wg)(),
                                                              (0, u.j4)(
                                                                Ge,
                                                                {
                                                                  key: 1,
                                                                  modelValue: (0, h.SU)(m)[s.name],
                                                                  'onUpdate:modelValue': (e) =>
                                                                    ((0, h.SU)(m)[s.name] = e),
                                                                  placeholder: i.value.placeholder,
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue', 'onUpdate:modelValue', 'placeholder'],
                                                              ))
                                                            : ((0, u.wg)(),
                                                              (0, u.j4)(
                                                                Ue,
                                                                {
                                                                  key: 0,
                                                                  ref_for: !0,
                                                                  ref_key: 'keyValueEditorRef',
                                                                  ref: d,
                                                                  modelValue: (0, h.SU)(m)[s.name],
                                                                  'onUpdate:modelValue': (e) =>
                                                                    ((0, h.SU)(m)[s.name] = e),
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue', 'onUpdate:modelValue'],
                                                              )),
                                                        ],
                                                        64,
                                                      ))
                                                    : 'list' === s.control && 'list_object' === s.type
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        Ue,
                                                        {
                                                          key: 8,
                                                          ref_for: !0,
                                                          ref_key: 'keyValueEditorRef',
                                                          ref: d,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          templateData: s.templateData,
                                                          properties: s.properties,
                                                          modalVisible: e.modalVisible,
                                                        },
                                                        null,
                                                        8,
                                                        [
                                                          'modelValue',
                                                          'onUpdate:modelValue',
                                                          'templateData',
                                                          'properties',
                                                          'modalVisible',
                                                        ],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'list' === s.control && 'string' === s.type
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        Xe,
                                                        {
                                                          key: 9,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                          columns: c.value,
                                                        },
                                                        null,
                                                        8,
                                                        ['modelValue', 'onUpdate:modelValue', 'columns'],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                  'file' === s.control
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        be,
                                                        {
                                                          key: 10,
                                                          property: s,
                                                          modelValue: (0, h.SU)(m)[s.name],
                                                          'onUpdate:modelValue': (e) => ((0, h.SU)(m)[s.name] = e),
                                                        },
                                                        null,
                                                        8,
                                                        ['property', 'modelValue', 'onUpdate:modelValue'],
                                                      ))
                                                    : (0, u.kq)('', !0),
                                                ]),
                                                _: 2,
                                              },
                                              1032,
                                              ['prop', 'rules'],
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ['span'],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['model'],
                    )
                  )
                }
              )
            },
          }
          const dt = (0, d.Z)(it, [['__scopeId', 'data-v-fc8fedc8']])
          var ct = dt
          const mt = { class: 'title' }
          var pt = {
            name: 'ConnectionSelector',
            props: {
              modelValue: { type: String, default: () => '' },
              type: { type: String, default: '' },
              lists: { type: Array, default: () => null },
            },
            emits: ['update:modelValue', 'onChange'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { myValue: o, list: n, init: s, loading: r, onChange: i, selectorRef: d } = Ve(l, a),
                c = (0, u.Fl)(() => (e) => ['mqtt', 'edgex'].includes(e || l.type))
              ;(0, u.YP)(
                () => l.type,
                (e) => {
                  ;(0, u.Y3)(() => {
                    if (l.lists) n.value = l.lists
                    else if (e) {
                      if (c.value(e)) return void s(m)
                      ;(o.value = ''), (n.value = [])
                    }
                  })
                },
                { immediate: !0 },
              )
              const m = () =>
                new Promise((e, t) => {
                  l.type && c.value(l.type)
                    ? xe('connections', l.type)
                        .then((t) => {
                          const { data: a } = t,
                            l = Object.keys(a)
                          e(l)
                        })
                        .catch((e) => {
                          t(e)
                        })
                    : e([])
                })
              return (
                l.lists && (n.value = l.lists),
                t({ selectorRef: d, init: s, getList: m }),
                (e, t) => {
                  const a = (0, u.up)('el-option'),
                    l = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      l,
                      (0, u.dG)(
                        {
                          ref_key: 'selectorRef',
                          ref: d,
                          modelValue: (0, h.SU)(o),
                          'onUpdate:modelValue': t[0] || (t[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                          'popper-class': 'select-popper',
                          clearable: '',
                        },
                        e.$attrs,
                        { onChange: (0, h.SU)(i) },
                      ),
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              (0, h.SU)(n),
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  a,
                                  { key: e, value: e, label: e },
                                  { default: (0, u.w5)(() => [(0, u._)('span', mt, (0, v.zw)(e.name || e), 1)]), _: 2 },
                                  1032,
                                  ['value', 'label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      16,
                      ['modelValue', 'onChange'],
                    )
                  )
                }
              )
            },
          }
          const ft = pt
          var ht = ft
          const vt = (e) => ((0, u.dD)('data-v-10842644'), (e = e()), (0, u.Cn)(), e),
            yt = { class: 'radio-control' },
            gt = { class: 'radio-item' },
            wt = ['disabled'],
            bt = vt(() => (0, u._)('label', { for: 'true-omit-radio' }, 'True', -1)),
            St = { class: 'radio-item' },
            _t = ['disabled'],
            kt = vt(() => (0, u._)('label', { for: 'false-omit-radio' }, 'False', -1)),
            zt = { class: 'radio-control' },
            Ut = { class: 'radio-item' },
            Vt = ['disabled'],
            Ct = vt(() => (0, u._)('label', { for: 'true-send-radio' }, 'True', -1)),
            Dt = { class: 'radio-item' },
            Wt = ['disabled'],
            Tt = vt(() => (0, u._)('label', { for: 'false-send-radio' }, 'False', -1)),
            jt = { class: 'radio-control' },
            xt = { class: 'radio-item' },
            Nt = ['disabled'],
            It = vt(() => (0, u._)('label', { for: 'true-enable-cache-radio' }, 'True', -1)),
            Ft = { class: 'radio-item' },
            At = ['disabled'],
            Et = vt(() => (0, u._)('label', { for: 'false-enable-cache-radio' }, 'False', -1)),
            Pt = { class: 'radio-control' },
            Rt = { class: 'radio-item' },
            Ht = ['disabled'],
            Ot = vt(() => (0, u._)('label', { for: 'true-clean-cache-radio' }, 'True', -1)),
            qt = { class: 'radio-item' },
            Lt = ['disabled'],
            Mt = vt(() => (0, u._)('label', { for: 'false-clean-cache-radio' }, 'False', -1)),
            Kt = { class: 'radio-control' },
            Yt = { class: 'radio-item' },
            Bt = ['disabled'],
            Gt = vt(() => (0, u._)('label', { for: 'true-run-radio' }, 'True', -1)),
            Zt = { class: 'radio-item' },
            Qt = ['disabled'],
            Jt = vt(() => (0, u._)('label', { for: 'false-run-radio' }, 'False', -1))
          var Xt = {
            name: 'AdvanceForm',
            props: {
              type: { type: String, default: '' },
              isDetail: { type: Boolean, default: !1 },
              modelValue: { type: Object, default: () => {} },
              colItemSpan: { type: Number, default: 12 },
              isEdit: { type: Boolean, default: !1 },
            },
            emits: ['update:modelValue', 'changeConnectionSelector'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { t: o } = (0, b.QT)(),
                n = (0, h.iH)(!1),
                s = (0, h.iH)(null),
                r = (0, u.Fl)({
                  get: () => l.modelValue,
                  set: (e) => {
                    a('update:modelValue', e)
                  },
                }),
                i = (0, u.Fl)(() => ['mqtt', 'edgex'].includes(l.type)),
                d = () => {
                  r.value = {
                    ...r.value,
                    runAsync: !1,
                    omitIfEmpty: !1,
                    sendSingle: !0,
                    dataTemplate: '',
                    bufferLength: 1024,
                    enableCache: !1,
                    format: 'json',
                    schemaName: '',
                    schemaMessage: '',
                    delimiter: '',
                  }
                },
                c = (e) => {
                  const {
                      omitIfEmpty: t,
                      sendSingle: a,
                      format: l,
                      schemaName: o,
                      schemaMessage: n,
                      dataTemplate: s,
                      concurrency: r,
                      bufferLength: u,
                      enableCache: i,
                      memoryCacheThreshold: d,
                      maxDiskCache: c,
                      cleanCacheAtStop: m,
                      bufferPageSize: p,
                      resendInterval: f,
                      runAsync: h,
                    } = e || {},
                    v = {
                      omitIfEmpty: t,
                      sendSingle: a,
                      format: l,
                      schemaName: o,
                      schemaMessage: n,
                      dataTemplate: s,
                      concurrency: r,
                      bufferLength: u,
                      enableCache: i,
                      memoryCacheThreshold: d,
                      maxDiskCache: c,
                      cleanCacheAtStop: m,
                      bufferPageSize: p,
                      resendInterval: f,
                      runAsync: h,
                    },
                    y = Object.keys(v),
                    g = y.every((e) => void 0 === v[e])
                  return g
                }
              ;(0, u.YP)(
                () => l.modelValue,
                (e) => {
                  const t = c(e)
                  t ? d() : (r.value = e)
                },
                { immediate: !0, deep: !0 },
              )
              const m = (e) => {
                  a('changeConnectionSelector', e)
                },
                p = (e) => {
                  ;(r.value.schemaName = ''), y(), (r.value.delimiter = 'delimited' === e ? ',' : '')
                },
                y = () => {
                  r.value.schemaMessage = ''
                },
                g = async () => {
                  try {
                    const e = await s.value.validate()
                    return Promise.resolve(e)
                  } catch (e) {
                    return Promise.reject(e)
                  }
                }
              return (
                t({ validateAdvancedForm: g }),
                (t, a) => {
                  const l = (0, u.up)('QuestionFilled'),
                    o = (0, u.up)('el-icon'),
                    d = (0, u.up)('el-tooltip'),
                    c = (0, u.up)('el-form-item'),
                    g = (0, u.up)('el-col'),
                    w = (0, u.up)('el-input'),
                    b = (0, u.up)('el-divider'),
                    S = (0, u.up)('el-row'),
                    _ = (0, u.up)('el-form')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      _,
                      { ref_key: 'advanceFormRef', ref: s, model: (0, h.SU)(r), 'label-position': 'top' },
                      {
                        default: (0, u.w5)(() => [
                          (0, u.Wm)(
                            S,
                            { gutter: 20 },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(
                                  g,
                                  { span: e.colItemSpan },
                                  {
                                    default: (0, u.w5)(() => [
                                      (0, u.Wm)(
                                        c,
                                        { label: t.$t('rules.omitIfEmpty'), prop: 'omitIfEmpty' },
                                        {
                                          label: (0, u.w5)(() => [
                                            (0, u.Uk)((0, v.zw)(t.$t('rules.omitIfEmpty')) + ' ', 1),
                                            (0, u.Wm)(
                                              d,
                                              {
                                                'max-width': '250px',
                                                placement: 'top',
                                                content: t.$t('rules.omitIfEmptyDesc'),
                                                class: 'field-help',
                                                transfer: '',
                                              },
                                              {
                                                default: (0, u.w5)(() => [
                                                  (0, u.Wm)(
                                                    o,
                                                    { class: 'field-help' },
                                                    { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ['content'],
                                            ),
                                          ]),
                                          default: (0, u.w5)(() => [
                                            (0, u._)('div', yt, [
                                              (0, u._)('span', gt, [
                                                (0, u.wy)(
                                                  (0, u._)(
                                                    'input',
                                                    {
                                                      'onUpdate:modelValue':
                                                        a[0] || (a[0] = (e) => ((0, h.SU)(r).omitIfEmpty = e)),
                                                      id: 'true-omit-radio',
                                                      type: 'radio',
                                                      value: !0,
                                                      disabled: e.isDetail,
                                                    },
                                                    null,
                                                    8,
                                                    wt,
                                                  ),
                                                  [[f.G2, (0, h.SU)(r).omitIfEmpty]],
                                                ),
                                                bt,
                                              ]),
                                              (0, u._)('span', St, [
                                                (0, u.wy)(
                                                  (0, u._)(
                                                    'input',
                                                    {
                                                      'onUpdate:modelValue':
                                                        a[1] || (a[1] = (e) => ((0, h.SU)(r).omitIfEmpty = e)),
                                                      id: 'false-omit-radio',
                                                      type: 'radio',
                                                      value: !1,
                                                      disabled: e.isDetail,
                                                    },
                                                    null,
                                                    8,
                                                    _t,
                                                  ),
                                                  [[f.G2, (0, h.SU)(r).omitIfEmpty]],
                                                ),
                                                kt,
                                              ]),
                                            ]),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['label'],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['span'],
                                ),
                                (0, u.Wm)(
                                  g,
                                  { span: e.colItemSpan },
                                  {
                                    default: (0, u.w5)(() => [
                                      (0, u.Wm)(
                                        c,
                                        { label: t.$t('rules.sendSingle'), prop: 'sendSingle' },
                                        {
                                          label: (0, u.w5)(() => [
                                            (0, u.Uk)((0, v.zw)(t.$t('rules.sendSingle')) + ' ', 1),
                                            (0, u.Wm)(
                                              d,
                                              {
                                                'max-width': '250px',
                                                placement: 'top',
                                                content: t.$t('rules.sendSingleDesc'),
                                                class: 'field-help',
                                                transfer: '',
                                              },
                                              {
                                                default: (0, u.w5)(() => [
                                                  (0, u.Wm)(
                                                    o,
                                                    { class: 'field-help' },
                                                    { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ['content'],
                                            ),
                                          ]),
                                          default: (0, u.w5)(() => [
                                            (0, u._)('div', zt, [
                                              (0, u._)('span', Ut, [
                                                (0, u.wy)(
                                                  (0, u._)(
                                                    'input',
                                                    {
                                                      disabled: e.isDetail,
                                                      id: 'true-send-radio',
                                                      type: 'radio',
                                                      'onUpdate:modelValue':
                                                        a[2] || (a[2] = (e) => ((0, h.SU)(r).sendSingle = e)),
                                                      value: !0,
                                                    },
                                                    null,
                                                    8,
                                                    Vt,
                                                  ),
                                                  [[f.G2, (0, h.SU)(r).sendSingle]],
                                                ),
                                                Ct,
                                              ]),
                                              (0, u._)('span', Dt, [
                                                (0, u.wy)(
                                                  (0, u._)(
                                                    'input',
                                                    {
                                                      disabled: e.isDetail,
                                                      id: 'false-send-radio',
                                                      type: 'radio',
                                                      'onUpdate:modelValue':
                                                        a[3] || (a[3] = (e) => ((0, h.SU)(r).sendSingle = e)),
                                                      value: !1,
                                                    },
                                                    null,
                                                    8,
                                                    Wt,
                                                  ),
                                                  [[f.G2, (0, h.SU)(r).sendSingle]],
                                                ),
                                                Tt,
                                              ]),
                                            ]),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['label'],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['span'],
                                ),
                                (0, u.Wm)(
                                  g,
                                  { span: e.colItemSpan },
                                  {
                                    default: (0, u.w5)(() => [
                                      (0, u.Wm)(
                                        c,
                                        { label: t.$t('streams.format'), prop: 'format' },
                                        {
                                          default: (0, u.w5)(() => [
                                            (0, u.Wm)(
                                              Te,
                                              {
                                                modelValue: (0, h.SU)(r).format,
                                                'onUpdate:modelValue':
                                                  a[4] || (a[4] = (e) => ((0, h.SU)(r).format = e)),
                                                onOnChange: p,
                                                onClear: p,
                                              },
                                              null,
                                              8,
                                              ['modelValue'],
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['label'],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['span'],
                                ),
                                'protobuf' === (0, h.SU)(r).format || 'custom' === (0, h.SU)(r).format
                                  ? ((0, u.wg)(),
                                    (0, u.j4)(
                                      g,
                                      { key: 0, span: e.colItemSpan },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            c,
                                            { label: t.$t('streams.schemaName'), prop: 'format' },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  qe,
                                                  {
                                                    modelValue: (0, h.SU)(r).schemaName,
                                                    'onUpdate:modelValue':
                                                      a[5] || (a[5] = (e) => ((0, h.SU)(r).schemaName = e)),
                                                    type: (0, h.SU)(r).format,
                                                    onOnChange: y,
                                                    onClear: y,
                                                  },
                                                  null,
                                                  8,
                                                  ['modelValue', 'type'],
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ['label'],
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['span'],
                                    ))
                                  : (0, u.kq)('', !0),
                                'protobuf' === (0, h.SU)(r).format || 'custom' === (0, h.SU)(r).format
                                  ? ((0, u.wg)(),
                                    (0, u.j4)(
                                      g,
                                      { key: 1, span: e.colItemSpan },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            c,
                                            { label: t.$t('streams.schemaMessage'), prop: 'format' },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  w,
                                                  {
                                                    modelValue: (0, h.SU)(r).schemaMessage,
                                                    'onUpdate:modelValue':
                                                      a[6] || (a[6] = (e) => ((0, h.SU)(r).schemaMessage = e)),
                                                    type: 'textarea',
                                                    autosize: '',
                                                  },
                                                  null,
                                                  8,
                                                  ['modelValue'],
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ['label'],
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['span'],
                                    ))
                                  : (0, u.kq)('', !0),
                                'delimited' === (0, h.SU)(r).format
                                  ? ((0, u.wg)(),
                                    (0, u.j4)(
                                      g,
                                      { key: 2, span: e.colItemSpan },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            c,
                                            { label: t.$t('streams.delimited'), prop: 'delimiter' },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  w,
                                                  {
                                                    modelValue: (0, h.SU)(r).delimiter,
                                                    'onUpdate:modelValue':
                                                      a[7] || (a[7] = (e) => ((0, h.SU)(r).delimiter = e)),
                                                  },
                                                  null,
                                                  8,
                                                  ['modelValue'],
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ['label'],
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['span'],
                                    ))
                                  : (0, u.kq)('', !0),
                                (0, u.Wm)(
                                  g,
                                  { span: 24 },
                                  {
                                    default: (0, u.w5)(() => [
                                      (0, u.Wm)(
                                        c,
                                        { label: t.$t('rules.dataTemplate'), prop: 'dataTemplate' },
                                        {
                                          label: (0, u.w5)(() => [
                                            (0, u.Uk)((0, v.zw)(t.$t('rules.dataTemplate')) + ' ', 1),
                                            (0, u.Wm)(
                                              d,
                                              {
                                                'max-width': '250px',
                                                placement: 'top',
                                                content: t.$t('rules.dataTemplateDesc'),
                                                class: 'field-help',
                                                transfer: '',
                                              },
                                              {
                                                default: (0, u.w5)(() => [
                                                  (0, u.Wm)(
                                                    o,
                                                    { class: 'field-help' },
                                                    { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ['content'],
                                            ),
                                          ]),
                                          default: (0, u.w5)(() => [
                                            (0, u.Wm)(
                                              w,
                                              {
                                                modelValue: (0, h.SU)(r).dataTemplate,
                                                'onUpdate:modelValue':
                                                  a[8] || (a[8] = (e) => ((0, h.SU)(r).dataTemplate = e)),
                                                type: 'textarea',
                                                rows: 3,
                                                disabled: e.isDetail,
                                              },
                                              null,
                                              8,
                                              ['modelValue', 'disabled'],
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['label'],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                ),
                                (0, u.Wm)(b, null, {
                                  default: (0, u.w5)(() => [
                                    (0, u._)(
                                      'span',
                                      { class: 'advanced', onClick: a[9] || (a[9] = (e) => (n.value = !n.value)) },
                                      [
                                        n.value
                                          ? ((0, u.wg)(),
                                            (0, u.j4)(
                                              o,
                                              { key: 0 },
                                              { default: (0, u.w5)(() => [(0, u.Wm)((0, h.SU)(Se.ArrowUp))]), _: 1 },
                                            ))
                                          : ((0, u.wg)(),
                                            (0, u.j4)(
                                              o,
                                              { key: 1 },
                                              { default: (0, u.w5)(() => [(0, u.Wm)((0, h.SU)(Se.ArrowDown))]), _: 1 },
                                            )),
                                        (0, u.Uk)(' ' + (0, v.zw)(t.$t('common.advanced')), 1),
                                      ],
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                n.value
                                  ? ((0, u.wg)(),
                                    (0, u.iD)(
                                      u.HY,
                                      { key: 3 },
                                      [
                                        (0, u.wy)(
                                          (0, u.Wm)(
                                            g,
                                            { span: e.colItemSpan },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  c,
                                                  {
                                                    label: t.$t('configuration.connectionSelector'),
                                                    prop: 'connectionSelector',
                                                  },
                                                  {
                                                    default: (0, u.w5)(() => [
                                                      (0, u.Wm)(
                                                        ht,
                                                        {
                                                          modelValue: (0, h.SU)(r).connectionSelector,
                                                          'onUpdate:modelValue':
                                                            a[10] ||
                                                            (a[10] = (e) => ((0, h.SU)(r).connectionSelector = e)),
                                                          type: e.type,
                                                          onOnChange: m,
                                                        },
                                                        null,
                                                        8,
                                                        ['modelValue', 'type'],
                                                      ),
                                                    ]),
                                                    _: 1,
                                                  },
                                                  8,
                                                  ['label'],
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ['span'],
                                          ),
                                          [[f.F8, (0, h.SU)(i)]],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.concurrency'), prop: 'concurrency' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.concurrency')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.sinkConcurrencyDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u.Wm)(
                                                      w,
                                                      {
                                                        modelValue: (0, h.SU)(r).concurrency,
                                                        'onUpdate:modelValue':
                                                          a[11] || (a[11] = (e) => ((0, h.SU)(r).concurrency = e)),
                                                        modelModifiers: { number: !0 },
                                                        type: 'number',
                                                        disabled: e.isDetail,
                                                        placeholder: '1',
                                                      },
                                                      null,
                                                      8,
                                                      ['modelValue', 'disabled'],
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.bufferLength'), prop: 'bufferLength' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.bufferLength')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.sinkBufferLengthDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u.Wm)(
                                                      w,
                                                      {
                                                        modelValue: (0, h.SU)(r).bufferLength,
                                                        'onUpdate:modelValue':
                                                          a[12] || (a[12] = (e) => ((0, h.SU)(r).bufferLength = e)),
                                                        modelModifiers: { number: !0 },
                                                        type: 'number',
                                                        disabled: e.isDetail,
                                                        placeholder: '1024',
                                                      },
                                                      null,
                                                      8,
                                                      ['modelValue', 'disabled'],
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.enableCache'), prop: 'enableCache' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.enableCache')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.enableCacheDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u._)('div', jt, [
                                                      (0, u._)('span', xt, [
                                                        (0, u.wy)(
                                                          (0, u._)(
                                                            'input',
                                                            {
                                                              id: 'true-enable-cache-radio',
                                                              type: 'radio',
                                                              'onUpdate:modelValue':
                                                                a[13] ||
                                                                (a[13] = (e) => ((0, h.SU)(r).enableCache = e)),
                                                              value: !0,
                                                              disabled: e.isDetail,
                                                            },
                                                            null,
                                                            8,
                                                            Nt,
                                                          ),
                                                          [[f.G2, (0, h.SU)(r).enableCache]],
                                                        ),
                                                        It,
                                                      ]),
                                                      (0, u._)('span', Ft, [
                                                        (0, u.wy)(
                                                          (0, u._)(
                                                            'input',
                                                            {
                                                              disabled: e.isDetail,
                                                              id: 'false-enable-cache-radio',
                                                              type: 'radio',
                                                              'onUpdate:modelValue':
                                                                a[14] ||
                                                                (a[14] = (e) => ((0, h.SU)(r).enableCache = e)),
                                                              value: !1,
                                                            },
                                                            null,
                                                            8,
                                                            At,
                                                          ),
                                                          [[f.G2, (0, h.SU)(r).enableCache]],
                                                        ),
                                                        Et,
                                                      ]),
                                                    ]),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.cleanCacheAtStop'), prop: 'cleanCacheAtStop' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.cleanCacheAtStop')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.cleanCacheAtStopDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u._)('div', Pt, [
                                                      (0, u._)('span', Rt, [
                                                        (0, u.wy)(
                                                          (0, u._)(
                                                            'input',
                                                            {
                                                              id: 'true-clean-cache-radio',
                                                              type: 'radio',
                                                              'onUpdate:modelValue':
                                                                a[15] ||
                                                                (a[15] = (e) => ((0, h.SU)(r).cleanCacheAtStop = e)),
                                                              value: !0,
                                                              disabled: e.isDetail,
                                                            },
                                                            null,
                                                            8,
                                                            Ht,
                                                          ),
                                                          [[f.G2, (0, h.SU)(r).cleanCacheAtStop]],
                                                        ),
                                                        Ot,
                                                      ]),
                                                      (0, u._)('span', qt, [
                                                        (0, u.wy)(
                                                          (0, u._)(
                                                            'input',
                                                            {
                                                              disabled: e.isDetail,
                                                              id: 'false-clean-cache-radio',
                                                              type: 'radio',
                                                              'onUpdate:modelValue':
                                                                a[16] ||
                                                                (a[16] = (e) => ((0, h.SU)(r).cleanCacheAtStop = e)),
                                                              value: !1,
                                                            },
                                                            null,
                                                            8,
                                                            Lt,
                                                          ),
                                                          [[f.G2, (0, h.SU)(r).cleanCacheAtStop]],
                                                        ),
                                                        Mt,
                                                      ]),
                                                    ]),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                {
                                                  label: t.$t('rules.memoryCacheThreshold'),
                                                  prop: 'memoryCacheThreshold',
                                                },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.memoryCacheThreshold')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.memoryCacheThresholdDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u.Wm)(
                                                      w,
                                                      {
                                                        modelValue: (0, h.SU)(r).memoryCacheThreshold,
                                                        'onUpdate:modelValue':
                                                          a[17] ||
                                                          (a[17] = (e) => ((0, h.SU)(r).memoryCacheThreshold = e)),
                                                        modelModifiers: { number: !0 },
                                                        type: 'number',
                                                        disabled: e.isDetail,
                                                        placeholder: '1024',
                                                      },
                                                      null,
                                                      8,
                                                      ['modelValue', 'disabled'],
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.maxDiskCache'), prop: 'maxDiskCache' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.maxDiskCache')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.maxDiskCacheDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u.Wm)(
                                                      w,
                                                      {
                                                        modelValue: (0, h.SU)(r).maxDiskCache,
                                                        'onUpdate:modelValue':
                                                          a[18] || (a[18] = (e) => ((0, h.SU)(r).maxDiskCache = e)),
                                                        modelModifiers: { number: !0 },
                                                        type: 'number',
                                                        disabled: e.isDetail,
                                                        placeholder: '1024000',
                                                      },
                                                      null,
                                                      8,
                                                      ['modelValue', 'disabled'],
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.bufferPageSize'), prop: 'bufferPageSize' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.bufferPageSize')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.bufferPageSizeDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u.Wm)(
                                                      w,
                                                      {
                                                        modelValue: (0, h.SU)(r).bufferPageSize,
                                                        'onUpdate:modelValue':
                                                          a[19] || (a[19] = (e) => ((0, h.SU)(r).bufferPageSize = e)),
                                                        modelModifiers: { number: !0 },
                                                        type: 'number',
                                                        disabled: e.isDetail,
                                                        placeholder: '256',
                                                      },
                                                      null,
                                                      8,
                                                      ['modelValue', 'disabled'],
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.resendInterval'), prop: 'resendInterval' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.resendInterval')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.resendIntervalDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u.Wm)(
                                                      w,
                                                      {
                                                        modelValue: (0, h.SU)(r).resendInterval,
                                                        'onUpdate:modelValue':
                                                          a[20] || (a[20] = (e) => ((0, h.SU)(r).resendInterval = e)),
                                                        modelModifiers: { number: !0 },
                                                        type: 'number',
                                                        disabled: e.isDetail,
                                                        placeholder: '0',
                                                      },
                                                      null,
                                                      8,
                                                      ['modelValue', 'disabled'],
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                        (0, u.Wm)(
                                          g,
                                          { span: e.colItemSpan },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, u.Wm)(
                                                c,
                                                { label: t.$t('rules.runAsync'), prop: 'runAsync' },
                                                {
                                                  label: (0, u.w5)(() => [
                                                    (0, u.Uk)((0, v.zw)(t.$t('rules.runAsync')) + ' ', 1),
                                                    (0, u.Wm)(
                                                      d,
                                                      {
                                                        'max-width': '250px',
                                                        placement: 'top',
                                                        content: t.$t('rules.runAsyncDesc'),
                                                        class: 'field-help',
                                                        transfer: '',
                                                      },
                                                      {
                                                        default: (0, u.w5)(() => [
                                                          (0, u.Wm)(
                                                            o,
                                                            { class: 'field-help' },
                                                            { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ['content'],
                                                    ),
                                                  ]),
                                                  default: (0, u.w5)(() => [
                                                    (0, u._)('div', Kt, [
                                                      (0, u._)('span', Yt, [
                                                        (0, u.wy)(
                                                          (0, u._)(
                                                            'input',
                                                            {
                                                              disabled: e.isDetail,
                                                              id: 'true-run-radio',
                                                              type: 'radio',
                                                              'onUpdate:modelValue':
                                                                a[21] || (a[21] = (e) => ((0, h.SU)(r).runAsync = e)),
                                                              value: !0,
                                                            },
                                                            null,
                                                            8,
                                                            Bt,
                                                          ),
                                                          [[f.G2, (0, h.SU)(r).runAsync]],
                                                        ),
                                                        Gt,
                                                      ]),
                                                      (0, u._)('span', Zt, [
                                                        (0, u.wy)(
                                                          (0, u._)(
                                                            'input',
                                                            {
                                                              disabled: e.isDetail,
                                                              id: 'false-run-radio',
                                                              type: 'radio',
                                                              'onUpdate:modelValue':
                                                                a[22] || (a[22] = (e) => ((0, h.SU)(r).runAsync = e)),
                                                              value: !1,
                                                            },
                                                            null,
                                                            8,
                                                            Qt,
                                                          ),
                                                          [[f.G2, (0, h.SU)(r).runAsync]],
                                                        ),
                                                        Jt,
                                                      ]),
                                                    ]),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ['label'],
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ['span'],
                                        ),
                                      ],
                                      64,
                                    ))
                                  : (0, u.kq)('', !0),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['model'],
                    )
                  )
                }
              )
            },
          }
          const ea = (0, d.Z)(Xt, [['__scopeId', 'data-v-10842644']])
          var ta = ea,
            aa = a(844)
          const la = { key: 0 },
            oa = { class: 'dialog-footer' }
          var na = {
            name: 'ConfKeyPropertiesDialog',
            props: {
              modelValue: { type: Boolean, default: !1 },
              category: { type: String, default: '' },
              type: { type: String, default: '' },
              confKeyName: { type: String, default: '' },
              isEdit: { type: Boolean, default: !1 },
              isCanAdvanced: { type: Boolean, default: !1 },
              isShowConnectionSelector: { type: Boolean, default: !1 },
            },
            emits: ['update:modelValue', 'submit', 'update:type'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { t: o } = (0, b.QT)(),
                n = (0, h.iH)(null),
                s = (0, h.iH)(null),
                r = (0, h.iH)(null),
                i = (0, h.iH)(null),
                d = (0, h.iH)(null),
                c = (0, h.iH)({ name: '' }),
                m = (0, h.iH)([]),
                p = (0, h.iH)({}),
                f = (0, h.iH)({}),
                y = (0, h.iH)({}),
                g = (0, h.iH)({}),
                w = (0, h.iH)(!1),
                _ = (0, h.iH)(!1),
                k = (0, h.iH)(!1),
                U = (0, u.Fl)({
                  get: () => l.modelValue,
                  set: (e) => {
                    a('update:modelValue', e)
                  },
                }),
                V = (0, u.Fl)(() => l.type),
                C = (0, u.Fl)(() => (l.isEdit ? '编辑配置组' : '添加配置组')),
                D = (0, u.Fl)(() => ['mqtt', 'edgex'].includes(V.value))
              ;(0, u.YP)(
                () => l.modelValue,
                (e) => {
                  e && V.value ? T() : ((c.value = { name: '' }), (m.value = []), (f.value = {}))
                },
              )
              const W = (0, h.iH)({
                  name: [{ required: !0, message: o('validate.emptyContentByName', { name: o('common.name') }) }],
                }),
                T = async () => {
                  try {
                    k.value = !0
                    const e = V.value,
                      { data: t } = await je(l.category, e),
                      { properties: a } = t
                    let o = a?.default || (Array.isArray(a) ? a : [])
                    if (((o = o.filter((e) => 'connectionSelector' !== e.name)), l.isEdit)) {
                      const { data: t } = await xe(l.category, e)
                      t.value = t
                      const a = t.value[l.confKeyName],
                        o = (0, aa.zE)(e, a)
                      if (l.isCanAdvanced) {
                        c.value = { name: l.confKeyName }
                        const {
                          omitIfEmpty: e,
                          sendSingle: t,
                          format: a,
                          schemaName: n,
                          schemaMessage: s,
                          dataTemplate: r,
                          concurrency: u,
                          bufferLength: i,
                          enableCache: d,
                          memoryCacheThreshold: m,
                          maxDiskCache: p,
                          cleanCacheAtStop: h,
                          bufferPageSize: v,
                          resendInterval: g,
                          runAsync: w,
                          connectionSelector: b,
                          ...S
                        } = o
                        ;(f.value = { ...S }),
                          (y.value = {
                            omitIfEmpty: e,
                            sendSingle: t,
                            format: a,
                            schemaName: n,
                            schemaMessage: s,
                            dataTemplate: r,
                            concurrency: u,
                            bufferLength: i,
                            enableCache: d,
                            memoryCacheThreshold: m,
                            maxDiskCache: p,
                            cleanCacheAtStop: h,
                            bufferPageSize: v,
                            resendInterval: g,
                            runAsync: w,
                            connectionSelector: b,
                          })
                      } else {
                        const { connectionSelector: e, ...t } = o
                        ;(c.value = { name: l.confKeyName, connectionSelector: e }), (f.value = { ...t })
                      }
                      const { connectionSelector: n } = o
                      n && j(n)
                    } else (f.value = Ke(o)), (p.value = (0, z.cloneDeep)(f.value))
                    m.value = o
                      ? o.map((e) => {
                          'list' === e.control && 'list_object' === e.type && (e.properties = e.default)
                          const { control: t, type: a } = e,
                            l = (g.value && g.value[e.name]) || e.default
                          return (
                            (e.default = Me(t, a, l)),
                            'insecureSkipVerify' === e.name &&
                              g.value &&
                              void 0 === g.value[e.name] &&
                              (e.default = !0),
                            e
                          )
                        })
                      : []
                  } finally {
                    k.value = !1
                  }
                },
                j = (e) => {
                  e
                    ? xe('connections', V.value).then((t) => {
                        const { data: a } = t,
                          l = a[e]
                        f.value = { ...f.value, ...l }
                      })
                    : (f.value = l.isEdit ? {} : p.value)
                },
                x = async (e, t) => {
                  ;(_.value = !0),
                    Ne(l.category, e, t)
                      .then(() => {
                        S.z8.success(o('common.TestConnectionSuccess'))
                      })
                      .finally(() => {
                        _.value = !1
                      })
                },
                N = async () => {
                  try {
                    const e = [s.value.validate()],
                      { validatePropertiesForm: t } = r.value || {},
                      { validateAdvancedForm: a } = i.value || {}
                    t && e.push(t()), a && e.push(a())
                    const l = await Promise.allSettled(e),
                      n = l.every((e) => e?.value)
                    return n ? Promise.resolve(n) : Promise.reject(o('common.emptyForm'))
                  } catch (e) {
                    return console.error('error', e), Promise.reject(e)
                  }
                },
                $ = async () => {
                  try {
                    await N()
                    const { name: e, ...t } = f.value
                    let a = {}
                    if (l.isCanAdvanced) {
                      const e = (0, aa.zE)(V.value, y.value)
                      a = { ...t, ...e }
                    } else {
                      const e = (0, aa.zE)(V.value, c.value)
                      a = { ...t, ...e }
                    }
                    const o = Le(a)
                    return Promise.resolve(o)
                  } catch (e) {
                    return Promise.reject(e)
                  }
                },
                I = async (e, t) => {
                  w.value = !0
                  const { name: n } = c.value
                  $e(l.category, e, n, t)
                    .then(() => {
                      ;(U.value = !1),
                        a('submit', { name: n, ...t }),
                        l.isEdit ? S.z8.success(o('common.updateSuccess')) : S.z8.success(o('common.addSuccess'))
                    })
                    .finally(() => {
                      w.value = !1
                    })
                },
                F = async (e) => {
                  try {
                    const t = await $(),
                      a = V.value
                    'testConnection' === e ? x(a, t) : I(a, t)
                  } catch (t) {
                    console.error('error', t)
                  }
                }
              return (
                t({ validateConfKeyForm: N }),
                (t, a) => {
                  const l = (0, u.up)('el-input'),
                    o = (0, u.up)('el-form-item'),
                    p = (0, u.up)('el-col'),
                    g = (0, u.up)('el-row'),
                    b = (0, u.up)('el-form'),
                    S = (0, u.up)('el-button'),
                    z = (0, u.up)('el-dialog')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      z,
                      {
                        ref_key: 'dialogRef',
                        ref: n,
                        modelValue: (0, h.SU)(U),
                        'onUpdate:modelValue': a[6] || (a[6] = (e) => ((0, h.dq)(U) ? (U.value = e) : null)),
                        title: (0, h.SU)(C),
                        width: '50%',
                      },
                      {
                        footer: (0, u.w5)(() => [
                          (0, u._)('span', oa, [
                            (0, u.Wm)(
                              S,
                              { onClick: a[4] || (a[4] = (e) => (U.value = !1)) },
                              { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(t.$t('common.cancel')), 1)]), _: 1 },
                            ),
                            (0, u.Wm)(
                              S,
                              {
                                type: 'primary',
                                disabled: k.value,
                                loading: _.value,
                                onClick: a[5] || (a[5] = (e) => F('testConnection')),
                              },
                              {
                                default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(t.$t('common.testConnection')), 1)]),
                                _: 1,
                              },
                              8,
                              ['disabled', 'loading'],
                            ),
                            (0, u.Wm)(
                              S,
                              { type: 'primary', disabled: k.value, loading: w.value, onClick: F },
                              { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(t.$t('common.submit')), 1)]), _: 1 },
                              8,
                              ['disabled', 'loading'],
                            ),
                          ]),
                        ]),
                        default: (0, u.w5)(() => [
                          (0, u.Wm)(
                            b,
                            {
                              ref_key: 'confKeyFormRef',
                              ref: s,
                              model: c.value,
                              'label-position': 'top',
                              rules: W.value,
                            },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(
                                  g,
                                  { gutter: 20 },
                                  {
                                    default: (0, u.w5)(() => [
                                      (0, u.Wm)(p, null, {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            o,
                                            { label: t.$t('common.name'), prop: 'name' },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  l,
                                                  {
                                                    modelValue: c.value.name,
                                                    'onUpdate:modelValue': a[0] || (a[0] = (e) => (c.value.name = e)),
                                                    placeholder: t.$t('common.placeholderByname', {
                                                      name: t.$t('common.name'),
                                                    }),
                                                  },
                                                  null,
                                                  8,
                                                  ['modelValue', 'placeholder'],
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ['label'],
                                          ),
                                        ]),
                                        _: 1,
                                      }),
                                    ]),
                                    _: 1,
                                  },
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['model', 'rules'],
                          ),
                          (0, u.Wm)(
                            ct,
                            {
                              ref_key: 'propertiesFormRef',
                              ref: r,
                              modelValue: f.value,
                              'onUpdate:modelValue': a[1] || (a[1] = (e) => (f.value = e)),
                              properties: m.value,
                              nodeName: (0, h.SU)(V),
                              formColSpan: 12,
                              isEdit: e.isEdit,
                            },
                            null,
                            8,
                            ['modelValue', 'properties', 'nodeName', 'isEdit'],
                          ),
                          e.isCanAdvanced
                            ? ((0, u.wg)(),
                              (0, u.iD)('section', la, [
                                (0, u.Wm)(
                                  ta,
                                  {
                                    ref_key: 'advancedFormRef',
                                    ref: i,
                                    modelValue: y.value,
                                    'onUpdate:modelValue': a[2] || (a[2] = (e) => (y.value = e)),
                                    type: (0, h.SU)(V),
                                    isEdit: e.isEdit,
                                    onChangeConnectionSelector: j,
                                  },
                                  null,
                                  8,
                                  ['modelValue', 'type', 'isEdit'],
                                ),
                              ]))
                            : (0, u.kq)('', !0),
                          !e.isCanAdvanced && e.isShowConnectionSelector
                            ? ((0, u.wg)(),
                              (0, u.j4)(
                                b,
                                {
                                  key: 1,
                                  ref_key: 'connectionSelectorRef',
                                  ref: d,
                                  model: c.value,
                                  'label-position': 'top',
                                },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(g, null, {
                                      default: (0, u.w5)(() => [
                                        (0, u.Wm)(
                                          p,
                                          { span: 12 },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, h.SU)(D)
                                                ? ((0, u.wg)(),
                                                  (0, u.j4)(
                                                    o,
                                                    { key: 0, label: t.$t('configuration.connectionSelector') },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          ht,
                                                          {
                                                            modelValue: c.value.connectionSelector,
                                                            'onUpdate:modelValue':
                                                              a[3] || (a[3] = (e) => (c.value.connectionSelector = e)),
                                                            type: (0, h.SU)(V),
                                                            onOnChange: j,
                                                          },
                                                          null,
                                                          8,
                                                          ['modelValue', 'type'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                    8,
                                                    ['label'],
                                                  ))
                                                : (0, u.kq)('', !0),
                                            ]),
                                            _: 1,
                                          },
                                        ),
                                      ]),
                                      _: 1,
                                    }),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['model'],
                              ))
                            : (0, u.kq)('', !0),
                        ]),
                        _: 1,
                      },
                      8,
                      ['modelValue', 'title'],
                    )
                  )
                }
              )
            },
          }
          const sa = na
          var ra = sa
          const ua = { class: 'title' }
          var ia = {
            name: 'FieldTypesSelector',
            props: { modelValue: { type: String, default: () => '' } },
            emits: ['update:modelValue'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { myValue: o, list: n, init: s, loading: r, onChange: i, selectorRef: d } = Ve(l, a),
                c = () =>
                  new Promise((e) => {
                    e(['bigint', 'float', 'string', 'datetime', 'boolean', 'array', 'struct', 'bytea'])
                  })
              return (
                s(c),
                t({ selectorRef: d, init: s, getList: c }),
                (e, t) => {
                  const a = (0, u.up)('el-option'),
                    l = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      l,
                      (0, u.dG)(
                        {
                          ref_key: 'selectorRef',
                          ref: d,
                          modelValue: (0, h.SU)(o),
                          'onUpdate:modelValue': t[0] || (t[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                          'popper-class': 'select-popper',
                          clearable: '',
                        },
                        e.$attrs,
                        { onChange: (0, h.SU)(i) },
                      ),
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              (0, h.SU)(n),
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  a,
                                  { key: e, value: e, label: e },
                                  { default: (0, u.w5)(() => [(0, u._)('span', ua, (0, v.zw)(e), 1)]), _: 2 },
                                  1032,
                                  ['value', 'label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      16,
                      ['modelValue', 'onChange'],
                    )
                  )
                }
              )
            },
          }
          const da = ia
          var ca = da
          ;(0, u.aZ)({
            name: 'ConfKeySelector',
            emits: ['update:modelValue'],
            setup(e, { emit: t }) {
              const { myValue: a, list: l, init: o, loading: n, onChange: s, temSelectorRef: r } = Ve(e, t),
                u = () =>
                  new Promise((e) => {
                    e(['bigint', 'float', 'string', 'datetime', 'boolean', 'struct', 'bytea'])
                  })
              return o(u), { loading: n, myValue: a, list: l, init: o, getList: u, onChange: s, temSelectorRef: r }
            },
          })
          const ma = { class: 'btn-add-container' },
            pa = { key: 0 },
            fa = { class: 'dialog-footer' }
          Boolean, Boolean
          const ha = { class: 'confKey-label-wrap' },
            va = { key: 1 },
            ya = { key: 2 }
          var ga = {
            name: 'SourcePropertiesForm',
            props: {
              modelValue: {
                type: Object,
                default: () => ({ datasource: '', confKey: '', format: 'json', shared: !1 }),
              },
              nodeFlowID: { type: Number, default: null },
              nodeName: { type: String, default: '' },
              nodeSchemaData: { type: Object, default: () => {} },
              isEdit: { type: Boolean, default: !1 },
            },
            emits: ['update:modelValue'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { t: o } = (0, b.QT)(),
                { lang: n, i18nLabel: s } = x(),
                r = (0, h.iH)(null),
                i = (0, h.iH)(null),
                d = (0, h.iH)([
                  { value: !0, label: 'True' },
                  { value: !1, label: 'Flase' },
                ]),
                c = (0, h.iH)(!1),
                m = (0, h.iH)(!1),
                p =
                  ((0, h.iH)(!1),
                  (0, u.Fl)({
                    get: () => l.modelValue,
                    set: (e) => {
                      a('update:modelValue', e)
                    },
                  })),
                f = (0, u.Fl)(() => {
                  const { dataSource: e } = l.nodeSchemaData
                  return e || {}
                }),
                y = () => {
                  const e = { datasource: f.value?.default || '', confKey: '', format: 'json', shared: !1 }
                  p.value = e
                }
              ;(0, u.YP)(
                () => l.nodeFlowID,
                (e) => {
                  e && !Object.keys(l.modelValue).length && y()
                },
                { immediate: !0 },
              )
              const g = () => {
                  p.value.schemaMessage = ''
                },
                w = (e) => {
                  ;(p.value.schemaName = ''), g(), (p.value.delimiter = 'delimited' === e ? ',' : '')
                },
                _ = (e, t) => {
                  ;(c.value = !0), (m.value = 'edit' === e)
                },
                k = (e) => {
                  const { name: t } = e
                  p.value.confKey = t || ''
                  const { getList: a } = i.value
                  i.value.init(a)
                },
                z = async () => {
                  try {
                    const e = await r.value.validate()
                    return Promise.resolve(e)
                  } catch (e) {
                    return S.z8.error(o('common.notCorrectlyForm')), Promise.reject(e)
                  }
                }
              return (
                t({ validateSourceForm: z, setDefaultSourceData: y }),
                (t, a) => {
                  const l = (0, u.up)('QuestionFilled'),
                    o = (0, u.up)('el-icon'),
                    n = (0, u.up)('el-tooltip'),
                    y = (0, u.up)('el-input'),
                    g = (0, u.up)('el-form-item'),
                    b = (0, u.up)('el-button'),
                    S = (0, u.up)('el-radio'),
                    z = (0, u.up)('el-radio-group'),
                    U = (0, u.up)('el-form')
                  return (
                    (0, u.wg)(),
                    (0, u.iD)(
                      u.HY,
                      null,
                      [
                        (0, u.Wm)(
                          U,
                          { ref_key: 'sourcePropertiesFormRef', ref: r, model: (0, h.SU)(p), 'label-position': 'top' },
                          {
                            default: (0, u.w5)(() => [
                              (0, h.SU)(f).label
                                ? ((0, u.wg)(),
                                  (0, u.j4)(
                                    g,
                                    { key: 0, prop: 'datasource', 'show-message': !1 },
                                    {
                                      label: (0, u.w5)(() => [
                                        (0, u.Uk)((0, v.zw)((0, h.SU)(s)((0, h.SU)(f).label)) + ' ', 1),
                                        (0, h.SU)(s)((0, h.SU)(f).hint)
                                          ? ((0, u.wg)(),
                                            (0, u.j4)(
                                              n,
                                              {
                                                key: 0,
                                                'max-width': '250px',
                                                placement: 'top',
                                                content: (0, h.SU)(s)((0, h.SU)(f).hint),
                                              },
                                              {
                                                default: (0, u.w5)(() => [
                                                  (0, u.Wm)(
                                                    o,
                                                    { class: 'field-help' },
                                                    { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ['content'],
                                            ))
                                          : (0, u.kq)('', !0),
                                      ]),
                                      default: (0, u.w5)(() => [
                                        (0, u.Wm)(
                                          y,
                                          {
                                            modelValue: (0, h.SU)(p).datasource,
                                            'onUpdate:modelValue':
                                              a[0] || (a[0] = (e) => ((0, h.SU)(p).datasource = e)),
                                            clearable: '',
                                            placeholder: '',
                                          },
                                          null,
                                          8,
                                          ['modelValue'],
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                  ))
                                : (0, u.kq)('', !0),
                              (0, u.Wm)(
                                g,
                                { prop: 'confKey', 'show-message': !1 },
                                {
                                  label: (0, u.w5)(() => [
                                    (0, u._)('div', ha, [
                                      (0, u._)('span', null, (0, v.zw)(t.$t('configuration.confKey')), 1),
                                      (0, u._)('aside', null, [
                                        (0, u.Wm)(
                                          b,
                                          {
                                            type: 'success',
                                            link: '',
                                            size: 'small',
                                            icon: (0, h.SU)(Se.Plus),
                                            onClick: _,
                                          },
                                          null,
                                          8,
                                          ['icon'],
                                        ),
                                        (0, h.SU)(p).confKey
                                          ? ((0, u.wg)(),
                                            (0, u.j4)(
                                              b,
                                              {
                                                key: 0,
                                                type: 'success',
                                                link: '',
                                                size: 'small',
                                                icon: (0, h.SU)(Se.Edit),
                                                onClick: a[1] || (a[1] = (e) => _('edit')),
                                              },
                                              null,
                                              8,
                                              ['icon'],
                                            ))
                                          : (0, u.kq)('', !0),
                                      ]),
                                    ]),
                                  ]),
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(
                                      Ee,
                                      {
                                        ref_key: 'confKeySelectorRef',
                                        ref: i,
                                        modelValue: (0, h.SU)(p).confKey,
                                        'onUpdate:modelValue': a[2] || (a[2] = (e) => ((0, h.SU)(p).confKey = e)),
                                        category: 'sources',
                                        nodeName: e.nodeName,
                                      },
                                      null,
                                      8,
                                      ['modelValue', 'nodeName'],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              (0, u.Wm)(
                                g,
                                { label: t.$t('streams.format'), prop: 'format', 'show-message': !1 },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(
                                      Te,
                                      {
                                        modelValue: (0, h.SU)(p).format,
                                        'onUpdate:modelValue': a[3] || (a[3] = (e) => ((0, h.SU)(p).format = e)),
                                        onOnChange: w,
                                      },
                                      null,
                                      8,
                                      ['modelValue'],
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['label'],
                              ),
                              'protobuf' === (0, h.SU)(p).format || 'custom' === (0, h.SU)(p).format
                                ? ((0, u.wg)(),
                                  (0, u.iD)('section', va, [
                                    (0, u.Wm)(
                                      g,
                                      { label: t.$t('streams.schemaName'), 'show-message': !1 },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            qe,
                                            {
                                              modelValue: (0, h.SU)(p).schemaName,
                                              'onUpdate:modelValue':
                                                a[4] || (a[4] = (e) => ((0, h.SU)(p).schemaName = e)),
                                              type: (0, h.SU)(p).format,
                                            },
                                            null,
                                            8,
                                            ['modelValue', 'type'],
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['label'],
                                    ),
                                    (0, u.Wm)(
                                      g,
                                      { label: t.$t('streams.schemaMessage'), 'show-message': !1 },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            y,
                                            {
                                              modelValue: (0, h.SU)(p).schemaMessage,
                                              'onUpdate:modelValue':
                                                a[5] || (a[5] = (e) => ((0, h.SU)(p).schemaMessage = e)),
                                              placeholder: '',
                                              type: 'textarea',
                                              autosize: '',
                                            },
                                            null,
                                            8,
                                            ['modelValue'],
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['label'],
                                    ),
                                  ]))
                                : (0, u.kq)('', !0),
                              'delimited' === (0, h.SU)(p).format
                                ? ((0, u.wg)(),
                                  (0, u.iD)('section', ya, [
                                    (0, u.Wm)(
                                      g,
                                      { label: t.$t('streams.delimited'), 'show-message': !1 },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            y,
                                            {
                                              modelValue: (0, h.SU)(p).delimiter,
                                              'onUpdate:modelValue':
                                                a[6] || (a[6] = (e) => ((0, h.SU)(p).delimiter = e)),
                                              placeholder: '',
                                            },
                                            null,
                                            8,
                                            ['modelValue'],
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['label'],
                                    ),
                                  ]))
                                : (0, u.kq)('', !0),
                              (0, u.Wm)(
                                g,
                                { label: t.$t('streams.shared'), prop: 'shared', 'show-message': !1 },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(
                                      z,
                                      {
                                        modelValue: (0, h.SU)(p).shared,
                                        'onUpdate:modelValue': a[7] || (a[7] = (e) => ((0, h.SU)(p).shared = e)),
                                      },
                                      {
                                        default: (0, u.w5)(() => [
                                          ((0, u.wg)(!0),
                                          (0, u.iD)(
                                            u.HY,
                                            null,
                                            (0, u.Ko)(
                                              d.value,
                                              (e) => (
                                                (0, u.wg)(),
                                                (0, u.j4)(
                                                  S,
                                                  { key: e.value, label: e.value },
                                                  {
                                                    default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.label), 1)]),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  ['label'],
                                                )
                                              ),
                                            ),
                                            128,
                                          )),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['modelValue'],
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['label'],
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['model'],
                        ),
                        (0, u.Wm)(
                          ra,
                          {
                            modelValue: c.value,
                            'onUpdate:modelValue': a[8] || (a[8] = (e) => (c.value = e)),
                            category: 'sources',
                            type: e.nodeName,
                            confKeyName: (0, h.SU)(p).confKey,
                            'is-edit': m.value,
                            isShowConnectionSelector: !0,
                            onSubmit: k,
                          },
                          null,
                          8,
                          ['modelValue', 'type', 'confKeyName', 'is-edit'],
                        ),
                      ],
                      64,
                    )
                  )
                }
              )
            },
          }
          const wa = (0, d.Z)(ga, [['__scopeId', 'data-v-74ac1bf5']])
          var ba = wa
          const Sa = { class: 'confKey-label-wrap' }
          var _a = {
            name: 'SinkPropertiesForm',
            props: {
              modelValue: { type: Object, default: () => {} },
              properties: { type: Array, default: () => [] },
              nodeFlowID: { type: Number, default: null },
              nodeName: { type: String, default: '' },
              isEdit: { type: Boolean, default: !1 },
            },
            emits: ['update:modelValue'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { t: o } = (0, b.QT)(),
                n = (0, h.iH)(null),
                s = (0, h.iH)(null),
                r = (0, h.iH)(null),
                i = (0, h.iH)(null),
                d = (0, h.iH)(!1),
                c = (0, h.iH)(!1),
                m = (0, u.Fl)({
                  get: () => l.modelValue,
                  set: (e) => {
                    a('update:modelValue', e)
                  },
                }),
                p = (e, t) => {
                  ;(d.value = !0), (c.value = 'edit' === e)
                },
                f = (e) => {
                  const { name: t } = e
                  m.value.resourceId = t || ''
                  const { getList: a } = i.value
                  i.value.init(a), g(t)
                },
                y = (e, t) => {
                  const a = t || l.nodeName,
                    o = (0, aa.zE)(a, e),
                    { resourceId: n } = e
                  m.value = { ...o, resourceId: n || m.value.resourceId }
                },
                g = (e) => {
                  e &&
                    xe('sinks', l.nodeName).then((t) => {
                      const { data: a } = t
                      if (Object.keys(a).length) {
                        const t = a[e]
                        y(t, l.nodeName)
                      }
                    })
                },
                w = (e) => {
                  l.nodeName &&
                    xe('connections', l.nodeName).then((t) => {
                      const { data: a } = t,
                        l = a[e]
                      m.value = { ...m.value, ...l }
                    })
                },
                _ = async () => {
                  try {
                    const e = await n.value.validate(),
                      { validatePropertiesForm: t } = s.value || {},
                      a = !t || (await t()),
                      { validateAdvancedForm: l } = r.value,
                      o = await l()
                    return e && a && o ? Promise.resolve(!0) : Promise.reject($t('common.fillContent'))
                  } catch (e) {
                    return S.z8.error(o('common.notCorrectlyForm')), Promise.reject(e)
                  }
                }
              return (
                t({ validateSinkForm: _ }),
                (t, a) => {
                  const l = (0, u.up)('el-button'),
                    o = (0, u.up)('el-form-item'),
                    y = (0, u.up)('el-form')
                  return (
                    (0, u.wg)(),
                    (0, u.iD)('section', null, [
                      (0, u.Wm)(
                        y,
                        { ref_key: 'sinkPropertiesFormRef', ref: n, model: (0, h.SU)(m), 'label-position': 'top' },
                        {
                          default: (0, u.w5)(() => [
                            (0, u.Wm)(
                              o,
                              { prop: 'confKey', 'show-message': !1 },
                              {
                                label: (0, u.w5)(() => [
                                  (0, u._)('div', Sa, [
                                    (0, u._)('span', null, (0, v.zw)(t.$t('configuration.confKey')), 1),
                                    (0, u._)('aside', null, [
                                      (0, u.Wm)(
                                        l,
                                        {
                                          type: 'success',
                                          link: '',
                                          size: 'small',
                                          icon: (0, h.SU)(Se.Plus),
                                          onClick: p,
                                        },
                                        null,
                                        8,
                                        ['icon'],
                                      ),
                                      (0, h.SU)(m).resourceId
                                        ? ((0, u.wg)(),
                                          (0, u.j4)(
                                            l,
                                            {
                                              key: 0,
                                              type: 'success',
                                              link: '',
                                              size: 'small',
                                              icon: (0, h.SU)(Se.Edit),
                                              onClick: a[0] || (a[0] = (e) => p('edit')),
                                            },
                                            null,
                                            8,
                                            ['icon'],
                                          ))
                                        : (0, u.kq)('', !0),
                                    ]),
                                  ]),
                                ]),
                                default: (0, u.w5)(() => [
                                  (0, u.Wm)(
                                    Ee,
                                    {
                                      ref_key: 'confKeySelectorRef',
                                      ref: i,
                                      modelValue: (0, h.SU)(m).resourceId,
                                      'onUpdate:modelValue': a[1] || (a[1] = (e) => ((0, h.SU)(m).resourceId = e)),
                                      category: 'sinks',
                                      nodeName: e.nodeName,
                                      onOnChange: g,
                                    },
                                    null,
                                    8,
                                    ['modelValue', 'nodeName'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['model'],
                      ),
                      e.properties.length
                        ? ((0, u.wg)(),
                          (0, u.j4)(
                            ct,
                            {
                              key: 0,
                              ref_key: 'propertiesFormRef',
                              ref: s,
                              modelValue: (0, h.SU)(m),
                              'onUpdate:modelValue': a[2] || (a[2] = (e) => ((0, h.dq)(m) ? (m.value = e) : null)),
                              properties: e.properties,
                              nodeId: e.nodeFlowID,
                              nodeName: e.nodeName,
                            },
                            null,
                            8,
                            ['modelValue', 'properties', 'nodeId', 'nodeName'],
                          ))
                        : (0, u.kq)('', !0),
                      (0, u.Wm)(
                        ta,
                        {
                          ref_key: 'advanceFormRef',
                          ref: r,
                          modelValue: (0, h.SU)(m),
                          'onUpdate:modelValue': a[3] || (a[3] = (e) => ((0, h.dq)(m) ? (m.value = e) : null)),
                          type: e.nodeName,
                          isEdit: e.isEdit,
                          colItemSpan: 24,
                          onChangeConnectionSelector: w,
                        },
                        null,
                        8,
                        ['modelValue', 'type', 'isEdit'],
                      ),
                      (0, u.Wm)(
                        ra,
                        {
                          modelValue: d.value,
                          'onUpdate:modelValue': a[4] || (a[4] = (e) => (d.value = e)),
                          category: 'sinks',
                          type: e.nodeName,
                          confKeyName: (0, h.SU)(m).resourceId,
                          'is-edit': c.value,
                          isCanAdvanced: !0,
                          onSubmit: f,
                        },
                        null,
                        8,
                        ['modelValue', 'type', 'confKeyName', 'is-edit'],
                      ),
                    ])
                  )
                }
              )
            },
          }
          const ka = (0, d.Z)(_a, [['__scopeId', 'data-v-54e7135a']])
          var za = ka
          const Ua = { class: 'schema-form' },
            Va = { class: 'schema-form-desc' },
            Ca = { key: 0, class: 'section-source' },
            Da = { key: 1, class: 'section-sink' },
            Wa = { key: 2, class: 'section-properties' },
            Ta = { key: 1, class: 'no-config' },
            ja = { key: 0, class: 'schema-footer' }
          var xa = {
            name: 'SchemaForm',
            props: { node: { type: Object, required: !0 } },
            setup(e) {
              const t = e,
                { t: a } = (0, b.QT)(),
                l = (0, w.oR)(),
                { lang: o, i18nLabel: n } = x(),
                s = (0, u.FN)().appContext.app._context.config.globalProperties.$df,
                r = (0, h.iH)([]),
                i = (0, h.iH)(''),
                d = (0, h.iH)({}),
                c = (0, h.iH)({}),
                m = (0, h.iH)(!1),
                p = (0, h.iH)(null),
                f = (0, h.iH)(null),
                y = (0, h.iH)(null),
                g = (0, u.Fl)(() => t.node.id),
                _ = (0, u.Fl)(() => t.node.data?.name),
                k = (0, u.Fl)(() => t.node.data?.group),
                U = (0, u.Fl)(() => 'source' === k.value),
                V = (0, u.Fl)(() => 'switch' === String(_.value).toLocaleLowerCase()),
                C = (0, u.Fl)(() => l.state.nodesSchema[k.value] || {}),
                D = (0, u.Fl)(() => C.value[_.value] || {}),
                W = () => {
                  const e = t.node.data.properties || [],
                    a = e.reduce((e, t) => {
                      let a
                      if (void 0 !== t.default) a = t.default
                      else {
                        const { type: e, control: l } = t
                        switch (e) {
                          case 'string':
                            a = 'list' === l ? [] : ''
                            break
                          case 'array':
                            a = []
                            break
                          case 'list_string':
                            a = []
                            break
                          default:
                            a = void 0
                            break
                        }
                      }
                      return { ...e, [t.name]: a }
                    }, {})
                  return a
                }
              ;(0, u.YP)(
                () => t.node,
                () => {
                  if (t.node.data) {
                    const { record: e, properties: a, schemaDesc: l } = t.node.data
                    ;(r.value = (a || []).filter((e) => 'connectionSelector' !== e.name) || []),
                      (i.value = n.value(l)),
                      (m.value = !!e)
                    const o = (0, aa.zE)(_.value, e)
                    U.value ? ((d.value = {}), (c.value = o || {})) : (d.value = o || W())
                  } else (r.value = []), (i.value = ''), (c.value = {})
                },
                { deep: !0, immediate: !0 },
              )
              const j = () => {
                  U.value ? ((d.value = {}), p.value.setDefaultSourceData()) : ((d.value = W()), (c.value = {}))
                },
                N = (e, t) => {
                  if (e < t) {
                    const a = t - e
                    for (let e = 0; e < a; e++) s.value.addNodeOutput(g.value)
                  } else if (e > t) {
                    let a = null
                    0 === t ? e > 1 && (a = e - 1) : (a = e - t)
                    for (let t = 0; t < a; t++) {
                      const a = 'output_' + (e - t)
                      s.value.removeNodeOutput(g.value, a)
                    }
                  }
                },
                $ = async () => {
                  try {
                    const { validateSourceForm: e } = p.value || {},
                      { validateSinkForm: t } = f.value || {},
                      { validatePropertiesForm: a } = y.value || {}
                    return e && (await e()), t && (await t()), a && (await a()), Promise.resolve(!0)
                  } catch (e) {
                    return console.error('error', e), Promise.reject(e)
                  }
                },
                I = async () => {
                  try {
                    await $()
                    const e = t.node.data,
                      l = s.value.getNodeFromId(g.value)
                    let o = (0, z.cloneDeep)(d.value)
                    if (U.value) o = { ...o, ...c.value }
                    else if (V.value && 'operator' === k.value) {
                      const e = 'cases',
                        t = (r.value || []).find(({ name: t }) => t === e),
                        { type: a, control: n } = t || {}
                      if ('list' === n && 'string' === a) {
                        let t = o[e]
                        const a = T(t)
                        o[e] = a
                        const n = t.length,
                          { outputs: s } = l,
                          r = Object.keys(s),
                          u = r.length
                        N(u, n)
                      }
                    }
                    ;(o = (0, aa.zE)(_.value, o)),
                      s.value.updateNodeDataFromId(t.node.id, { ...e, record: o }),
                      S.z8.success(a('common.saveConfigurationSuccess'))
                  } catch (e) {
                    console.error('error', e)
                  }
                }
              return (e, t) => {
                const a = (0, u.up)('el-button')
                return (
                  (0, u.wg)(),
                  (0, u.iD)(
                    u.HY,
                    null,
                    [
                      (0, u._)('article', Ua, [
                        (0, u._)('p', Va, (0, v.zw)(i.value), 1),
                        'source' === (0, h.SU)(k)
                          ? ((0, u.wg)(),
                            (0, u.iD)('section', Ca, [
                              'source' === (0, h.SU)(k)
                                ? ((0, u.wg)(),
                                  (0, u.j4)(
                                    ba,
                                    {
                                      key: 0,
                                      ref_key: 'sourceFormRef',
                                      ref: p,
                                      modelValue: c.value,
                                      'onUpdate:modelValue': t[0] || (t[0] = (e) => (c.value = e)),
                                      nodeFlowID: (0, h.SU)(g),
                                      nodeName: (0, h.SU)(_),
                                      nodeSchemaData: (0, h.SU)(D),
                                      isEdit: m.value,
                                    },
                                    null,
                                    8,
                                    ['modelValue', 'nodeFlowID', 'nodeName', 'nodeSchemaData', 'isEdit'],
                                  ))
                                : (0, u.kq)('', !0),
                            ]))
                          : 'sink' === (0, h.SU)(k)
                          ? ((0, u.wg)(),
                            (0, u.iD)('section', Da, [
                              (0, u.Wm)(
                                za,
                                {
                                  ref_key: 'sinkPropertiesFormRef',
                                  ref: f,
                                  modelValue: d.value,
                                  'onUpdate:modelValue': t[1] || (t[1] = (e) => (d.value = e)),
                                  properties: r.value,
                                  nodeId: (0, h.SU)(g),
                                  nodeName: (0, h.SU)(_),
                                  isEdit: m.value,
                                },
                                null,
                                8,
                                ['modelValue', 'properties', 'nodeId', 'nodeName', 'isEdit'],
                              ),
                            ]))
                          : ((0, u.wg)(),
                            (0, u.iD)('section', Wa, [
                              r.value.length
                                ? ((0, u.wg)(),
                                  (0, u.j4)(
                                    ct,
                                    {
                                      key: 0,
                                      ref_key: 'propertiesFormRef',
                                      ref: y,
                                      modelValue: d.value,
                                      'onUpdate:modelValue': t[2] || (t[2] = (e) => (d.value = e)),
                                      properties: r.value,
                                      nodeId: (0, h.SU)(g),
                                      nodeName: (0, h.SU)(_),
                                      isEdit: m.value,
                                    },
                                    null,
                                    8,
                                    ['modelValue', 'properties', 'nodeId', 'nodeName', 'isEdit'],
                                  ))
                                : ((0, u.wg)(), (0, u.iD)('p', Ta, (0, v.zw)(e.$t('common.noConfigurationItems')), 1)),
                            ])),
                      ]),
                      r.value.length || 'source' === (0, h.SU)(k)
                        ? ((0, u.wg)(),
                          (0, u.iD)('footer', ja, [
                            (0, u.Wm)(
                              a,
                              { plain: '', type: 'primary', htmlType: 'submit', class: 'btn btn-reset', onClick: j },
                              { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.$t('common.reset')), 1)]), _: 1 },
                            ),
                            (0, u.Wm)(
                              a,
                              { type: 'primary', htmlType: 'submit', class: 'btn btn-submit', onClick: I },
                              { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.$t('common.save')), 1)]), _: 1 },
                            ),
                          ]))
                        : (0, u.kq)('', !0),
                    ],
                    64,
                  )
                )
              }
            },
          }
          const Na = (0, d.Z)(xa, [['__scopeId', 'data-v-b64bb3ce']])
          var $a = Na
          const Ia = { class: 'flow-config-card' },
            Fa = { class: 'config-header' },
            Aa = { class: 'config-body' }
          var Ea = {
            name: 'ConfigCard',
            props: { node: { type: Object, required: !0 } },
            emits: ['save', 'upload', 'update', 'restore', 'exportData', 'importData'],
            setup(e, { emit: t }) {
              const a = e,
                { t: l } = (0, b.QT)(),
                { i18nLabel: o } = x(),
                n = (0, h.iH)(''),
                s = (0, h.iH)('16'),
                r = (0, h.iH)('#ffffff')
              ;(0, u.YP)(
                () => a.node,
                () => {
                  const e = a.node?.data?.label || l('node.noNodeToConfig')
                  n.value = o.value(e)
                },
                { immediate: !0 },
              )
              const i = () => {
                  t('save')
                },
                d = () => {
                  t('upload')
                },
                c = () => {
                  t('update')
                },
                m = () => {
                  t('restore')
                },
                p = () => {
                  t('exportData')
                },
                f = () => {
                  t('uploadData')
                },
                y = async (e) => {
                  try {
                    const a = await D(e)
                    t('importData', JSON.parse(a))
                  } catch (a) {}
                  return Promise.reject()
                }
              return (t, a) => {
                const l = (0, u.up)('UploadFilled'),
                  o = (0, u.up)('el-icon'),
                  h = (0, u.up)('el-tooltip'),
                  g = (0, u.up)('Refresh'),
                  w = (0, u.up)('DocumentAdd'),
                  b = (0, u.up)('RefreshRight'),
                  S = (0, u.up)('Download'),
                  _ = (0, u.up)('Upload'),
                  k = (0, u.up)('el-upload')
                return (
                  (0, u.wg)(),
                  (0, u.iD)('div', Ia, [
                    (0, u._)('div', Fa, [
                      (0, u._)('a', { onClick: d }, [
                        (0, u.Wm)(
                          h,
                          { class: 'box-item', effect: 'dark', content: t.$t('common.submitData') },
                          {
                            default: (0, u.w5)(() => [
                              (0, u.Wm)(
                                o,
                                { size: s.value, color: r.value },
                                { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                8,
                                ['size', 'color'],
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['content'],
                        ),
                      ]),
                      (0, u._)('a', { class: 'icon-item', onClick: c }, [
                        (0, u.Wm)(
                          h,
                          { class: 'box-item', effect: 'dark', content: t.$t('common.update') },
                          {
                            default: (0, u.w5)(() => [
                              (0, u.Wm)(
                                o,
                                { size: s.value, color: r.value },
                                { default: (0, u.w5)(() => [(0, u.Wm)(g)]), _: 1 },
                                8,
                                ['size', 'color'],
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['content'],
                        ),
                      ]),
                      (0, u._)('a', { class: 'icon-item', onClick: i }, [
                        (0, u.Wm)(
                          h,
                          { class: 'box-item', effect: 'dark', content: t.$t('common.saveToBrowser') },
                          {
                            default: (0, u.w5)(() => [
                              (0, u.Wm)(
                                o,
                                { size: s.value, color: r.value },
                                { default: (0, u.w5)(() => [(0, u.Wm)(w)]), _: 1 },
                                8,
                                ['size', 'color'],
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['content'],
                        ),
                      ]),
                      (0, u._)('a', { class: 'icon-item', onClick: m }, [
                        (0, u.Wm)(
                          h,
                          { class: 'box-item', effect: 'dark', content: t.$t('common.recoverSavedToBrowser') },
                          {
                            default: (0, u.w5)(() => [
                              (0, u.Wm)(
                                o,
                                { size: s.value, color: r.value },
                                { default: (0, u.w5)(() => [(0, u.Wm)(b)]), _: 1 },
                                8,
                                ['size', 'color'],
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['content'],
                        ),
                      ]),
                      (0, u._)('a', { class: 'icon-item', onClick: p }, [
                        (0, u.Wm)(
                          h,
                          { class: 'box-item', effect: 'dark', content: t.$t('common.exportDataToLocal') },
                          {
                            default: (0, u.w5)(() => [
                              (0, u.Wm)(
                                o,
                                { size: s.value, color: r.value },
                                { default: (0, u.w5)(() => [(0, u.Wm)(S)]), _: 1 },
                                8,
                                ['size', 'color'],
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['content'],
                        ),
                      ]),
                      (0, u._)('a', { class: 'icon-item', onClick: f }, [
                        (0, u.Wm)(
                          h,
                          { class: 'box-item', effect: 'dark', content: t.$t('common.uploadLocalData') },
                          {
                            default: (0, u.w5)(() => [
                              (0, u.Wm)(
                                k,
                                { 'before-upload': y, accept: '.json', 'show-file-list': !1 },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(
                                      o,
                                      { size: s.value, color: r.value },
                                      { default: (0, u.w5)(() => [(0, u.Wm)(_)]), _: 1 },
                                      8,
                                      ['size', 'color'],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['content'],
                        ),
                      ]),
                    ]),
                    (0, u._)('div', Aa, [
                      (0, u._)(
                        'div',
                        { class: (0, v.C_)(['config-title', { 'has-bg': e.node.data && e.node.data.label }]) },
                        (0, v.zw)(n.value),
                        3,
                      ),
                      (0, u.Wm)($a, { node: e.node }, null, 8, ['node']),
                    ]),
                  ])
                )
              }
            },
          }
          const Pa = (0, d.Z)(Ea, [['__scopeId', 'data-v-c84bcc10']])
          var Ra = Pa
          const Ha = [
              { id: 'source', name: 'source', label: 'node.dataSources', children: [] },
              { id: 'function', name: 'function', label: 'node.dataProcessing', children: [] },
              { id: 'functionAggregate', name: 'functionAggregate', label: 'node.aggregateData', children: [] },
              { id: 'operator', name: 'operator', label: 'node.operators', children: [] },
              { id: 'sink', name: 'sink', label: 'node.transportAndStorage', children: [] },
            ],
            Oa = { class: 'label' },
            qa = { class: 'label' },
            La = { name: 'MenuTree' }
          var Ma = Object.assign(La, {
            props: { menuData: { type: Array, default: [] }, openeds: { type: Array, default: [] } },
            setup(e) {
              const t = e,
                { i18nLabel: a } = x(),
                l = (e, t) => {
                  e.dataTransfer.setData('getNodeName', t.name),
                    e.dataTransfer.setData('getNodeLabel', JSON.stringify(t.label || {})),
                    e.dataTransfer.setData('getNodeType', t.type),
                    e.dataTransfer.setData('getNodeTrueType', t.trueType),
                    e.dataTransfer.setData('getNodeNodeType', t.nodeType),
                    e.dataTransfer.setData('getNodeGroup', t.group),
                    (e.dataTransfer.effectAllowed = 'move')
                },
                o = '-',
                n = ({ id: e }) => {
                  if (!e) return ''
                  const t = -1 === e.indexOf(o) ? 1 : Array.from(e).filter((e) => e === o).length + 1
                  return `level-${t}`
                },
                s = (0, u.Fl)(() => (e) => {
                  const a = t.openeds.includes(e)
                  return a
                })
              return (t, o) => {
                const r = (0, u.up)('el-icon'),
                  i = (0, u.up)('menu-tree', !0),
                  d = (0, u.up)('el-sub-menu'),
                  c = (0, u.up)('el-menu-item')
                return (
                  (0, u.wg)(),
                  (0, u.iD)('div', null, [
                    ((0, u.wg)(!0),
                    (0, u.iD)(
                      u.HY,
                      null,
                      (0, u.Ko)(
                        e.menuData,
                        (o) => (
                          (0, u.wg)(),
                          (0, u.iD)(
                            u.HY,
                            null,
                            [
                              o.children
                                ? ((0, u.wg)(),
                                  (0, u.j4)(
                                    d,
                                    { key: o.id, index: o.id, class: (0, v.C_)(n(o)) },
                                    {
                                      title: (0, u.w5)(() => [
                                        (0, u.Wm)(
                                          r,
                                          { class: 'sub-menu-item-icon' },
                                          {
                                            default: (0, u.w5)(() => [
                                              (0, h.SU)(s)(o.id)
                                                ? ((0, u.wg)(), (0, u.j4)((0, h.SU)(Se.CaretTop), { key: 0 }))
                                                : ((0, u.wg)(), (0, u.j4)((0, h.SU)(Se.CaretBottom), { key: 1 })),
                                            ]),
                                            _: 2,
                                          },
                                          1024,
                                        ),
                                        (0, u._)('span', Oa, (0, v.zw)(t.$t(`${o.label}`)), 1),
                                      ]),
                                      default: (0, u.w5)(() => [
                                        (0, u.Wm)(i, { menuData: o.children, openeds: e.openeds }, null, 8, [
                                          'menuData',
                                          'openeds',
                                        ]),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['index', 'class'],
                                  ))
                                : ((0, u.wg)(),
                                  (0, u.j4)(
                                    c,
                                    {
                                      key: o.id + 'key',
                                      index: o.id,
                                      draggable: 'true',
                                      onDragstart: (e) => l(e, o),
                                      class: 'dbnode',
                                    },
                                    {
                                      title: (0, u.w5)(() => [
                                        (0, u._)('span', qa, (0, v.zw)((0, h.SU)(a)(o.label)), 1),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['index', 'onDragstart'],
                                  )),
                            ],
                            64,
                          )
                        ),
                      ),
                      256,
                    )),
                  ])
                )
              }
            },
          })
          const Ka = (0, d.Z)(Ma, [['__scopeId', 'data-v-647f8166']])
          var Ya = Ka
          class Ba {
            constructor(e, t) {
              return {
                id: t?.name,
                name: t?.name,
                label: t?.node?.label || { zh: t?.name, en: t?.name },
                category: t?.node?.category,
                nodeType: this._nodeType(e, t),
                trueType: _(e)[1],
                type: _(e)[2],
                group: _(e)[3],
                node: { ...t, nodeType: this._nodeType(e, t) },
              }
            }
            _nodeType(e, t) {
              return t?.nodeType || _(e)[0]
            }
          }
          const Ga = { class: 'flow-sidebar' }
          var Za = {
            name: 'FlowSidebar',
            setup(e) {
              const t = (0, h.iH)([]),
                a = (0, h.iH)(!1),
                o = (0, h.iH)({}),
                n = (0, h.iH)({}),
                s = (0, h.iH)({}),
                r = (0, h.iH)({}),
                i = (0, h.iH)({}),
                d = ((0, h.iH)({}), (0, h.iH)(['source'])),
                c = (0, h.iH)([...d.value]),
                m = (e) => {
                  c.value.push(e)
                },
                p = (e) => {
                  const t = c.value.findIndex((t) => t === e)
                  c.value.splice(t, 1)
                }
              Promise &&
                !Promise.allSettled &&
                (Promise.allSettled = (e) =>
                  Promise.all(
                    e.map((e) =>
                      e
                        .then((e) => ({ state: 'fulfilled', value: e }))
                        .catch((e) => ({ state: 'rejected', reason: e })),
                    ),
                  ))
              const f = (e, t, a) =>
                  new Promise(async (l, o) => {
                    const n = ['source', 'sink'],
                      s = {}
                    await Promise.all(t)
                      .then((t) => {
                        const o = t || []
                        o.forEach((t, l) => {
                          const { data: o } = t,
                            r = a[l].name,
                            u = n.includes(e) ? r : e,
                            i = { ...o, nodeType: u }
                          s[r] = i
                        }),
                          l(s)
                      })
                      .catch((e) => {
                        console.error('error', e), o(e)
                      })
                  }),
                v = async () => {
                  try {
                    const e = await je('sources'),
                      t = e.data || [],
                      a = t.map(async (e) => je('sources', e.name)),
                      l = await f('source', a, t)
                    return Promise.resolve(l)
                  } catch (e) {
                    return Promise.reject(e)
                  }
                },
                y = async () => {
                  try {
                    const { data: e } = await je('sinks'),
                      t = e || [],
                      a = t.map(async (e) => je('sinks', e.name)),
                      l = await f('sink', a, t)
                    return Promise.resolve(l)
                  } catch (e) {
                    return Promise.reject(e)
                  }
                },
                g = async () => {
                  try {
                    const { data: e } = await je('functions'),
                      t = e || [],
                      a = {}
                    return (
                      t.forEach((e) => {
                        const { about: t, functions: l } = e,
                          o = l || []
                        o.forEach((e) => {
                          const { aggregate: l, name: o, node: n, outputs: s, inputs: r } = e,
                            { category: u, ...i } = n || {},
                            d = l ? 'functionAggregate' : u,
                            c = { ...i, category: d },
                            m = {
                              about: t,
                              functions: [{ ...e }],
                              node: c,
                              nodeType: _('function')[0],
                              outputs: s,
                              inputs: r,
                            }
                          a[o] = m
                        })
                      }),
                      Promise.resolve(a)
                    )
                  } catch (e) {
                    return console.error('error', e), Promise.reject(e)
                  }
                },
                w = async () => {
                  try {
                    const { data: e } = await je('operators'),
                      t = e || [],
                      a = {}
                    return (
                      t.forEach((e) => {
                        const { name: t } = e
                        a[t] = { ...e, nodeType: t }
                      }),
                      Promise.resolve(a)
                    )
                  } catch (e) {
                    return Promise.reject(e)
                  }
                },
                b = async () => {
                  t.value = {}
                  let e = []
                  const a = Object.keys(o.value)
                  a.forEach((t) => {
                    const a = o.value[t],
                      l = Object.entries(a).map(([e, a]) => new Ba(t, { ...a, name: e }))
                    e = [...e, ...l]
                  })
                  const l = [...Ha, ...e]
                  t.value = E(l, 'category')
                },
                S = () => {
                  ;(n.value = {}),
                    (r.value = {}),
                    (s.value = {}),
                    (i.value = {}),
                    (o.value = {}),
                    l.Z.commit('setNodesSchema', o.value)
                },
                k = async () => {
                  try {
                    ;(a.value = !0),
                      S(),
                      await Promise.allSettled([v(), y(), g(), w()]).then((e) => {
                        ;(n.value = e[0]?.value || {}),
                          (r.value = e[1]?.value || {}),
                          (s.value = e[2]?.value || {}),
                          (i.value = e[3]?.value || {}),
                          (o.value['source'] = n.value),
                          (o.value['sink'] = r.value),
                          (o.value['function'] = s.value),
                          (o.value['operator'] = i.value),
                          l.Z.commit('setNodesSchema', o.value)
                      }),
                      await b()
                  } finally {
                    a.value = !1
                  }
                }
              return (
                k(),
                (e, l) => {
                  const o = (0, u.up)('el-menu'),
                    n = (0, u.Q2)('loading')
                  return (0, u.wy)(
                    ((0, u.wg)(),
                    (0, u.iD)('div', Ga, [
                      (0, u.Wm)(
                        o,
                        { 'default-openeds': d.value, onOpen: m, onClose: p },
                        {
                          default: (0, u.w5)(() => [
                            (0, u.Wm)(Ya, { menuData: t.value, openeds: c.value }, null, 8, ['menuData', 'openeds']),
                          ]),
                          _: 1,
                        },
                        8,
                        ['default-openeds'],
                      ),
                    ])),
                    [[n, a.value]],
                  )
                }
              )
            },
          }
          const Qa = (0, d.Z)(Za, [['__scopeId', 'data-v-4e47a994']])
          var Ja = Qa,
            Xa = a(8350),
            el = () => {
              const e = (0, r.yj)(),
                t = (0, u.Fl)(() => {
                  const { query: t } = e
                  return t.name || ''
                }),
                a = (0, u.Fl)(() => {
                  const { query: t } = e
                  return t.id || ''
                })
              return { currentRuleName: t, currentRuleId: a }
            },
            tl = {
              name: 'RadioGroup',
              props: {
                modelValue: { type: [String, Boolean], default: null },
                options: {
                  type: Array,
                  default: () => [
                    { value: !0, label: 'common.true' },
                    { value: !1, label: 'common.false' },
                  ],
                },
              },
              emits: ['update:modelValue'],
              setup(e, { emit: t }) {
                const a = e,
                  l = (0, u.Fl)({
                    get: () => a.modelValue,
                    set: (e) => {
                      t('update:modelValue', e)
                    },
                  })
                return (t, a) => {
                  const o = (0, u.up)('el-radio'),
                    n = (0, u.up)('el-radio-group')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      n,
                      {
                        modelValue: (0, h.SU)(l),
                        'onUpdate:modelValue': a[0] || (a[0] = (e) => ((0, h.dq)(l) ? (l.value = e) : null)),
                      },
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              e.options,
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  o,
                                  { key: e.value, label: e.value },
                                  { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(t.$t(`${e.label}`)), 1)]), _: 2 },
                                  1032,
                                  ['label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      8,
                      ['modelValue'],
                    )
                  )
                }
              },
            }
          const al = tl
          var ll = al,
            ol = {
              name: 'FormItemTooltipLabel',
              props: {
                label: { type: String, default: '' },
                prop: { type: String, default: null },
                tooltipContent: { type: String, default: '' },
              },
              setup(e) {
                return (t, a) => {
                  const l = (0, u.up)('QuestionFilled'),
                    o = (0, u.up)('el-icon'),
                    n = (0, u.up)('el-tooltip'),
                    s = (0, u.up)('el-form-item')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      s,
                      { prop: e.prop },
                      {
                        label: (0, u.w5)(() => [
                          (0, u.Uk)((0, v.zw)(e.label) + ' ', 1),
                          (0, u.Wm)(
                            n,
                            { 'max-width': '250px', placement: 'top', content: e.tooltipContent },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(
                                  o,
                                  { class: 'field-help' },
                                  { default: (0, u.w5)(() => [(0, u.Wm)(l)]), _: 1 },
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['content'],
                          ),
                        ]),
                        default: (0, u.w5)(() => [(0, u.WI)(t.$slots, 'content')]),
                        _: 3,
                      },
                      8,
                      ['prop'],
                    )
                  )
                }
              },
            }
          const nl = (0, d.Z)(ol, [['__scopeId', 'data-v-55438076']])
          var sl = nl
          const rl = { class: 'title' }
          var ul = {
            name: 'QosSelector',
            props: { modelValue: { type: Number, default: () => '' } },
            emits: ['update:modelValue', 'onChange'],
            setup(e, { expose: t, emit: a }) {
              const l = e,
                { myValue: o, list: n, init: s, loading: r, onChange: i, selectorRef: d } = Ve(l, a),
                c = () =>
                  new Promise((e, t) => {
                    e([0, 1, 2])
                  })
              return (
                s(c),
                t({ init: s, getList: c }),
                (e, t) => {
                  const a = (0, u.up)('el-option'),
                    l = (0, u.up)('el-select')
                  return (
                    (0, u.wg)(),
                    (0, u.j4)(
                      l,
                      (0, u.dG)(
                        {
                          ref_key: 'selectorRef',
                          ref: d,
                          modelValue: (0, h.SU)(o),
                          'onUpdate:modelValue': t[0] || (t[0] = (e) => ((0, h.dq)(o) ? (o.value = e) : null)),
                          'popper-class': 'select-popper',
                          clearable: '',
                        },
                        e.$attrs,
                        { onChange: (0, h.SU)(i) },
                      ),
                      {
                        default: (0, u.w5)(() => [
                          ((0, u.wg)(!0),
                          (0, u.iD)(
                            u.HY,
                            null,
                            (0, u.Ko)(
                              (0, h.SU)(n),
                              (e) => (
                                (0, u.wg)(),
                                (0, u.j4)(
                                  a,
                                  { key: e, value: e, label: e },
                                  { default: (0, u.w5)(() => [(0, u._)('span', rl, (0, v.zw)(String(e)), 1)]), _: 2 },
                                  1032,
                                  ['value', 'label'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                        _: 1,
                      },
                      16,
                      ['modelValue', 'onChange'],
                    )
                  )
                }
              )
            },
          }
          const il = ul
          var dl = il
          const cl = { key: 1, class: 'block-submitted' },
            ml = { class: 'text-suc' },
            pl = { class: 'dialog-footer' }
          var fl = {
            name: 'CreateOrEditRuleDialog',
            props: { dialogVisible: { type: Boolean, default: !1 }, submitMethod: { type: Function, required: !0 } },
            emits: ['update:dialogVisible'],
            setup(e, { emit: t }) {
              const a = e,
                l = (0, r.tv)(),
                { t: o } = (0, b.QT)(),
                { currentRuleId: n } = el(),
                s = (0, h.iH)(null),
                i = (0, h.iH)({
                  id: '',
                  name: '',
                  isEventTime: null,
                  sendMetaToSink: null,
                  lateTolerance: null,
                  concurrency: null,
                  bufferLength: null,
                  qos: null,
                  checkpointInterval: null,
                  attempts: null,
                  delay: null,
                  maxDelay: null,
                  multiplier: null,
                  jitterFactor: null,
                }),
                d = (0, h.iH)(!1),
                c = (0, h.iH)(!1),
                m = (0, h.iH)(!1),
                p = (0, u.Fl)({
                  get: () => a.dialogVisible,
                  set: (e) => {
                    t('update:dialogVisible', e)
                  },
                }),
                f = (0, u.Fl)(() => n.value),
                y = (0, u.Fl)(() => (f.value ? o('rules.editRule') : o('rules.createRule'))),
                g = (0, u.Fl)(() => (f.value ? o('common.updateSuccess') : o('common.createSuccess'))),
                w = (0, u.Fl)(() => ({
                  id: [{ required: !0, message: o('validate.emptyContentByName', { name: 'ID' }) }],
                }))
              ;(0, u.YP)(p, (e) => {
                e ||
                  (_(),
                  window.setTimeout(() => {
                    d.value = !1
                  }, 200)),
                  f.value && e && S()
              })
              const S = () => {
                  B(n.value).then((e) => {
                    const { id: t, name: a, options: l } = e.data
                    i.value = { id: t, name: a, ...l }
                  })
                },
                _ = () => {
                  ;(p.value = !1), s.value?.resetFields()
                },
                k = async () => {
                  if (a.submitMethod && 'function' === typeof a.submitMethod) {
                    c.value = !0
                    try {
                      await s.value.validate()
                      const { id: e, name: t, ...l } = i.value,
                        o = { id: e, name: t, options: { ...l } },
                        n = Le(o)
                      await a.submitMethod(n), (d.value = !0)
                    } catch (e) {
                      console.error('error', e)
                    } finally {
                      c.value = !1
                    }
                  }
                },
                z = () => {
                  const { href: e } = l.resolve({ name: 'Flow', query: { id: i.value.id } })
                  window.open(e, '_blank')
                }
              return (e, t) => {
                const a = (0, u.up)('el-input'),
                  l = (0, u.up)('el-form-item'),
                  o = (0, u.up)('el-col'),
                  n = (0, u.up)('ArrowUp'),
                  r = (0, u.up)('el-icon'),
                  b = (0, u.up)('ArrowDown'),
                  S = (0, u.up)('el-divider'),
                  U = (0, u.up)('el-input-number'),
                  V = (0, u.up)('el-row'),
                  C = (0, u.up)('el-form'),
                  D = (0, u.up)('el-button')
                return (
                  (0, u.wg)(),
                  (0, u.j4)(
                    (0, h.SU)(Xa.d0),
                    {
                      modelValue: (0, h.SU)(p),
                      'onUpdate:modelValue': t[15] || (t[15] = (e) => ((0, h.dq)(p) ? (p.value = e) : null)),
                      width: '50%',
                      'custom-class': 'name-dialog',
                      title: (0, h.SU)(y),
                      'z-index': 2e3,
                    },
                    {
                      footer: (0, u.w5)(() => [
                        (0, u._)('span', pl, [
                          d.value
                            ? (0, u.kq)('', !0)
                            : ((0, u.wg)(),
                              (0, u.iD)(
                                u.HY,
                                { key: 0 },
                                [
                                  (0, u.Wm)(
                                    D,
                                    { onClick: _ },
                                    {
                                      default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.$t('common.cancel')), 1)]),
                                      _: 1,
                                    },
                                  ),
                                  (0, u.Wm)(
                                    D,
                                    { type: 'primary', onClick: k, loading: c.value },
                                    {
                                      default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.$t('common.submit')), 1)]),
                                      _: 1,
                                    },
                                    8,
                                    ['loading'],
                                  ),
                                ],
                                64,
                              )),
                        ]),
                      ]),
                      default: (0, u.w5)(() => [
                        (0, u._)('main', null, [
                          d.value
                            ? ((0, u.wg)(),
                              (0, u.iD)('div', cl, [
                                (0, u.Wm)(
                                  r,
                                  { size: 52, class: 'icon-suc' },
                                  { default: (0, u.w5)(() => [(0, u.Wm)((0, h.SU)(Se.CircleCheck))]), _: 1 },
                                ),
                                (0, u._)('p', ml, (0, v.zw)((0, h.SU)(g)), 1),
                                (0, h.SU)(f)
                                  ? (0, u.kq)('', !0)
                                  : ((0, u.wg)(),
                                    (0, u.j4)(
                                      D,
                                      { key: 0, type: 'primary', onClick: z },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Uk)((0, v.zw)(e.$t('rules.openCurrentlyCreatedRule')), 1),
                                        ]),
                                        _: 1,
                                      },
                                    )),
                                (0, u.Wm)(
                                  D,
                                  { onClick: _ },
                                  { default: (0, u.w5)(() => [(0, u.Uk)((0, v.zw)(e.$t('common.close')), 1)]), _: 1 },
                                ),
                              ]))
                            : ((0, u.wg)(),
                              (0, u.j4)(
                                C,
                                {
                                  key: 0,
                                  ref_key: 'formDataRef',
                                  ref: s,
                                  model: i.value,
                                  rules: (0, h.SU)(w),
                                  'label-position': 'top',
                                },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(
                                      V,
                                      { gutter: 20 },
                                      {
                                        default: (0, u.w5)(() => [
                                          (0, u.Wm)(
                                            o,
                                            { span: 24 },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  l,
                                                  { label: 'ID', prop: 'id' },
                                                  {
                                                    default: (0, u.w5)(() => [
                                                      (0, u.Wm)(
                                                        a,
                                                        {
                                                          modelValue: i.value.id,
                                                          'onUpdate:modelValue':
                                                            t[0] || (t[0] = (e) => (i.value.id = e)),
                                                          disabled: !!(0, h.SU)(f),
                                                        },
                                                        null,
                                                        8,
                                                        ['modelValue', 'disabled'],
                                                      ),
                                                    ]),
                                                    _: 1,
                                                  },
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          (0, u.Wm)(
                                            o,
                                            { span: 24 },
                                            {
                                              default: (0, u.w5)(() => [
                                                (0, u.Wm)(
                                                  l,
                                                  { label: e.$t('common.name'), prop: 'name' },
                                                  {
                                                    default: (0, u.w5)(() => [
                                                      (0, u.Wm)(
                                                        a,
                                                        {
                                                          modelValue: i.value.name,
                                                          'onUpdate:modelValue':
                                                            t[1] || (t[1] = (e) => (i.value.name = e)),
                                                        },
                                                        null,
                                                        8,
                                                        ['modelValue'],
                                                      ),
                                                    ]),
                                                    _: 1,
                                                  },
                                                  8,
                                                  ['label'],
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          (0, u.Wm)(S, null, {
                                            default: (0, u.w5)(() => [
                                              (0, u._)(
                                                'span',
                                                {
                                                  class: 'advanced',
                                                  onClick: t[2] || (t[2] = (e) => (m.value = !m.value)),
                                                },
                                                [
                                                  m.value
                                                    ? ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        r,
                                                        { key: 0 },
                                                        { default: (0, u.w5)(() => [(0, u.Wm)(n)]), _: 1 },
                                                      ))
                                                    : ((0, u.wg)(),
                                                      (0, u.j4)(
                                                        r,
                                                        { key: 1 },
                                                        { default: (0, u.w5)(() => [(0, u.Wm)(b)]), _: 1 },
                                                      )),
                                                  (0, u.Uk)(
                                                    ' ' +
                                                      (0, v.zw)(
                                                        e.$t('' + (m.value ? 'common.collapse' : 'common.expand')),
                                                      ),
                                                    1,
                                                  ),
                                                ],
                                              ),
                                            ]),
                                            _: 1,
                                          }),
                                          m.value
                                            ? ((0, u.wg)(),
                                              (0, u.iD)(
                                                u.HY,
                                                { key: 0 },
                                                [
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.isEventTime'),
                                                            tooltipContent: e.$t('rules.isEventTimeDesc'),
                                                            prop: 'isEventTime',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                ll,
                                                                {
                                                                  modelValue: i.value.isEventTime,
                                                                  'onUpdate:modelValue':
                                                                    t[3] || (t[3] = (e) => (i.value.isEventTime = e)),
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.sendMetaToSink'),
                                                            tooltipContent: e.$t('rules.sendMetaToSinkDesc'),
                                                            prop: 'sendMetaToSink',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                ll,
                                                                {
                                                                  modelValue: i.value.sendMetaToSink,
                                                                  'onUpdate:modelValue':
                                                                    t[4] ||
                                                                    (t[4] = (e) => (i.value.sendMetaToSink = e)),
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.lateTolerance'),
                                                            tooltipContent: e.$t('rules.lateToleranceDesc'),
                                                            prop: 'lateTolerance',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.lateTolerance,
                                                                  'onUpdate:modelValue':
                                                                    t[5] || (t[5] = (e) => (i.value.lateTolerance = e)),
                                                                  placeholder: '0',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.concurrency'),
                                                            tooltipContent: e.$t('rules.concurrencyDesc'),
                                                            prop: 'concurrency',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.concurrency,
                                                                  'onUpdate:modelValue':
                                                                    t[6] || (t[6] = (e) => (i.value.concurrency = e)),
                                                                  placeholder: '1',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.bufferLength'),
                                                            tooltipContent: e.$t('rules.bufferLengthDesc'),
                                                            prop: 'bufferLength',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.bufferLength,
                                                                  'onUpdate:modelValue':
                                                                    t[7] || (t[7] = (e) => (i.value.bufferLength = e)),
                                                                  placeholder: '1024',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.qos'),
                                                            tooltipContent: e.$t('rules.qosDesc'),
                                                            prop: 'qos',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                dl,
                                                                {
                                                                  modelValue: i.value.qos,
                                                                  'onUpdate:modelValue':
                                                                    t[8] || (t[8] = (e) => (i.value.qos = e)),
                                                                  placeholder: '0',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.checkpointInterval'),
                                                            tooltipContent: e.$t('rules.checkpointIntervalDesc'),
                                                            prop: 'qos',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.checkpointInterval,
                                                                  'onUpdate:modelValue':
                                                                    t[9] ||
                                                                    (t[9] = (e) => (i.value.checkpointInterval = e)),
                                                                  placeholder: '300000',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.attempts'),
                                                            tooltipContent: e.$t('rules.attemptsDesc'),
                                                            prop: 'attempts',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.attempts,
                                                                  'onUpdate:modelValue':
                                                                    t[10] || (t[10] = (e) => (i.value.attempts = e)),
                                                                  placeholder: '0',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.delay'),
                                                            tooltipContent: e.$t('rules.delayDesc'),
                                                            prop: 'delay',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.delay,
                                                                  'onUpdate:modelValue':
                                                                    t[11] || (t[11] = (e) => (i.value.delay = e)),
                                                                  placeholder: '1000',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.maxDelay'),
                                                            tooltipContent: e.$t('rules.maxDelayDesc'),
                                                            prop: 'maxDelay',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.maxDelay,
                                                                  'onUpdate:modelValue':
                                                                    t[12] || (t[12] = (e) => (i.value.maxDelay = e)),
                                                                  placeholder: '30000',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.multiplier'),
                                                            tooltipContent: e.$t('rules.multiplierDesc'),
                                                            prop: 'multiplier',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.multiplier,
                                                                  'onUpdate:modelValue':
                                                                    t[13] || (t[13] = (e) => (i.value.multiplier = e)),
                                                                  placeholder: '2',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                  (0, u.Wm)(
                                                    o,
                                                    { span: 12 },
                                                    {
                                                      default: (0, u.w5)(() => [
                                                        (0, u.Wm)(
                                                          sl,
                                                          {
                                                            label: e.$t('rules.jitterFactor'),
                                                            tooltipContent: e.$t('rules.jitterFactorDesc'),
                                                            prop: 'jitterFactor',
                                                          },
                                                          {
                                                            content: (0, u.w5)(() => [
                                                              (0, u.Wm)(
                                                                U,
                                                                {
                                                                  modelValue: i.value.jitterFactor,
                                                                  'onUpdate:modelValue':
                                                                    t[14] ||
                                                                    (t[14] = (e) => (i.value.jitterFactor = e)),
                                                                  placeholder: '0.1',
                                                                  'controls-position': 'right',
                                                                },
                                                                null,
                                                                8,
                                                                ['modelValue'],
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ['label', 'tooltipContent'],
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                  ),
                                                ],
                                                64,
                                              ))
                                            : (0, u.kq)('', !0),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['model', 'rules'],
                              )),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue', 'title'],
                  )
                )
              }
            },
          }
          const hl = (0, d.Z)(fl, [['__scopeId', 'data-v-fe8d4f30']])
          var vl = hl
          const yl = (e) => {
              const t = { drawflow: { Home: { data: {} } } }
              return (
                Object.values(e.nodes).forEach((e) => {
                  t.drawflow.Home.data[e.props.node.id] = e.props.node
                }),
                t
              )
            },
            gl = (e) => l.Z.state.nodesSchema?.function[e]?.functions[0]?.name || '',
            wl = (e, t, a) => {
              const l = []
              for (const o in t)
                if (t.hasOwnProperty(o)) {
                  const e = t[o]
                  if (a && void 0 !== a[e.name])
                    'array' === e.type && l.push(`[${a[e.name].map((e) => `'${e}'`).join(',')}]`), l.push(a[e.name])
                  else
                    switch (e.type) {
                      case 'int':
                        l.push('0')
                        break
                      case 'string':
                        l.push('')
                        break
                      case 'bool':
                        l.push('false')
                        break
                      case 'array':
                        l.push('[]')
                        break
                      case 'list_int':
                        l.push('[]')
                        break
                      case 'list_string':
                        l.push('[]')
                        break
                      default:
                        l.push(null)
                        break
                    }
                }
              return `${e}(${l.join(',')})`
            },
            bl = (e, t) => `${e} as ${t}`,
            Sl = (e, t) => {
              const a = []
              return (
                Object.entries(t).forEach(([t, l]) => {
                  const o = l.connections.length
                  if (o > 1)
                    l.connections.forEach((t) => {
                      const l = e[t.node]
                      a.push([l.data.id])
                    })
                  else if (1 === o) {
                    const t = e[l.connections[0].node]
                    a.push(t.data.id)
                  }
                }),
                a
              )
            },
            _l = (e, t) => {
              const a = Object.keys(t).reduce((e, a) => {
                const { connections: l } = t[a]
                return [...e, ...l.map(({ node: e }) => e)]
              }, [])
              return a.find((t) => 'chart' === e[t].data.group)
            },
            kl = /^(input|output)_(?<no>\d+)$/,
            zl = (e) => {
              const t = e.match(kl)
              return t?.groups?.no
            },
            Ul = (e, t) => {
              const { inputs: a } = e[t],
                l = Object.keys(a),
                o = l.reduce((e, t) => e.concat(a[t].connections), [])[0]?.node
              if (!o) return {}
              const n = e[o],
                s = n?.data?.outputs ? n.data.outputs.length : 1
              let r = ''
              if ('source' === n.data.group || 'filter' === n.data.nodeType) r = 'signal'
              else {
                const a = 'chart' === e[t].data.group
                r = a ? n.data.id : gl(n.data.name)
              }
              const u = l.reduce((e, t) => {
                const { connections: l } = a[t]
                if (0 === l.length) return e
                const o = zl(t)
                if (1 === s) return { ...e, [o]: r }
                {
                  const t = zl(l[0].input)
                  return { ...e, [o]: `${r}[${Number(t) - 1}]` }
                }
              }, {})
              return u
            },
            Vl = async (e) => {
              try {
                const t = {},
                  a = { sources: [], edges: {} },
                  l = Object.entries(e)
                if (!l.length) return { graph: { nodes: t, topo: a } }
                l.forEach(([l, o]) => {
                  const n = o.data.id
                  t[n] = { type: o.data.trueType, nodeType: o.data.nodeType, props: { node: o } }
                  const s = Ul(e, l)
                  switch (
                    ('function' === o.data.nodeType
                      ? (void 0 === o.data.record && (o.data.record = {}), (o.data.record.inputData = s['1']))
                      : 'chart' === o.data.group && (t[n].props.visualization = { x: s['1'], y: s['2'] }),
                    o.data.nodeType)
                  ) {
                    case 'function':
                      let a = wl(gl(o.data.name), o.data.properties, o.data.record)
                      _l(e, o.outputs) && (a = bl(a, n)), (t[n].props = { ...t[n].props, expr: a })
                      break
                    default:
                      t[n].props = { ...t[n].props, ...Le(o.data.record) }
                      break
                  }
                  if (('source' === o.data?.group && a.sources.push(n), o.outputs)) {
                    const t = Sl(e, o.outputs)
                    t && t.length > 0 && (a.edges[n] = t)
                  }
                })
                const o = { graph: { nodes: t, topo: a } }
                return Promise.resolve(o)
              } catch (t) {
                return console.error('err', t), Promise.reject(t)
              }
            }
          var Cl = Vl
          const Dl = { class: 'flow' },
            Wl = { class: 'config-card' },
            Tl = { class: 'controls' }
          var jl = {
            name: 'Flow',
            setup(e) {
              ;(0, f.sj)((e) => ({ '1f83028d': (0, h.SU)(ae), '25c8bebf': (0, h.SU)(le) }))
              const t = (0, w.oR)(),
                { t: a } = (0, b.QT)(),
                { currentRuleId: l } = el(),
                { i18nLabel: n } = x(),
                s = (0, h.XI)({}),
                r = { version: 3, h: u.h, render: f.sY },
                i = (0, u.FN)()
              i.appContext.app._context.config.globalProperties.$df = s
              const d = (0, h.iH)(!1),
                c = (0, h.iH)([]),
                m = (0, h.iH)({}),
                p = (0, h.iH)('')
              let y
              const _ = (0, h.iH)(!1),
                k = (0, u.Fl)(() => t.state.nodesSchema),
                z = (e) => {
                  e.preventDefault()
                },
                U = (e) => {
                  e.preventDefault()
                  const t = e.dataTransfer.getData('getNodeName'),
                    a = JSON.parse(e.dataTransfer.getData('getNodeLabel')),
                    l = e.dataTransfer.getData('getNodeType'),
                    o = e.dataTransfer.getData('getNodeGroup'),
                    n = e.dataTransfer.getData('getNodeTrueType'),
                    s = e.dataTransfer.getData('getNodeNodeType')
                  let r = k.value[o]
                  N(t, e.clientX, e.clientY, a, l, o, { trueType: n, nodeType: s }, r[t])
                },
                D = (e, t) => {
                  const a =
                      e * (s.value.precanvas.clientWidth / (s.value.precanvas.clientWidth * s.value.zoom)) -
                      s.value.precanvas.getBoundingClientRect().x *
                        (s.value.precanvas.clientWidth / (s.value.precanvas.clientWidth * s.value.zoom)),
                    l =
                      t * (s.value.precanvas.clientHeight / (s.value.precanvas.clientHeight * s.value.zoom)) -
                      s.value.precanvas.getBoundingClientRect().y *
                        (s.value.precanvas.clientHeight / (s.value.precanvas.clientHeight * s.value.zoom))
                  return { posX: a, posY: l }
                },
                W = (e, t) => {
                  let a = 0,
                    l = 0
                  const { inputs: o = [], outputs: n = [] } = e,
                    s = o.length,
                    r = n.length
                  switch (t) {
                    case 'output':
                      ;(a = s || 0), (l = r || 1)
                      break
                    case 'input':
                      ;(a = s || 1), (l = r || 0)
                      break
                    case 'default':
                      ;(a = s || 1), (l = r || 1)
                      break
                    default:
                      break
                  }
                  return { input: a, output: l }
                },
                T = (e) => {
                  let t = [],
                    a = {}
                  return (
                    e.properties
                      ? ((t = Array.isArray(e.properties) ? e.properties : e.properties['default']),
                        (a = e.about?.description || {}))
                      : e.functions
                      ? ((t = e.functions[0]?.args), (a = e.functions[0]?.hint || {}))
                      : ((t = []), (a = {})),
                    { properties: t, schemaDesc: a }
                  )
                },
                j = (e) => {
                  let t = e
                  return 'chart' === t && (t = 'sink'), `is-${t}`
                },
                N = (e, t, a, l, o, n, r, u) => {
                  if ('fixed' !== s.value.editor_mode) {
                    const { posX: i, posY: d } = D(t, a),
                      { input: m, output: p } = W(u, o),
                      { properties: f, schemaDesc: h } = T(u)
                    c.value = f
                    const { inputs: v = [], outputs: y = [] } = u,
                      g = v.length > 0 || y.length > 0
                    s.value.addNode(
                      e,
                      m,
                      p,
                      i,
                      d,
                      `BasicNode${g ? ' multiple-hooks' : ''} ${j(n)}`,
                      {
                        id: `${e}${V()}`,
                        name: e,
                        label: l,
                        type: o,
                        group: n,
                        properties: f,
                        schemaDesc: h,
                        ...r,
                        inputs: v,
                        outputs: y,
                      },
                      'BasicNode',
                      'vue',
                    )
                  }
                },
                $ = () => {
                  const e = s.value.export()
                  S.z8.success(a('node.saveLocalSuccess')), localStorage.setItem('flowKey', JSON.stringify(e))
                },
                I = () => {
                  S.z8.success(a('node.recoverDataSuccess'))
                  const e = JSON.parse(localStorage.getItem('flowKey'))
                  s.value.import(e)
                },
                F = (e) => {
                  s.value.import(e)
                },
                A = () => {
                  const e = s.value.export()
                  C(e, `rule_${H()}`)
                },
                E = () => {
                  _.value = !0
                },
                P = async (e, t = 'add') => {
                  const o = s.value.export(),
                    n = o.drawflow.Home.data,
                    r = await Cl(n)
                  console.log('接口保存数据', r), localStorage.setItem('flowData', JSON.stringify(r))
                  const { endPoint: u, ...i } = e,
                    d = { ...i, ...r }
                  try {
                    return (
                      l.value ? await Y(l.value, d) : await K(u, d),
                      S.z8.success(a('add' === t ? 'common.createSuccess' : 'common.updateSuccess')),
                      Promise.resolve()
                    )
                  } catch (c) {
                    return console.error('error', c), Promise.reject()
                  }
                },
                R = () => {
                  P('', 'test_rule_demo', 'edit')
                },
                H = () => {
                  const e = new Date()
                  return `${e.getFullYear()}-${
                    e.getMonth() + 1
                  }-${e.getDate()} ${e.getHours()}:${e.getMinutes()}:${e.getSeconds()}`
                },
                O = () => {
                  ;(d.value = !d.value), d.value ? (s.value.editor_mode = 'fixed') : (s.value.editor_mode = 'edit')
                },
                q = () => {
                  s.value.zoom_out()
                },
                L = () => {
                  s.value.zoom_in()
                },
                M = () => {
                  s.value.zoom_reset()
                },
                G = () => {
                  s.value.clear()
                }
              let Z = (0, h.iH)({}),
                Q = (0, h.iH)(!1)
              ;(0, u.YP)(s, (e, t) => {
                'fixed' === e.editor_mode ? (d.value = !0) : (d.value = !1)
              })
              const J = async () => {
                  const e = await re(m.value, p.value)
                  e && t.commit('setChartData', e)
                },
                X = async () => {
                  J(),
                    (y = window.setInterval(() => {
                      J()
                    }, 3e3))
                },
                te = () => {
                  const e = document.getElementById('drawflow')
                  ;(s.value = new (g())(e, r, i.appContext.app._context)),
                    s.value.registerNode('BasicNode', fe, {}, {}),
                    s.value.start()
                  const t = l.value
                  t &&
                    ((p.value = t),
                    B(t).then(async (e) => {
                      m.value = e.data.graph
                      const t = yl(e.data.graph),
                        a = ee(e.data.graph.nodes)
                      a && a.length && X(), s.value.import(t)
                    }))
                }
              ;(0, u.bv)(() => {
                te(),
                  s.value.on('nodeSelected', (e) => {
                    const t = s.value.getNodeFromId(e)
                    ;(Z.value = t), (Q.value = !0)
                  }),
                  s.value.on('nodeUnselected', () => {
                    ;(Q.value = !1), (Z.value = {})
                  }),
                  s.value.on('connectionCreated', (e) => {
                    const { output_id: t, input_id: l, output_class: o, input_class: r } = e,
                      u = s.value.getNodeFromId(t),
                      i = s.value.getNodeFromId(l),
                      { group: d, name: c } = u.data,
                      { group: m, name: p } = i.data,
                      f = k.value[d],
                      h = k.value[m],
                      v = (f[c], h[p])
                    console.log('inputNodeSchemaData', v)
                    const { node: y } = v,
                      { allowMulti: g, type: w, rowType: b, collectionType: _ } = y?.input || {},
                      { connections: z } = i.inputs[r],
                      U = z.length
                    if (!g && U > 1) {
                      s.value.removeSingleConnection(t, l, o, r)
                      let { label: e } = v?.node
                      const u = e ? n.value(e) : p
                      S.z8.warning(a('node.notAllowMultiInputsTip', { name: u }))
                    }
                  }),
                  s.value.on('import', async () => {
                    await (0, u.Y3)(), await (0, u.Y3)()
                    const e = s.value.export()
                    Object.keys(e.drawflow.Home.data).forEach((e) => {
                      s.value.updateConnectionNodes(`node-${e}`)
                    })
                  })
              }),
                (0, u.Ah)(() => {
                  y && window.clearInterval(y)
                })
              const ae = (0, u.Fl)(() => (o ? '100px' : '0')),
                le = (0, u.Fl)(() => (o ? '24px' : '16px'))
              return (e, t) => {
                const a = (0, u.up)('Lock'),
                  l = (0, u.up)('el-icon'),
                  o = (0, u.up)('el-button'),
                  n = (0, u.up)('Unlock'),
                  s = (0, u.up)('ZoomOut'),
                  r = (0, u.up)('ZoomIn'),
                  i = (0, u.up)('Refresh'),
                  c = (0, u.up)('Delete')
                return (
                  (0, u.wg)(),
                  (0, u.iD)(
                    u.HY,
                    null,
                    [
                      (0, u._)('div', Dl, [
                        (0, u.Wm)(Ja, { class: 'sidebar' }),
                        (0, u._)('div', { id: 'drawflow', onDrop: U, onDragover: z }, null, 32),
                        (0, u._)('div', Wl, [
                          (0, u.Wm)(
                            Ra,
                            {
                              node: (0, h.SU)(Z),
                              onSave: $,
                              onRestore: I,
                              onUpdate: R,
                              onUpload: E,
                              onExportData: A,
                              onImportData: F,
                            },
                            null,
                            8,
                            ['node'],
                          ),
                        ]),
                        (0, u._)('div', Tl, [
                          d.value
                            ? ((0, u.wg)(),
                              (0, u.j4)(
                                o,
                                { key: 0, text: '', onClick: O },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(l, null, { default: (0, u.w5)(() => [(0, u.Wm)(a)]), _: 1 }),
                                    (0, u._)('span', null, (0, v.zw)(e.$t('common.unlock')), 1),
                                  ]),
                                  _: 1,
                                },
                              ))
                            : ((0, u.wg)(),
                              (0, u.j4)(
                                o,
                                { key: 1, text: '', onClick: O },
                                {
                                  default: (0, u.w5)(() => [
                                    (0, u.Wm)(l, null, { default: (0, u.w5)(() => [(0, u.Wm)(n)]), _: 1 }),
                                    (0, u._)('span', null, (0, v.zw)(e.$t('common.lock')), 1),
                                  ]),
                                  _: 1,
                                },
                              )),
                          (0, u.Wm)(
                            o,
                            { text: '', onClick: q },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(l, null, { default: (0, u.w5)(() => [(0, u.Wm)(s)]), _: 1 }),
                                (0, u._)('span', null, (0, v.zw)(e.$t('common.shrink')), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          (0, u.Wm)(
                            o,
                            { text: '', onClick: L },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(l, null, { default: (0, u.w5)(() => [(0, u.Wm)(r)]), _: 1 }),
                                (0, u._)('span', null, (0, v.zw)(e.$t('common.zoom')), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          (0, u.Wm)(
                            o,
                            { text: '', onClick: M },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(l, null, { default: (0, u.w5)(() => [(0, u.Wm)(i)]), _: 1 }),
                                (0, u._)('span', null, (0, v.zw)(e.$t('common.recover')), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          (0, u.Wm)(
                            o,
                            { text: '', onClick: G },
                            {
                              default: (0, u.w5)(() => [
                                (0, u.Wm)(l, null, { default: (0, u.w5)(() => [(0, u.Wm)(c)]), _: 1 }),
                                (0, u._)('span', null, (0, v.zw)(e.$t('common.clear')), 1),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                      ]),
                      (0, u.Wm)(
                        vl,
                        {
                          dialogVisible: _.value,
                          'onUpdate:dialogVisible': t[0] || (t[0] = (e) => (_.value = e)),
                          'submit-method': P,
                        },
                        null,
                        8,
                        ['dialogVisible'],
                      ),
                    ],
                    64,
                  )
                )
              }
            },
          }
          const xl = jl
          var Nl = xl,
            $l = a(7484),
            Il = a.n($l)
          const Fl = { class: 'cars' },
            Al = { class: 'table-header' },
            El = (0, u._)('h1', null, '车辆列表', -1),
            Pl = (0, u.Uk)('刷新')
          var Rl = {
            name: 'Cars',
            setup(e) {
              const t = (0, h.iH)([]),
                a = (0, h.iH)(!1),
                l = () => {
                  ;(a.value = !0),
                    $()
                      .get('/api/data_models/test_rule_demo/json', {
                        auth: { username: 'f12c1a1a', password: 'qbe4222ca11e020e' },
                      })
                      .then((e) => {
                        ;(t.value = []), (e.data.name = '测试车辆1'), t.value.push(e.data)
                      })
                      .finally(() => {
                        a.value = !1
                      })
                }
              l()
              const o = (e) => {
                  const t = { 0: '未部署', 2: '部署成功' }
                  return t[e]
                },
                n = (e) => Il()(e).format('YYYY-MM-DD HH:mm:ss')
              return (e, s) => {
                const r = (0, u.up)('el-button'),
                  i = (0, u.up)('el-table-column'),
                  d = (0, u.up)('InfoFilled'),
                  c = (0, u.up)('el-icon'),
                  m = (0, u.up)('SuccessFilled'),
                  p = (0, u.up)('el-table'),
                  f = (0, u.Q2)('loading')
                return (
                  (0, u.wg)(),
                  (0, u.iD)('div', Fl, [
                    (0, u._)('div', Al, [
                      El,
                      (0, u.Wm)(
                        r,
                        { type: 'primary', size: 'large', onClick: l },
                        { default: (0, u.w5)(() => [Pl]), _: 1 },
                      ),
                    ]),
                    (0, u.wy)(
                      ((0, u.wg)(),
                      (0, u.j4)(
                        p,
                        { border: '', data: t.value, style: { width: '100%' } },
                        {
                          default: (0, u.w5)(() => [
                            (0, u.Wm)(i, { prop: 'name', label: '车辆名称' }),
                            (0, u.Wm)(
                              i,
                              { label: '规则状态' },
                              {
                                default: (0, u.w5)(({ row: e }) => [
                                  (0, u._)(
                                    'div',
                                    { class: (0, v.C_)([0 === e.data.status ? 'warning' : 'success', 'status']) },
                                    [
                                      0 === e.data.status
                                        ? ((0, u.wg)(),
                                          (0, u.j4)(c, { key: 0 }, { default: (0, u.w5)(() => [(0, u.Wm)(d)]), _: 1 }))
                                        : ((0, u.wg)(),
                                          (0, u.j4)(c, { key: 1 }, { default: (0, u.w5)(() => [(0, u.Wm)(m)]), _: 1 })),
                                      (0, u._)('span', null, (0, v.zw)(o(e.data.status)), 1),
                                    ],
                                    2,
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            (0, u.Wm)(i, { prop: 'version', label: '版本' }),
                            (0, u.Wm)(
                              i,
                              { prop: 'lastTime', label: '更新时间' },
                              {
                                default: (0, u.w5)(({ row: e }) => [
                                  (0, u._)('span', null, (0, v.zw)(n(e.lastTime)), 1),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['data'],
                      )),
                      [[f, a.value]],
                    ),
                  ])
                )
              }
            },
          }
          const Hl = Rl
          var Ol = Hl,
            ql = [
              {
                path: '/',
                component: p,
                name: 'App',
                children: [
                  { path: '', redirect: 'flow' },
                  { path: s('flow'), name: 'Flow', component: Nl },
                  { path: s('cars'), name: 'Cars', component: Ol },
                ],
              },
            ]
          const Ll = (0, r.p7)({ history: (0, r.r5)(), base: '/web/common/flow/', routes: ql })
          var Ml = Ll,
            Kl = a(225),
            Yl = (a(4415), a(3942)),
            Bl = a(354)
          console.log(Yl.Z)
          let Gl = (0, f.ri)(p),
            Zl = Ml
          const Ql = () => {
            ;(Zl = Ml), (Gl = (0, f.ri)(p))
            for (const [e, t] of Object.entries(Se)) Gl.component(e, t)
            Gl.use(Kl.Z).use(Bl['default']).use(l.Z).use(Zl).mount('#sub-app')
          }
          async function Jl(e) {
            console.log('bootstrap:', e)
          }
          o || Ql()
          const Xl = (e) => {
              const { user: t, nodeId: a, routePathPrefix: o, lang: n } = e
              l.Z.commit('setUser', t),
                l.Z.commit('setCurrentNode', { id: a }),
                l.Z.commit('setLang', n),
                (Bl['default'].global.locale.value = n)
            },
            eo = () => {
              l.Z.commit('setUser', {}), l.Z.commit('setCurrentNode', {}), l.Z.commit('setLang', '')
            }
          async function to(e) {
            Xl(e), Ql()
          }
          async function ao(e) {
            Gl.unmount(), (Gl._container.innerHTMl = ''), (Gl = null), (Zl = null), eo()
          }
        },
        4642: function (e, t, a) {
          'use strict'
          var l = a(3907),
            o = a(844)
          const n = (0, l.MT)({
            state() {
              return {
                lang: 'zh',
                chartData: {},
                nodesSchema: {},
                funcKeyNameMap: {},
                nodeFieldsJSON: {},
                user: {},
                currentNode: { id: '' },
                routePathPrefix: '',
              }
            },
            mutations: {
              setChartData(e, t) {
                e.chartData = t
              },
              setFuncKeyNameMap(e, t) {
                e.funcKeyNameMap = t
              },
              setNodesSchema(e, t) {
                e.nodesSchema = t
              },
              setNodeFields(e, t) {
                const { nodeId: a, fields: l } = t
                e.nodeFieldsJSON[a] = l
              },
              removeNodeField(e, t) {
                const a = Object.keys(e.nodeFieldsJSON)
                let l = {}
                a.forEach((a) => {
                  const o = e.nodeFieldsJSON[a]
                  a !== t && (l[a] = o)
                }),
                  (e.nodeFieldsJSON = l)
              },
              cutNodeField(e, { outputId: t, inputId: a }) {
                const l = e.nodeFieldsJSON[t],
                  n = e.nodeFieldsJSON[a]
                e.nodeFieldsJSON[a] = (0, o.kb)(n, l)
              },
              setUser(e, t) {
                e.user = t
              },
              setCurrentNode(e, t) {
                e.currentNode = t
              },
              setLang(e, t) {
                e.lang = t
              },
              setRoutePathPrefix(e, t) {
                e.routePathPrefix = t
              },
            },
          })
          t['Z'] = n
        },
        844: function (e, t, a) {
          'use strict'
          a.d(t, {
            kb: function () {
              return o
            },
            zE: function () {
              return s
            },
          })
          var l = a(6486)
          const o = (e, t) => {
              const a = []
              return (
                e.filter((e) => {
                  const l = e.value,
                    o = t.find((e) => e.value === l)
                  o || a.push(e)
                }),
                a
              )
            },
            n = (e, t) => {
              if (!t || !e) return ''
              const a = t.includes(`${e}.`) ? t.split('.')[1] : `${e}.${t}`
              return a
            },
            s = (e, t) => {
              if (!t) return
              let a = (0, l.cloneDeep)(t)
              const { connectionSelector: o } = t
              if (o) {
                const t = n(e, o)
                a = { ...a, connectionSelector: t }
              }
              return a
            }
        },
      },
      t = {}
    function a(l) {
      var o = t[l]
      if (void 0 !== o) return o.exports
      var n = (t[l] = { id: l, loaded: !1, exports: {} })
      return e[l].call(n.exports, n, n.exports, a), (n.loaded = !0), n.exports
    }
    ;(a.m = e),
      (function () {
        var e = []
        a.O = function (t, l, o, n) {
          if (!l) {
            var s = 1 / 0
            for (d = 0; d < e.length; d++) {
              ;(l = e[d][0]), (o = e[d][1]), (n = e[d][2])
              for (var r = !0, u = 0; u < l.length; u++)
                (!1 & n || s >= n) &&
                Object.keys(a.O).every(function (e) {
                  return a.O[e](l[u])
                })
                  ? l.splice(u--, 1)
                  : ((r = !1), n < s && (s = n))
              if (r) {
                e.splice(d--, 1)
                var i = o()
                void 0 !== i && (t = i)
              }
            }
            return t
          }
          n = n || 0
          for (var d = e.length; d > 0 && e[d - 1][2] > n; d--) e[d] = e[d - 1]
          e[d] = [l, o, n]
        }
      })(),
      (function () {
        a.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e['default']
                }
              : function () {
                  return e
                }
          return a.d(t, { a: t }), t
        }
      })(),
      (function () {
        a.d = function (e, t) {
          for (var l in t) a.o(t, l) && !a.o(e, l) && Object.defineProperty(e, l, { enumerable: !0, get: t[l] })
        }
      })(),
      (function () {
        a.g = (function () {
          if ('object' === typeof globalThis) return globalThis
          try {
            return this || new Function('return this')()
          } catch (e) {
            if ('object' === typeof window) return window
          }
        })()
      })(),
      (function () {
        a.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }
      })(),
      (function () {
        a.r = function (e) {
          'undefined' !== typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 })
        }
      })(),
      (function () {
        a.nmd = function (e) {
          return (e.paths = []), e.children || (e.children = []), e
        }
      })(),
      (function () {
        a.p = '/web/common/flow/'
      })(),
      (function () {
        var e = { 143: 0 }
        a.O.j = function (t) {
          return 0 === e[t]
        }
        var t = function (t, l) {
            var o,
              n,
              s = l[0],
              r = l[1],
              u = l[2],
              i = 0
            if (
              s.some(function (t) {
                return 0 !== e[t]
              })
            ) {
              for (o in r) a.o(r, o) && (a.m[o] = r[o])
              if (u) var d = u(a)
            }
            for (t && t(l); i < s.length; i++) (n = s[i]), a.o(e, n) && e[n] && e[n][0](), (e[n] = 0)
            return a.O(d)
          },
          l = (self['webpackJsonp_flow-ekuiper'] = self['webpackJsonp_flow-ekuiper'] || [])
        l.forEach(t.bind(null, 0)), (l.push = t.bind(null, l.push.bind(l)))
      })()
    var l = a.O(void 0, [998], function () {
      return a(2511)
    })
    return (l = a.O(l)), l
  })()
})
