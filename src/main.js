import Vue from 'vue';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.locatecontrol';
import 'leaflet.markercluster';
import App from './App.vue';
import router from './router';
import store from './store';

import dispatchActionForAllModules from '@/utils/dispatchActionForAllModules.js';

import {
  select,
  option,
  input,
  Message
} from 'element-ui';

Vue.config.productionTip = false;
Vue.use(select);
Vue.use(option);
Vue.use(input);

Vue.prototype.$message = Message;

(async function() {
  await dispatchActionForAllModules('init');
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
})();
