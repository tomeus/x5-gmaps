<template>
  <example-wrapper title="Map with options and events">
    <!-- TODO: Should this be a defined slot? -->
    <div class="instructions">
      <p class="instructions-title">
        Move the map to see a live update of its center.
      </p>
      <button class="instructions-action" @click="reset">Reset</button>
      <span>Center: {{ center }}</span>
    </div>
    <template #description>
      <p>
        You can add many
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions"
          target="_blank"
          >options</a
        >
        for the map in an options property object.<br />e.g. All controls turned
        off
      </p>
    </template>
    <template #map>
      <gmaps-map
        ref="map"
        :options="mapOptions"
        @center_changed="centerChanged"
      />
    </template>
  </example-wrapper>
</template>

<script lang="ts">
import { defineComponent, watchEffect, reactive, ref, Ref } from 'vue'
import { gmapsMap } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

export default defineComponent({
  name: 'ExampleMapOptions',
  components: { ExampleWrapper, gmapsMap },
  setup() {
    const mapOptions = reactive({
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    })
    let center: Ref<google.maps.LatLngLiteral> = ref(mapOptions.center)
    const centerChanged = (newCenter: google.maps.LatLng) =>
      (center.value = newCenter.toJSON())
    const reset = () => (mapOptions.center = { lat: -27.47, lng: 153.025 })
    return { mapOptions, centerChanged, center, reset }
  }
})
</script>
