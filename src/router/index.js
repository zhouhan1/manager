import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/rights/roles.vue'
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
      path: '/users',
      component:User,
      },
      {
      		name:"rights",
      path: '/rights',
      component:Rights,
      },
       {
      		name:"rights",
      path: '/roles',
      component:Roles,
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
