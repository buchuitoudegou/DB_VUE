import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import InfoQuery from "./views/InfoQuery.vue";
import Purchase from './views/Purchase.vue'
import _Storage from './views/Storage.vue'
import Sale from './views/Sale.vue'
import Finance from './views/Finance.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/info",
      name: "info",
      component: InfoQuery
    },
    {
      path: '/purchase',
      name: "purchase",
      component: Purchase
    },
    {
      path: '/storage',
      name: "storage",
      component: _Storage
    },
    {
      path: '/sale',
      name: '/sale',
      component: Sale
    },
    {
      path: '/finance',
      name: 'finance',
      component: Finance
    }
  ]
});
