import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import dispatchActionForAllModules from '@/utils/dispatchActionForAllModules.js';

import {
  select,
  option,
  input
} from 'element-ui';

Vue.config.productionTip = false;
Vue.use(select);
Vue.use(option);
Vue.use(input);

(async function() {
  await dispatchActionForAllModules('init');
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
})();
