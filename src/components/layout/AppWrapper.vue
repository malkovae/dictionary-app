<template>
  <div class="app-container">
    <div class="app-wrapper">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>

<script>

import Header from './Header.vue';

export default {
  name: 'AppWrapper',
  components: {
    Header,
  },
};

</script>

<style scoped lang='scss'>
  .app-container {
    max-width: 1140px;
    margin: 0 auto;
  }
  .app-wrapper {
    display: grid;
    grid-template-rows: 80px calc(100vh - 115px);
    grid-template-columns: 1fr;
    row-gap: 10px;
  }

  @media(max-width: 768px) {
  .app-wrapper {
    display: grid;
    grid-template-rows: 45px calc(100vh - 75px);
    row-gap: 5px;
  }
}
</style>
