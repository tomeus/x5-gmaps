<template>
  <div class="gmaps-map">
    <!-- Error slot -->
    <template v-if="error">
      <slot name="error" :error="error">
        <span class="gmaps-error"> Error: {{ error.message }} </span>
      </slot>
    </template>
    <!-- Loading slot -->
    <template v-else-if="loading">
      <slot name="loading">
        <span class="gmaps-spinner"></span>
      </slot>
    </template>
    <!-- Map -->
    <div ref="dom_map" class="gmaps-map">
      <template v-if="!error && !loading && map">
        <slot :map="map" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  watch,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
} from 'vue'
import { getMaps } from '../api'

const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12,
}

export default defineComponent({
  name: 'GmapsMap',

  props: {
    timeout: { type: [Number, String], default: 5000 },
    options: { type: Object, default: (): Record<string, unknown> => ({}) },
  },

  emits: [
    'mounted',
    'bounds-changed',
    'center-changed',
    'click',
    'double-click',
    'right-click',
    'zoom-changed',
  ],

  setup(props, { emit }) {
    let _map: any | null = null // eslint-disable-line @typescript-eslint/no-explicit-any
    let _loading = ref(true)
    let _error: Ref<Error | null> = ref(null)
    const _handleError = (e: Error) => (_error.value = e)
    const dom_map = ref()

    provide('$map', _map)
    provide('$mapHandleError', _handleError)

    watch(
      () => props.options,
      (newVal) => {
        if (_map) _map.setOptions(newVal)
      },
      { deep: true }
    )

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getMaps().then((maps: any) => {
        _map = new maps.Map(dom_map.value, {
          ...defaultOptions,
          ...props.options,
        })
        emit('mounted', _map)
        _map.addListener('click', (e: Event) => emit('click', e))
        _map.addListener('dblclick', (e: Event) => emit('double-click', e))
        _map.addListener('rightclick', (e: Event) => emit('right-click', e))
        _map.addListener('bounds_changed', () => {
          if (_map) emit('bounds-changed', _map.getBounds())
        })
        _map.addListener('center_changed', () => {
          if (_map) emit('center-changed', _map.getCenter())
        })
        _map.addListener('zoom_changed', () => {
          if (_map) emit('zoom-changed', _map.getZoom())
        })
      })
    })

    onBeforeUnmount(() => {
      try {
        // TODO: Check this clears all listeners
        _map ? window.google.maps.event.clearInstanceListeners(_map) : null
      } catch (e) {
        _handleError(e)
      }
    })

    return { loading: _loading, error: _error, map: _map, dom_map }
  },
})
</script>
