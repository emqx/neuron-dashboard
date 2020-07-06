export const Ethernet = [{
  val: 'mbstcp',
  label: 'Modbus TCP'
},
{
  val: 'ethip',
  label: 'Allen - Bradley Ethernet / IP'
},
{
  val: 'mele71',
  label: 'Mitsubishi MC Protocol for MELSEC - Q and E71 module'
},
{
  val: 'finstc',
  label: 'Omron FINS on TCP'
},
{
  val: 's7iso',
  label: 'Siemens Industrial Ethernet ISO for S7 - 300 / 400'
},
{
  val: 'siefw',
  label: 'Siemens Fetch Write for S7 - 300 / 400 and CP443 module'
},
{
  val: 'tsxmbt',
  label: 'Schneider Modbus TCP'
}
]

export const Serial = [{
  val: 'mbsrtu',
  label: 'Modbus RTU'
},
{
  val: 'df1hp2',
  label: 'Allen - Bradley DF1 half - duplex for PLC2'
},
{
  val: 'df1hp5',
  label: 'Allen - Bradley DF1 half - duplex for PLC5'
},
{
  val: 'fxnpro',
  label: 'Mitsubishi FX0N / FX0S / FX1N / FX1S / FX2'
},
{
  val: 'fxdpro',
  label: 'Mitsubishi FX 232ADP / 485BD / 232BD Module'
},
{
  val: 'fx3u3g',
  label: 'Mitsubishi FX2N / FX3U / FX3G / FX3S'
},
{
  val: 'melc24',
  label: 'Mitsubishi MC Protocol full - duplex for MELSEC - Q and C24 module'
},
{
  val: 'finshl',
  label: 'Omron FINS on Host Link'
},
{
  val: 'omrhls',
  label: 'Omron Host Link(single)'
},
{
  val: 'omrhlm',
  label: 'Omron Host Link(multiple)'
},
{
  val: 's539rk',
  label: 'Siemens 3964R / RK512 for S5'
},
{
  val: 's739rk',
  label: 'Siemens 3964R / RK512 for S7'
},
{
  val: 'tsxmbr',
  label: 'Schneider Modbus RTU'
},
{
  val: 'unite',
  label: 'Schneider Telemecanique UNI - TE'
},
{
  val: 'comli',
  label: 'ABB SattControl Comli'
}
]

export const AttributeTypeList = [{
  val: 'word'
},
{
  val: 'uword'
},
{
  val: 'dword'
},
{
  val: 'udword'
},
{
  val: 'float'
},
{
  val: 'double'
},
{
  val: 'bit'
}
]

export const Operator = [{
  val: '>'
},
{
  val: '>='
},
{
  val: '=='
},
{
  val: '<'
},
{
  val: '<='
},
{
  val: '!='
},
{
  val: '&'
},
{
  val: '^'
},
{
  val: '|'
}
]

export const EventCategory = [{
  val: 'critical'
},
{
  val: 'alarm'
},
{
  val: 'warning'
},
{
  val: 'event'
},
{
  val: 'view'
}
]

export const ScriptList = [{
  val: 'COMMENT'
},
{
  val: 'DECLARE'
},
{
  val: 'INIT'
}, {
  val: 'DO'
}, {
  val: 'IF'
}, {
  val: 'THEN'
}, {
  val: 'ELSE IF'
}, {
  val: 'ELSE'
}, {
  val: 'POS'
}
]

export const UserLevels = [{
  label: 'VIEW(0)',
  key: 0
}, {
  label: 'OPERATOR(1)',
  key: 1
}, {
  label: 'FOREMAN(2)',
  key: 2
}, {
  label: 'MAINENANCE(3)',
  key: 3
}, {
  label: 'SUPERVISOR(4)',
  key: 4
}, {
  label: 'ENGINEER(5)',
  key: 5
}, {
  label: 'DESIGNER(6)',
  key: 6
}, {
  label: 'MANAGER(7)',
  key: 7
}]
