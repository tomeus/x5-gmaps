<template>
  <div class="gmaps-wrapper">
    <!-- Error slot -->
    <template v-if="error">
      <slot name="error" :error="error">
        <span class="gmaps-error">{{ error }}</span>
      </slot>
    </template>
    <!-- Loading slot -->
    <template v-else-if="loading">
      <slot name="loading">
        <span class="gmaps-spinner"></span>
      </slot>
    </template>
    <!-- Components -->
    <template v-else-if="map">
      <slot :map="map" />
    </template>
    <!-- Map -->
    <div
      v-show="!error && !loading && !!map"
      ref="root"
      class="gmaps-map"
    ></div>
  </div>
</template>

<script lang="ts">
import { debounce } from '../tools'
import {
  Ref,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch
} from 'vue'
import { getMaps } from '../api'

const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12
}

export default defineComponent({
  name: 'GmapsMap',

  props: {
    delay: { type: [Number, String], default: 15 },
    timeout: { type: [Number, String], default: 5000 },
    options: { type: Object, default: (): Record<string, unknown> => ({}) }
  },

  emits: [
    // https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events
    'bounds_changed',
    'center_changed',
    'click',
    'contextmenu',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'heading_changed',
    'idle',
    'maptypeid_changed',
    'mousemove',
    'mouseout',
    'mouseover',
    'projection_changed',
    'rightclick',
    'tilesloaded',
    'tilt_changed',
    'zoom_changed',
    //Special
    'mounted'
  ],

  setup(props, { emit }) {
    // Data
    let map: Ref<google.maps.Map | null> = ref(null)
    let loading = ref(true)
    let error: Ref<string | null> = ref(null)
    const root = ref()
    const listeners: google.maps.MapsEventListener[] = []

    // Methods
    const handleError = (e: Error, s: string) =>
      (error.value = `[${s}]: ${e.message}`)
    const getMap = () => map.value

    // Set Listeners
    const setListeners = (t: google.maps.Map) => {
      const ge = google.maps.event
      listeners.push(
        // Debounced
        ge.addListener(
          t,
          'bounds_changed',
          debounce(() => emit('bounds_changed', t.getBounds()), +props.delay)
        ),
        ge.addListener(
          t,
          'center_changed',
          debounce(() => emit('center_changed', t.getCenter()), +props.delay)
        ),
        ge.addListener(
          t,
          'drag',
          debounce((e: Event) => emit('drag', e), +props.delay)
        ),
        ge.addListener(
          t,
          'mousemove',
          debounce(
            (e: google.maps.MapMouseEvent) => emit('mousemove', e),
            +props.delay
          )
        ),
        // Not Debounced
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) =>
          emit('click', e.latLng.toJSON())
        ),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) =>
          emit('contextmenu', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) =>
          emit('dblclick', e.latLng.toJSON())
        ),
        // NOTE: dragend and dragstart do not return a mouse event
        ge.addListener(t, 'dragend', (e: Event) => emit('dragend', e)),
        ge.addListener(t, 'dragstart', (e: Event) => emit('dragstart', e)),
        ge.addListener(t, 'heading_changed', (e: Event) =>
          emit('heading_changed', t.getHeading())
        ),
        ge.addListener(t, 'idle', (e: Event) => emit('idle', e)),
        ge.addListener(t, 'maptypeid_changed', (e: Event) =>
          emit('maptypeid_changed', t.getMapTypeId())
        ),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) =>
          emit('mouseout', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseover', (e: google.maps.MapMouseEvent) =>
          emit('mouseover', e.latLng.toJSON())
        ),
        ge.addListener(t, 'projection_changed', (e: Event) =>
          emit('projection_changed', t.getProjection())
        ),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng.toJSON())
        ),
        ge.addListener(t, 'tilesloaded', (e: Event) => emit('tilesloaded', e)),
        ge.addListener(t, 'tilt_changed', (e: Event) =>
          emit('tilt_changed', t.getTilt())
        ),
        ge.addListener(t, 'zoom_changed', (e: Event) =>
          emit('zoom_changed', t.getZoom())
        )
      )
    }

    // Provides
    provide('$gmap', map)
    provide('$getmap', getMap)
    provide('$gmapHandleError', handleError)

    // Options
    watch(
      () => props.options,
      (newVal) => {
        if (map.value) map.value.setOptions(newVal)
      },
      { deep: true }
    )

    // Mounted
    onMounted(() => {
      getMaps().then((maps: any) => {
        map.value = new maps.Map(root.value, {
          ...defaultOptions,
          ...props.options
        })
        if (map.value) setListeners(map.value)
        else handleError(new Error('Map could not be loaded'), 'Map')
        loading.value = false
        emit('mounted', map.value)
      })
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      // TODO: Check this clears all listeners
      map ? window.google.maps.event.clearInstanceListeners(map) : null
    })

    // Render
    return { loading, error, map, root }
  }
})
</script>

<style lang="sass">
@import url('../styles/map.scss')
</style>
