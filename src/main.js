// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import axios from 'axios'
//Vue.prototype.axios = axios
import http from "@/plugins/http.js"
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.css'
Vue.use(ElementUI)
Vue.use(http)
Vue.config.productionTip = false
//处理日期格式
Vue.filter("fmtDate",(v)=>{
	return moment(v).format("YYYY-MM-DD")
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
