/* eslint-disable */
type $TSFixed = any
declare module '@emqx/emqx-ui'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
