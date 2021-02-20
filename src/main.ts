import { App, defineAsyncComponent } from 'vue'
import init, { apiOptionsType } from './init'
import './styles/index.scss'

const gmapsMap = defineAsyncComponent(() => import('./components/Map.vue'))

const install = (_app: App, options: apiOptionsType): void => {
  init(options)
}

export { gmapsMap }
export default install
