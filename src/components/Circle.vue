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
import { debounce } from '../tools'

export default defineComponent({
  name: 'gmapsCircle',

  props: {
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions
    center: { type: Object, default: undefined },
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: 'black' },
    fillOpacity: { type: [String, Number], default: 0.3 },
    options: { type: Object, default: () => ({}) },
    radius: { type: [String, Number], default: undefined },
    strokeColor: { type: String, default: 'black' },
    strokeOpacity: { type: [String, Number], default: 1 },
    // TODO: Stroke position constants https://developers.google.com/maps/documentation/javascript/reference/polygon#StrokePosition
    strokePosition: { type: [String, Number], default: 0 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 },
    // Special
    delay: { type: [Number, String], default: 15 }
  },

  emits: [
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle-Events
    'center_changed',
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'radius_changed',
    'rightclick'
  ],

  setup(props, { emit }) {
    // Data
    let shape: google.maps.Circle | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const getMap = inject('$getmap') as () => google.maps.Map
    const _handleError = inject('$gmapHandleError') as (
      e: Error,
      s: string
    ) => {}
    const handleError = (err: Error) => _handleError(err, 'Circle')

    // Options (computed)
    const options = computed(() => {
      const options: google.maps.CircleOptions = { ...props.options }
      if (props.center !== undefined)
        options.center = props.center as google.maps.LatLngLiteral
      if (props.clickable !== undefined) options.clickable = props.clickable
      if (props.draggable !== undefined) options.draggable = props.draggable
      if (props.editable !== undefined) options.editable = props.editable
      if (props.fillColor !== undefined) options.fillColor = props.fillColor
      if (props.fillOpacity !== undefined)
        options.fillOpacity = +props.fillOpacity
      if (props.radius !== undefined) options.radius = +props.radius
      if (props.strokeColor !== undefined)
        options.strokeColor = props.strokeColor
      if (props.strokeOpacity !== undefined)
        options.strokeOpacity = +props.strokeOpacity
      if (props.strokePosition !== undefined)
        options.strokePosition = +props.strokePosition
      if (props.strokeWeight !== undefined)
        options.strokeWeight = +props.strokeWeight
      if (props.visible !== undefined) options.visible = props.visible
      if (props.zIndex !== undefined) options.zIndex = +props.zIndex
      return options
    })
    // Options (watcher)
    // TODO: Can this be rolled into options?
    watch(
      () => props,
      () => {
        if (shape) shape.setOptions(options.value)
      },
      { deep: true }
    )

    // Set Listeners Method
    const setListeners = (t: google.maps.Circle) => {
      const ge = google.maps.event
      listeners.push(
        // Debounced
        ge.addListener(
          t,
          'center_changed',
          debounce(() => emit('center_changed', t.getCenter()), +props.delay)
        ),
        ge.addListener(
          t,
          'radius_changed',
          debounce(() => emit('radius_changed', t.getRadius()), +props.delay)
        ),
        ge.addListener(
          t,
          'drag',
          debounce((e: google.maps.MapMouseEvent) => {
            emit('drag', e.latLng.toJSON(), +props.delay)
            console.log('circ - drag')
          })
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
        // NOTE: No contextmenu event 🤔
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) =>
          emit('dblclick', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) =>
          emit('dragend', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) =>
          emit('dragstart', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) =>
          emit('mousedown', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) =>
          emit('mouseout', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseover', (e: google.maps.MapMouseEvent) =>
          emit('mouseover', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) =>
          emit('mouseup', e.latLng.toJSON())
        ),
        ge.addListener(t, 'rightclick', (e: Event) => emit('rightclick', e))
      )
    }

    // Mounted
    onMounted(() => {
      if (!options.value.center || !options.value.radius)
        return handleError(
          new Error(
            'Center and Radius properties are required by every circle. Set these as either a position prop, or a position property of the options prop.'
          )
        )
      getMaps()
        .then((maps) => {
          const map = getMap()
          shape = new maps.Circle({ map, ...options.value })
          if (shape) setListeners(shape)
          else handleError(new Error('There was a problem creating the shape.'))
        })
        .catch((err) => handleError(err))
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      getMaps()
        .then((maps) => {
          if (shape) shape.setMap(null)
          maps.event.clearInstanceListeners(shape)
        })
        .catch((err) => handleError(err))
    })

    // Render (nothing)
    return () => {}
  }
})
</script>
