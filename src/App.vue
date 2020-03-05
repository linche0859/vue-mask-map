<template>
  <div id="app">
    <side-bar></side-bar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar';

export default {
  name: 'App',
  components: {
    SideBar
  }
};
</script>

<style>
#app {
  display: flex
}

#app .container {
  width: 100%;
}
/* #app {
  font-family: "Noto Sans TC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
