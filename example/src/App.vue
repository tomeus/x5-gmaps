<template>
  <div class="wrapper">
    <div class="center">
      <img src="./assets/img/logo.svg" width="300" />
      <h1>x5-gmaps Example</h1>
    </div>
    <e-tutorials />
    <e-examples />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EExamples from './components/Examples.vue'
import ETutorials from './components/Tutorials.vue'

export default defineComponent({
  name: 'App',
  components: { EExamples, ETutorials }
})
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 800px;
}
.center {
  text-align: center;
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
