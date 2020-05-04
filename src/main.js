import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

library.add(fas);
Vue.component('vue-fontawesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome-icon',
  defaultIconPack: 'fa'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
