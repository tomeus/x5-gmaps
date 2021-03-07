<template>
  <example-wrapper title="Minimal Map">
    <template #description>
      <p>
        This is just a map using the default center position and zoom level
        (which are the minimum required options)
      </p>
    </template>
    <template #map>
      <gmaps-map />
    </template>
  </example-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gmapsMap } from 'x5-gmaps'
import ExampleWrapper from '../Wrapper.vue'

export default defineComponent({
  name: 'ExampleMap',
  components: { ExampleWrapper, gmapsMap }
})
</script>
