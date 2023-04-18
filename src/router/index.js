import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/home',
    redirect: '/home',
    component: () => import('../views/Manage.vue'),
      meta: {
          requireAuth: true,
      },
    children: [
        {path: '/user', name: '用户管理', component: () => import('../views/User.vue')},
        {path: '/home', name: '首页', component: () => import('../views/Home.vue')},
        {path: '/person', name: '个人信息',component: () => import('../views/Person.vue')},
        {path: '/log',name: '日志管理',component: () => import('../views/Log.vue')},
        {path: '/analysis',name: '日志分析',component: () => import('../views/LogAnalysis.vue')},
        {path: '/error',name: '错误日志',component: () => import('../views/Error.vue')},
        {path: '/rule',name: '规则管理',component: () => import('../views/Rule.vue')},
        {path: '/server',name: '服务器管理',component: () => import('../views/Server.vue')},
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新
    if (to.matched.some((r) => r.meta.requireAuth)) {
        //这里判断用户是否登录，验证本地存储是否有token
        if (!localStorage.getItem("user")) { // 判断当前的token是否存在
            console.log("未登录")
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})






export default router
