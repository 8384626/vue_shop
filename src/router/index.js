import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>import('views/Login/login.vue')
const Home = () =>import('views/Home/home.vue')
const WelCome = () =>import('views/Home/HomeChildren/WelCome')
const Users= () =>import('components/content/User/Users.vue')
const Rights= () =>import('components/content/Power/Rights.vue')
const Roles= () =>import('components/content/Power/Roles.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/Login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:WelCome
      },
      {
        path:'/users',
        component:Users
      },
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/roles',
        component:Roles
      },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  // to将要访问的路径 from从哪个路径跳转 next表示放行
  if(to.path === '/login') return next();

  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
