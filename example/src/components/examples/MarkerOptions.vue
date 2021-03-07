<template>
  <example-wrapper title="Markers with Options">
    <div class="instructions">
      <p class="instructions-title">
        Click on the flag to increase it's opacity (and it resets after being
        100%)
      </p>
      <p class="instructions-title">
        Move the bouncing pin to update its position data below
      </p>
      <p>Marker A Position: {{ positionA }}</p>
    </div>
    <template #description>
      <p>
        As with the map, there are also many
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions"
          target="_blank"
          >options</a
        >
        available for markers.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker :options="optionsA" @position_changed="updatePosition" />
        <gmaps-marker :options="optionsB" @click="increaseOpacity" />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, reactive } from 'vue'
import { gmapsMap, gmapsMarker, getMaps } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'
import markerImg from '../../assets/img/marker.png'
import markerImg2 from '../../assets/img/marker2.png'

export default defineComponent({
  name: 'ExampleMarkerOptions',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
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
    const optionsA = reactive({
      position: { lat: -27.46, lng: 153.02 },
      icon: markerImg,
      title: 'Marker A',
      draggable: true,
      animation: 1
    })
    const optionsB = reactive({
      position: { lat: -27.48, lng: 153.03 },
      icon: markerImg2,
      title: 'Marker B',
      opacity: 0.7
    })

    // Methods
    // FIXME: Not working
    const increaseOpacity = () => {
      const op = optionsB.opacity * 10
      optionsB.opacity = Math.round(op > 9 ? 5 : op + 1) / 10
    }
    // Position
    const positionA: Ref<google.maps.LatLngLiteral | null> = ref(null)
    const updatePosition = (pos: google.maps.LatLngLiteral) => {
      if (positionA) positionA.value = pos
    }

    return {
      mapOptions,
      optionsA,
      optionsB,
      increaseOpacity,
      positionA,
      updatePosition
    }
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
