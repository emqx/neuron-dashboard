import { App } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { DataSourceConfig } from './ws'
import wsConifg from './config'
import { useRouter } from 'vue-router'
import { NeuronData } from '@/types/neuron'

let dataSource: DataSource | null = null

export class DataSource {
  wsUri!: string
  websocket!: WebSocket | null
  name!: string
  pass!: string
  type!: string
  wtrm!: string
  tmp!: (() => void) | null
  onclose!: () => void
  onerror!: (this: WebSocket, ev: Event) => Event
  onsuccess!: Set<DataSourceConfig['success']>
  constructor(config: DataSourceConfig = {}) {
    const { name, pass, success } = config
    const storage = JSON.parse(sessionStorage.getItem('user') || '{}')
    this.wsUri = wsConifg.serverBaseUrl
    this.websocket = null
    this.type = 'datathread'
    this.wtrm = 'neuron'
    this.name = name || storage.name
    this.pass = pass || storage.pass
    this.onsuccess = new Set()
    if (success) {
      this.onsuccess.add(success)
    }
    this.onclose = () => {
      const router = useRouter()
      EmqxMessage.warning({
        message: 'Socket closed',
        duration: 6000,
      })
      const currentName = window.location.href.split('/')[4]
      sessionStorage.removeItem('user')
      // localStorage.removeItem('chnl')
      // localStorage.removeItem('objectData')
      // localStorage.removeItem('eventData')
      // Store.commit('clearAlarmList')
      if (currentName !== 'login') {
        router?.push({
          name: 'Login',
        })
      }
    }
    this.onerror = (e) => {
      EmqxMessage.error({
        message: 'Socket error',
        duration: 6000,
      })
      throw e
    }
  }
  connect(): Promise<{
    name: string
    pass: string
  }> {
    return new Promise((resolve, reject) => {
      this.websocket = new WebSocket(this.wsUri, this.type)
      this.websocket.addEventListener('open', () => {
        const authInfo = {
          func: 10,
          name: this.name,
          pass: this.pass,
          wtrm: this.wtrm,
        }
        const authText = JSON.stringify(authInfo)
        this.websocket?.send(authText)
      })
      this.websocket.onclose = this.onclose
      this.websocket.onerror = this.onerror
      this.set({
        success: (data: NeuronData) => {
          if (data) {
            const { func, errc } = data
            if (func === 10) {
              if (errc) {
                dataSource = null
                reject(errc)
              } else {
                resolve({
                  name: this.name,
                  pass: this.pass,
                })
              }
            }
          }
        },
      })
    })
  }
  close(): void {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
      dataSource = null
    }
  }
  set(config: DataSourceConfig = {}): DataSource {
    const { success } = config
    if (success) {
      this.onsuccess.add(success)
    }
    if (this.websocket && success) {
      this.websocket.onmessage = (e: MessageEvent<NeuronData>) => {
        const data = e.data && JSON.parse(e.data.toString())
        this.onsuccess.forEach((successFunc) => {
          if (!data.wtrm || data.wtrm === this.wtrm) {
            if (data.errc) {
              EmqxMessage.error({
                message: data.emsg,
                duration: 6000,
              })
            }
            if (successFunc) {
              successFunc(data)
            }
          }
        })
      }
    }
    return this
  }
  remove(func: DataSourceConfig['success']): void {
    this.onsuccess.delete(func)
  }
  send(msg?: NeuronData): void {
    if (msg) {
      let $msg: NeuronData | string = msg
      $msg.wtrm = this.wtrm
      if (typeof $msg !== 'string') {
        $msg = JSON.stringify($msg)
      }
      this.tmp = () => this.websocket?.send($msg as string)
    }
    if (this.websocket && this.websocket.readyState !== 1) {
      if (this.tmp) {
        setTimeout(() => {
          this.send()
        }, 200)
      }
    } else if (this.websocket) {
      this.tmp && this.tmp()
      this.tmp = null
    }
  }
  test(): DataSource {
    if (!this.websocket) {
      this.connect()
    }
    return this
  }
}

function install(app: App): void {
  const ws = (config: DataSourceConfig = {}): DataSource => {
    if (!dataSource) {
      dataSource = new DataSource(config)
    } else {
      if (config) {
        if (config.name && config.pass) {
          dataSource = new DataSource(config)
        } else {
          dataSource.set(config)
        }
      }
    }
    return dataSource
  }
  app.config.globalProperties.$ws = ws
}

export default install
