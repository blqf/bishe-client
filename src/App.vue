<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import defaultLayout from './components/layout.vue';
export default {
  components: {
    defaultLayout
  }
}
</script>
