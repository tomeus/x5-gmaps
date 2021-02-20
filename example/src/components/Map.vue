<template>
  <div style="height: 200px; width: 400px; margin: 0 auto">
    <gmaps-map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gmapsMap } from "x5-gmaps";

export default defineComponent({
  name: "App",
  components: { gmapsMap },
});
</script>
