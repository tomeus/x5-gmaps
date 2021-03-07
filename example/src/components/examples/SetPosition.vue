<template>
  <example-wrapper title="Set center of map to current location">
    <div class="instructions">
      <p class="instructions-title">
        Press the button below to center the map on your location. Make sure you
        grant access to your location if asked!
      </p>
      <button class="instructions-action" @click="getLocation">
        Move to my location
      </button>
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
      <gmaps-map ref="map" :options="mapOptions" />
    </template>
  </example-wrapper>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { gmapsMap } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

export default defineComponent({
  name: 'ExampleSetPosition',
  components: { ExampleWrapper, gmapsMap },
  setup() {
    // Data
    let center: google.maps.LatLngLiteral | null = null
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
    const setLocation = (pos: GeolocationPosition) => {
      mapOptions = {
        ...mapOptions,
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude }
      }
      center = { lat: pos.coords.latitude, lng: pos.coords.longitude }
    }
    const locationError = (error: GeolocationPositionError) => {
      if (error.PERMISSION_DENIED)
        alert('User denied the request for Geolocation.')
      else if (error.POSITION_UNAVAILABLE)
        alert('Location information is unavailable.')
      else if (error.TIMEOUT)
        alert('The request to get user location timed out.')
      else alert('An unknown error occurred.')
    }
    const getLocation = () => {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(setLocation, locationError)
      else alert('Geolocation is not supported by this browser.')
    }

    // Render
    return { center, mapOptions, setLocation, getLocation }
  }
})
</script>
