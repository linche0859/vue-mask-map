<template>
  <div id="app">
    <side-bar :markers="markers"></side-bar>
    <div class="container">
      <router-view :markers="markers"/>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import SideBar from '@/components/SideBar';

export default {
  name: 'App',
  components: {
    SideBar
  },
  data() {
    return {
      markers: new L.MarkerClusterGroup()
    };
  }
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

#app .container {
  width: 100%;
  height: 100%;
}
</style>
