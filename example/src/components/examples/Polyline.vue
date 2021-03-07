<template>
  <example-wrapper title="Polylines and Polygons">
    <div class="instructions">
      <p class="instructions-title">
        Polygons are basically the same as polylines but are able to be filled
        in.
      </p>

      <button class="instructions-action" @click="switchType">
        Switch to {{ polygon ? 'Polyline' : 'Polygon' }}
      </button>
      <button class="instructions-action" @click="generatePoints">
        Regenerate points
      </button>
      <label><input type="checkbox" v-model="editable" />Editable</label>
    </div>
    <template #description>
      <p>We can also add polylines.</p>
      {{ polygon }}
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-polygon
          v-if="polygon"
          :editable="editable"
          :paths="items"
          @path_changed="pathsChanged"
          fillColor="red"
          strokeColor="dodgerblue"
          strokeWeight="5"
        />
        <gmaps-polyline
          v-else
          :editable="editable"
          :icons="icons"
          :path="items[0]"
          @path_changed="pathChanged"
          strokeColor="dodgerblue"
          strokeWeight="5"
        />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>


<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { gmapsMap, gmapsPolyline, gmapsPolygon } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

const icon = {
  path: 'M -2,0 0,-2 2,0 0,2 z',
  strokeColor: '#F00',
  fillColor: '#F00',
  fillOpacity: 1
}

export default defineComponent({
  name: 'ExamplePolyline',
  components: { ExampleWrapper, gmapsMap, gmapsPolyline, gmapsPolygon },
  setup() {
    // Data
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    }
    const editable = ref(false)
    const polygon = ref(false)
    // TODO: Rename to points?
    const items: Ref<google.maps.LatLngLiteral[][]> = ref([])
    const icons = [
      { icon, offset: '0%' },
      { icon, offset: '100%' }
    ]

    const generatePoints = () => {
      const temp = []
      for (let i = 0; i < 5; i++)
        temp.push({
          lat: -27.6 + Math.random() / 5,
          lng: 152.9 + Math.random() / 5
        })
      items.value = [temp]
    }
    generatePoints()

    const pathChanged = (e: google.maps.LatLngLiteral[]) => (items.value = [e])

    const pathsChanged = (e: google.maps.LatLngLiteral[][]) => (items.value = e)

    const switchType = () => (polygon.value = !polygon.value)

    return {
      mapOptions,
      editable,
      polygon,
      items,
      icons,
      generatePoints,
      pathChanged,
      pathsChanged,
      switchType
    }
  }
})
</script>
