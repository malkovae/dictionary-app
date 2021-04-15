<template>
  <div id="app" class="app">
    <AppWrapper/>
  </div>
</template>

<script>
import AppWrapper from './components/layout/AppWrapper.vue';

export default {
  name: 'App',
  components: {
    AppWrapper,
  },
};
</script>

<style lang="scss">
  .app {
    background-color: rgb(247, 244, 245);
  }
</style>
