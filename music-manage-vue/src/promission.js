import router from "@/router";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const whiteList = ['/login','/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if(store.getters.token){
    //存在token
    if(to.path === "/login"){
      next("/")
      nprogress.done()
    }else{
      next()
    }
  }else{
    //不存在token
    if(whiteList.includes(to.path)){
      next()
    }else{
      next('/login')
      nprogress.done()
    }
  }
  next()
})

router.afterEach(() => {
  nprogress.done()
})