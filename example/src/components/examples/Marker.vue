<template>
  <example-wrapper title="Markers">
    <template #description>
      <p>
        Inside that map we can add Google Map objects like the simple marker.<br />As
        a minimum, markers require a position object in its options prop or as a
        prop itself.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker v-for="(item, i) in items" :key="i" :position="item" />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { gmapsMap, gmapsMarker } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

export default defineComponent({
  name: 'ExampleMarker',
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
    const items: Ref<{ lat: number; lng: number }[]> = ref([])
    // Initiate items
    for (let i = 0; i < 20; i++)
      items.value.push({
        lat: -27.5 + Math.random() / 10 - 0.05,
        lng: 153 + Math.random() / 10 - 0.05
      })

    // Render
    return { mapOptions, items }
  }
})
</script>
