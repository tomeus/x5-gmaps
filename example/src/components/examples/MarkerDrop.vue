<template>
  <example-wrapper title="Drop a Marker on the map">
    <div class="instructions">
      <p class="instructions-title">
        Click on the map to add a marker and click on a marker to remove it.
      </p>
    </div>
    <template #map>
      <gmaps-map :options="mapOptions" @click="addMarker">
        <gmaps-marker
          v-for="(m, i) in markers"
          :options="m"
          :key="i"
          @click="removeMarker(i)"
        />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { gmapsMap, gmapsMarker, getMaps } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

export default defineComponent({
  name: 'ExampleMarkerOptions',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
  setup() {
    // Data
    const markers: Ref<
      {
        position: google.maps.LatLngLiteral
        animation: google.maps.Animation | null
      }[]
    > = ref([])
    let mapOptions: google.maps.MapOptions = {
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    }

    // Methods
    const addMarker = (event: google.maps.LatLngLiteral) => {
      const position = event
      markers.value.push({ position, animation: 1 })
      stopBounce(position)
    }
    const removeMarker = (index: number) => markers.value.splice(index, 1)
    const stopBounce = (pos: google.maps.LatLngLiteral) =>
      setTimeout(() => {
        const m = markers.value.find(
          (e) => e.position.lat === pos.lat && e.position.lng === pos.lng
        )
        if (m) m.animation = null
      }, 2100)

    // Render
    return { mapOptions, markers, addMarker, removeMarker }
  }
})
</script>

<style scoped>
.eventsExample {
  border: 1px silver solid;
  background: #eee;
  padding: 10px;
}
.eventsExample p {
  display: inline-block;
}
</style>
