import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArticleList from '@/views/ArticleList'
import Article from '@/views/Article'
import store from '@/store'
import Column from '@/views/Column'
import UserInfo from '@/views/UserInfo'
import Editor from '@/views/Editor'
import Socket from '@/views/Socket'
import Games from '@/views/Games'
// import http from '@/api/http'\
import MHome from '@/mviews/MHome'
import MArticleList from '@/mviews/MArticleList'
import MArticle from '@/mviews/MArticle'
import MColumn from '@/mviews/MColumn'
import MUser from '@/mviews/MUser'

import isMobile from '@/core/isMobile'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (local) {
  return originalReplace.call(this, local).catch(err => err)
}

VueRouter.prototype.push = function (local) {
  return originalPush.call(this, local).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: ArticleList,
        meta: {
          path: '/index'
        }
      },
      {
        path: '/article/:id',
        name: 'article',
        component: Article,
        meta: {
          path: '/index'
        }
      },
      {
        path: '/column',
        name: 'column',
        component: Column,
        meta: {
          path: '/column'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: UserInfo,
        meta: {
          requireAuth: true,
          path: '/user'
        }
      },
      {
        path: '/editor',
        name: 'editor',
        component: Editor,
        // props: (route) => ({
        //   columnId: route.query.columnId
        // }),
        meta: {
          path: '/index'
        }
      },
      {
        path: '/games',
        name: 'games',
        component: Games,
        meta: {
          path: '/games'
        }
      },
      {
        path:'/socket',
        name:'socket',
        component:Socket,
        meta:{
          path:'/socket'
        }
      }
    ]
  },
  {
    path: '/m',
    name: 'mHome',
    redirect: '/m/articles',
    component: MHome,
    children: [
      {
        path: 'articles',
        name: 'mArticleList',
        component: MArticleList,
        meta: {
          title: '文章列表'
        }
      },
      {
        path: 'article/:id',
        name: 'mArticle',
        component: MArticle,
        // props: true,
        meta: {
          title: '文章',
        }
      },
      {
        path: 'column',
        name: 'mColumn',
        component: MColumn,
        meta: {
          title: '分类'
        }
      },
      {
        path: 'user',
        name: 'mUser',
        component: MUser,
        meta: {
          title: '我的'
        }
      },
    ]
  }
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let userAuth = to.meta.requireAuth
  if (userAuth && !store.state.token) {
    if (isMobile()) {
      Vue.prototype.$toast.fail('请先登录')
    } else {
      Vue.prototype.$notify.info({
        title: '通知',
        message: '请先登录'
      })
    }
    next('/index')
  }
  next()
})

export default router
