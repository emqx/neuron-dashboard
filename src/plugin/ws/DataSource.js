import Vue from 'vue'
import BaseConfig from './config.js'
import router from '../../router'
import {
  Message
} from 'element-ui'
let dataSource

class DataSource {
  constructor (config = {}) {
    const {
      name,
      pass,
      success
    } = config
    const storage = JSON.parse(sessionStorage.getItem('user') || '{}')
    this.wsUri = BaseConfig.serverBaseUrl
    this.websocket = null
    this.type = 'datathread' // datathread
    this.wtrm = 'neuron'
    this.name = name || storage.name
    this.pass = pass || storage.pass
    this.onsuccess = new Set()
    this.tmp = null
    success && this.onsuccess.add(success)
    this.onclose = () => {
      Message.warning({
        message: 'socket closed',
        duration: 6000
      })
      console.log('socket closed')
      const currentName = window.location.href.split('/')[4]
      if (currentName !== 'login') {
        router.push({
          name: 'login'
        })
      }
    }
    this.onerror = (e) => {
      Message.error({
        message: 'socket error',
        duration: 6000
      })
      console.log('socket error')
      throw e
    }
  }
  connect () {
    this.close()

    return new Promise((resolve, reject) => {
      this.websocket = new WebSocket(this.wsUri, this.type)
      this.websocket.addEventListener('open', () => {
        var authInfo = {
          func: 10,
          name: this.name,
          pass: this.pass,
          wtrm: this.wtrm
        }
        var authText = JSON.stringify(authInfo)
        this.websocket.send(authText)
      })
      this.websocket.onclose = this.onclose
      this.websocket.onerror = this.onerror
      this.set({
        success: (data) => {
          if (data.func === 10) {
            if (data.errc) {
              dataSource = null
              reject(data.errc)
            } else {
              resolve({
                name: this.name,
                pass: this.pass
              })
            }
          }
        }
      })
    })
  }
  close () {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
      dataSource = null
    }
  }
  set (config = {}) {
    const {
      success
    } = config

    success && this.onsuccess.add(success)

    if (this.websocket && success) {
      this.websocket.onmessage = (e) => {
        const data = e.data && JSON.parse(e.data)
        this.onsuccess.forEach(i => {
          if (!data.wtrm || (data.wtrm === this.wtrm)) {
            if (data.errc) {
              Message.error({
                message: data.emsg,
                duration: 6000
              })
            }
            i(data)
          }
        })
      }
    }
    return this
  }
  remove (func) {
    this.onsuccess.delete(func)
  }
  send (msg) {
    if (msg) {
      msg.wtrm = this.wtrm
      if (typeof msg !== 'string') {
        msg = JSON.stringify(msg)
      }
      this.tmp = () => this.websocket.send(msg)
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
  test () {
    if (!this.websocket) {
      this.connect()
    }
    return this
  }
}

Vue.prototype.$ws = function getDataSource (config) {
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

Vue.prototype.$dataSource = dataSource
