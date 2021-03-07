<template>
  <example-wrapper title="Rectangles and Circles">
    <div class="instructions">
      <label><input type="checkbox" v-model="editable" /> Editable</label>
      <label><input type="checkbox" v-model="draggable" /> Draggable</label>
    </div>
    <template #description>
      <p>We can also add rectangles and circles.</p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-rectangle
          :bounds="bounds"
          :draggable="draggable"
          :editable="editable"
          @bounds_changed="bounds = $event"
          fillColor="red"
          strokeColor="dodgerblue"
          strokeWeight="5"
        />
        <gmaps-circle
          :center="center"
          :draggable="draggable"
          :editable="editable"
          :radius="radius"
          @click="fire('circle')"
          @center_changed="circle = $event"
          @radius_changed="radius = $event"
          fillColor="yellow"
          strokeColor="green"
          strokeWeight="5"
        />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { gmapsMap, gmapsRectangle, gmapsCircle } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

export default defineComponent({
  name: 'ExampleShape',
  components: { ExampleWrapper, gmapsMap, gmapsRectangle, gmapsCircle },
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
    const draggable = ref(false)
    const editable = ref(false)
    let bounds = ref({
      east: 153.12,
      north: -27.44,
      west: 153.0,
      south: -27.58
    })
    let center = ref({ lat: -27.479, lng: 152.937 })
    let radius = ref(5000)

    return {
      mapOptions,
      draggable,
      editable,
      bounds,
      center,
      radius
    }
  }
})
</script>
