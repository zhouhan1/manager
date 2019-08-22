import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'
Vue.use(Router)

export default new Router({
  routes: [
      {
    	name:"home",
      path: '/',
      component:Home,
      children:[
      {
      		name:"user",
      path: '/user',
      component:User,
      }
      ]
    },
    {
    	name:"login",
      path: '/login',
      component:Login
    }
  ]
})
