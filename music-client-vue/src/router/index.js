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
    hidden: true,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/homePage/Home.vue'),
    children: [{
        path: '',
        name: 'HomeDefault',
        component: () => import('@/views/homePage/HomePage.vue'),
        meta: {
          title: '首页'
        }
      }, {
        path: '/music',
        name: 'Music',
        component: () => import('@/views/music/Music.vue'),
        meta: {
          title: '音乐'
        }
      }, {
        path: '/playlist',
        name: 'Playlist',
        component: () => import('@/views/playlist/Playlist.vue'),
        meta: {
          title: '歌单'
        }
      }, {
        path: '/singer',
        name: 'Singer',
        component: () => import('@/views/singer/Singer.vue'),
        meta: {
          title: '歌手'
        }
      }, {
        path: '/my',
        name: 'MY',
        component: () => import('@/views/my/My.vue'),
        meta: {
          title: '我的'
        }
      },
      {
        path: '/music/search/:name?',
        component: () => import('@/views/musicSearch/MusicSearch.vue'),
        meta: {
          title: '搜索音乐'
        }
      },
      {
        path: '/playlist/detail/:playlist',
        component: () => import('@/views/playlist/playlistDetail.vue'),
        meta: {
          title: '歌单详情'
        }
      },
      {
        path: '/singer/detail/:singer',
        component: () => import('@/views/singer/singerDetail.vue'),
        meta: {
          title: '歌手详情'
        }
      },
    ]
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
  document.title = 'YMusic音乐在线网站—' + to.meta.title;
})

export default router
