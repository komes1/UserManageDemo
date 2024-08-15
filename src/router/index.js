import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from '../views/UserManage.vue'
import AddBook from '../views/AddUser.vue'
import Index from '../views/Index'
import Update from '../views/Update'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    show: true,
    name: '用户管理',
    component: Index,
    redirect: '/manage',
    children: [
      {
        path: '/manage',
        name: '用户列表',
        component: BookManage
      },
      // {
      //   path: '/add',
      //   name: '新增用户',
      //   component: AddBook
      // }
    ]
  },
  {
    show: false,
    path: '/update',
    component: Update
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
