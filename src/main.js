import Vue from 'vue'
import App from './App.vue'
import path from 'path'
const fs = window.require("fs")

/* Other Code */

Vue.prototype.$path = path
Vue.prototype.$fs = fs

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
