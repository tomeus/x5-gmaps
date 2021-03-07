<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  watch
} from 'vue'
import { getMaps } from '../api'

export default defineComponent({
  name: 'gmapsInfoWindow',

  props: {
    opacity: { type: [String, Number], default: null },
    options: { type: Object, default: () => ({}) },
    position: { type: Object, default: null },
    title: { type: String, default: null },
    open: { type: Boolean, default: null },
    zIndex: { type: [String, Number], default: null }
  },

  emits: [
    // https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events
    'closeclick',
    'content_changed',
    'domready',
    'position_changed',
    'zindex_changed'
  ],


  data: () => ({ infoW: null }),
  methods: {
    open() {
      this.infoW.open(this.getMap())
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.infoW.setOptions(this.options)
      }
    }
  },
  mounted() {
    if (!this.options.position) return this.handleError('InfoWindow options require a position property.')
    gmaps()
      .then((GMaps) => (this.infoW = new GMaps.InfoWindow({ content: this.$el, ...this.options })))
      .then(() => this.infoW.addListener('closeclick', () => this.$emit('closed')))
      .then(() => this.open())
      .catch((e) => this.handleError(e))
  },
  beforeDestroy() {
    if (this.infoW) this.infoW.close()
  },
  render: () => null
}
</script>