import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/rights/roles.vue'
import Goodslist from '@/components/goods/goodslist.vue'
import Goodsadd from '@/components/goods/goodsadd.vue'
import Cate from "@/components/goods/cate.vue"
import Goodscate from "@/components/goods/goodscate.vue"
Vue.use(Router)

const router = new Router({
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
      },
      {
      name:"goodslist",
      path: '/goods',
      component:Goodslist,
      },
            {
      name:"goodsadd",
      path: '/goodsadd',
      component:Goodsadd,
      },
       {
      name:"cate",
      path: '/params',
      component:Cate
      } ,
       {
      name:"goodscate",
      path: '/categories',
      component:Goodscate
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
//路由守卫
// 路由的前置守卫
router.beforeEach((to, from, next) => {
if (to.name === 'login') {
    next()
} else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({ 'name': 'login' })
     this.$message.warning("请先登录");
      return
    }
    next()
}
})
export default router
