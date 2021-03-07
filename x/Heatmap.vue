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
  name: 'gmapsHeatmap',

  props: {
    colors: { type: Array, default: null },
    dissipating: { type: Boolean, default: true },
    items: { type: Array, required: true },
    maxIntensity: { type: [String, Number], default: null },
    opacity: { type: [String, Number], default: null },
    options: { type: Object, default: () => ({}) },
    radius: { type: [String, Number], default: null },
    weightProp: { type: String, default: null }
  },

  setup(props, { emit }) {
    // Data
    let heatmap:google.maps.OverlayView | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const getMap = inject('$getmap') as () => google.maps.Map
    const handleError = inject('$gmapHandleError') as (e: Error) => {}

    // Options (computed)
    const options = computed(() => {
      const options = { ...props.options }
      if (props.icon) options.icon = props.icon
      if (props.label) options.label = props.label
      if (props.opacity) options.opacity = props.opacity
      if (props.position) options.position = props.position
      if (props.title) options.title = props.title
      if (props.visible) options.visible = props.visible
      if (props.zIndex) options.zIndex = +props.zIndex
      return options
    })
    // Options (watcher)
    // TODO: Can this be rolled into options?
    watch(
      () => props.options,
      (newVal) => {
        if (heatmap) heatmap.setOptions(newVal)
      },
      { deep: true }
    )


  computed: {
    _options() {
      const options = { dissipating: this.dissipating }
      if (this.colors) options.gradient = ['rgba(0,0,0,0)', ...this.colors]
      if (this.maxIntensity) options.maxIntensity = +this.maxIntensity
      if (this.opacity) options.opacity = +this.opacity
      if (this.radius) options.radius = +this.radius
      return options
    }
  },
  methods: {
    getData(GMaps) {
      if (this.weightProp)
        return this.items.map((e) => ({ location: new GMaps.LatLng(e.lat, e.lng), weight: e[this.weightProp] }))
      return this.items.map((e) => new GMaps.LatLng(e.lat, e.lng))
    },
    updateData() {
      gmaps()
        .then((GMaps) => this.heatmap.setData(this.getData(GMaps)))
        .catch((e) => this.handleError(e))
    }
  },
  mounted() {
    gmaps()
      .then((GMaps) => {
        this.heatmap = new GMaps.visualization.HeatmapLayer({
          map: this.getMap(),
          data: this.getData(GMaps),
          options: { ...this._options }
        })
      })
      .catch((e) => this.handleError(e))
  },
  watch: {
    items() {
      this.updateData()
    },
    weightProp() {
      this.updateData()
    },
    _options(newVal) {
      this.heatmap.setOptions(newVal)
    }
  },
  beforeDestroy() {
    if (this.heatmap) this.heatmap.setMap(null)
  },
  render: () => null
}
</script>
