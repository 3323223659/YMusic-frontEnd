import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: "登录"
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/homePage/Home.vue'),
    meta: {
      title: "首页"
    }
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/statistics/Statistics.vue'),
    meta: {
      title: "数据统计"
    }

  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/User.vue'),
    meta: {
      title: "用户管理"
    }
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('@/views/music/Music.vue'),
    meta: {
      title: "音乐管理"
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/Category.vue'),
    meta: {
      title: "分类管理"
    }
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import('@/views/playlist/Playlist.vue'),
    meta: {
      title: "歌单管理"
    }
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('@/views/singer/Singer.vue'),
    meta: {
      title: "歌手管理"
    }
  },
  {
    path: '/*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: "404未找到页面"
    }
  },

]

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  document.title = 'YMusic后台管理系统— ' + to.meta.title;
})

export default router
