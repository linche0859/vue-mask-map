<template>
  <div class="home" id="mapId">
  </div>
</template>

<script>
// @ is an alias to /src
import L from 'leaflet';
import buildMap from '@/utils/buildMap.js';
import addMarker from '@/utils/addMarker.js';
import { pharmaciesComputed } from '@/store/help.js';

export default {
  name: 'Home',
  props: {
    markers: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      map: {},
      // 使用者地理位置
      userGeolocation: {
        latitude: 25.04828,
        longitude: 121.51435
      }
    };
  },
  computed: {
    ...pharmaciesComputed
  },
  mounted() {
    // 使用者地理位置
    const geolocation = navigator.geolocation;
    if (geolocation) {
      const vm = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.userGeolocation.latitude = position.coords.latitude;
        vm.userGeolocation.longitude = position.coords.longitude;
      });
    }
    this.map = L.map('mapId', {
      center: [this.userGeolocation.latitude, this.userGeolocation.longitude],
      zoom: 16
    });
    buildMap(this.map);
    addMarker(this.allPharmacies, this.map, this.markers);
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
