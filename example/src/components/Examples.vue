<template>
  <div class="container">
    <h2>Examples</h2>
    <ul>
      <li v-for="(e, i) in examples" :key="i">
        • <a @click="select(i)" :title="e.desc">{{ e.name }}</a>
      </li>
    </ul>
    <template v-if="selected">
      <component :is="selected" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'Example-App',
  setup: () => {
    let selectedIndex = ref(-1)
    const select = (i: number) => (selectedIndex.value = i)
    const selected = computed(() => {
      if (selectedIndex.value < 0) return null
      return examples[selectedIndex.value].component
    })
    const examples = [
      {
        name: 'Map',
        component: defineAsyncComponent(() => import('./examples/Map.vue')),
        desc: 'The core map component'
      },
      {
        name: 'Map with Options',
        component: defineAsyncComponent(
          () => import('./examples/MapOptions.vue')
        ),
        desc: 'The core map component with some options'
      },
      {
        name: 'Move to Location',
        component: defineAsyncComponent(
          () => import('./examples/SetPosition.vue')
        ),
        desc: 'Set center of map to current location'
      },
      {
        name: 'Markers',
        component: defineAsyncComponent(() => import('./examples/Marker.vue')),
        desc: 'Include a collection of markers on the map'
      },
      {
        name: 'Markers with Options',
        component: defineAsyncComponent(
          () => import('./examples/MarkerOptions.vue')
        ),
        desc: 'Fancy markers'
      },
      {
        name: 'Drop a Marker',
        component: defineAsyncComponent(
          () => import('./examples/MarkerDrop.vue')
        ),
        desc: 'Drop a marker where you click'
      },
      {
        name: 'Polylines and Polygons',
        component: defineAsyncComponent(
          () => import('./examples/Polyline.vue')
        ),
        desc: 'Polyline and polygon map components'
      },
      {
        name: 'Rectangles and Circles',
        component: defineAsyncComponent(() => import('./examples/Shape.vue')),
        desc: 'Rectangle and circle map components'
      }
      // { name: 'InfoWindows', component: () => import('./examples/InfoWindow.vue'), desc: 'An info window component' },
      // {
      //   name: 'DOM Elements / Popup',
      //   component: () => import('./examples/Popup.vue'),
      //   desc: 'Adding DOM elements to the map'
      // },
      // { name: 'Heatmap', component: () => import('./examples/Heatmap.vue'), desc: 'A heatmap component to visualise data' },
      // {
      //   name: 'Weighted Heatmap',
      //   component: () => import('./examples/HeatmapWeighted.vue'),
      //   desc: 'A heatmap component with custom weighting to data'
      // },
    ]

    return { selected, select, examples }
  }
})
</script>

<style scoped>
a {
  text-decoration: underline;
  color: mediumblue;
  cursor: pointer;
}
li {
  width: 33%;
  display: inline-block;
}
@media screen and (max-width: 900px) {
  li {
    width: 50%;
  }
}
@media screen and (max-width: 500px) {
  li {
    width: 100%;
  }
}
</style>

<style>
.instructions {
  border: 1px silver solid;
  background: #eee;
  padding: 10px;
}
.instructions-title {
  color: dodgerblue;
}
.instructions-title::before {
  content: 'ℹ ';
}
.instructions-action {
  display: inline-block;
  margin: 0 10px;
}
</style>
