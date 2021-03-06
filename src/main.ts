import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from 'element-ui'
import topbar from '@/components/TopBar.vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementui)

Vue.config.productionTip = true;
Vue.config.devtools = true
new Vue({
  router,
  store,
  components: {
    topbar
  },
  render: h => h(App)
}).$mount("#app");
