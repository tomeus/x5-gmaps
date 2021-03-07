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

// FIXME: Defaults needed instead of defaults in props
const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12
}

export default defineComponent({
  name: 'GmapsMarker',

  props: {
    // https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Methods
    animation: { type: Number, default: undefined },
    clickable: { type: Boolean, default: undefined },
    draggable: { type: Boolean, default: undefined },
    icon: { type: [String, Object], default: undefined },
    label: { type: [String, Object], default: undefined },
    opacity: { type: [String, Number], default: undefined },
    options: { type: Object, default: () => ({}) },
    position: { type: Object, default: undefined },
    // TODO: shape: { type: Object, default: undefined },
    title: { type: String, default: undefined },
    visible: { type: Boolean, default: undefined },
    zIndex: { type: [String, Number], default: undefined },
    // Special
    delay: { type: [Number, String], default: 15 }
  },

  emits: [
    // https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events
    'animation_changed',
    'click',
    'clickable_changed',
    'contextmenu',
    'cursor_changed',
    'dblclick',
    'drag',
    'dragend',
    'draggable_changed',
    'dragstart',
    'flat_changed',
    'icon_changed',
    'mousedown',
    'mouseout',
    'mouseover',
    'mouseup',
    'position_changed',
    'rightclick',
    'shape_changed',
    'title_changed',
    'visible_changed',
    'zindex_changed'
  ],

  setup(props, { emit }) {
    // Data
    let marker: google.maps.Marker | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const getMap = inject('$getmap') as () => google.maps.Map
    const _handleError = inject('$gmapHandleError') as (
      e: Error,
      s: string
    ) => {}
    const handleError = (err: Error) => _handleError(err, 'Marker')

    // Options (computed)
    const options = computed(() => {
      const options: google.maps.MarkerOptions = { ...props.options }
      if (props.animation !== undefined) options.animation = props.animation
      if (props.clickable !== undefined) options.clickable = props.clickable
      if (props.draggable !== undefined) options.draggable = props.draggable
      if (props.icon !== undefined) options.icon = props.icon
      if (props.label !== undefined) options.label = props.label
      if (props.opacity !== undefined) options.opacity = +props.opacity
      if (props.position !== undefined)
        options.position = props.position as google.maps.LatLngLiteral
      if (props.title !== undefined) options.title = props.title
      if (props.visible !== undefined) options.visible = props.visible
      if (props.zIndex !== undefined) options.zIndex = +props.zIndex
      return options
    })
    // Options (watcher)
    // TODO: Can this be rolled into options?
    watch(
      () => props,
      () => {
        if (marker) marker.setOptions(options.value)
      },
      { deep: true }
    )

    // Set Listeners Method
    const setListeners = (t: google.maps.Marker) => {
      const ge = google.maps.event
      listeners.push(
        // Debounced
        ge.addListener(
          t,
          'position_changed',
          debounce(
            () => emit('position_changed', t.getPosition()?.toJSON()),
            +props.delay
          )
        ),
        ge.addListener(
          t,
          'drag',
          debounce((e: google.maps.MapMouseEvent) =>
            emit('drag', e.latLng.toJSON(), +props.delay)
          )
        ),
        // NOTE: No mousemove event 🤔
        // Not Debounced
        ge.addListener(t, 'animation_changed', () =>
          emit('animation_changed', t.getAnimation())
        ),
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) =>
          emit('click', e.latLng.toJSON())
        ),
        ge.addListener(t, 'clickable_changed', () =>
          emit('clickable_changed', t.getClickable())
        ),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) =>
          emit('contextmenu', e.latLng.toJSON())
        ),
        ge.addListener(t, 'cursor_changed', () =>
          emit('cursor_changed', t.getCursor())
        ),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) =>
          emit('dblclick', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) =>
          emit('dragend', e.latLng.toJSON())
        ),
        ge.addListener(t, 'draggable_changed', () =>
          emit('draggable_changed', t.getDraggable())
        ),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) =>
          emit('dragstart', e.latLng.toJSON())
        ),
        ge.addListener(t, 'flat_changed', (e: Event) =>
          emit('flat_changed', e)
        ),
        ge.addListener(t, 'icon_changed', () =>
          emit('icon_changed', t.getIcon())
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
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng.toJSON())
        ),
        ge.addListener(t, 'shape_changed', () =>
          emit('shape_changed', t.getShape())
        ),
        ge.addListener(t, 'title_changed', () =>
          emit('title_changed', t.getTitle())
        ),
        ge.addListener(t, 'visible_changed', () =>
          emit('visible_changed', t.getVisible())
        ),
        ge.addListener(t, 'zindex_changed', () =>
          emit('zindex_changed', t.getZIndex())
        )
      )
    }

    // Mounted
    onMounted(() => {
      if (!options.value.position)
        return handleError(
          new Error(
            'A position is required by every marker. Set this as either a position prop, or a position property of the options prop.'
          )
        )
      getMaps()
        .then((maps) => {
          const map = getMap()
          marker = new maps.Marker({ map, ...options.value })
          if (marker) setListeners(marker)
          else
            handleError(new Error('There was a problem creating the marker.'))
        })
        .catch((err) => handleError(err))
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      getMaps()
        .then((maps) => {
          if (marker) marker.setMap(null)
          maps.event.clearInstanceListeners(marker)
        })
        .catch((err) => handleError(err))
    })

    // Render (nothing)
    return () => {}
  }
})
</script>
