

import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import { workLocalStorage } from '../common/workLocalStorage'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },

  // beforeRouteEnter: (to, from, next) => {
  //   // ...
  //   console.log("abc: ",to.path);
  //   // if(1){
  //   //   console.log("999");
  //   //   next({name: "TextEditor"});
  //   // }else {
  //   //   next()
  //   // }
  // },
  routes: [
    layout('Default', [
      route('News', 'news'),

      // Components
      route('News', null, 'news'),
      route('Video', null, 'video'),
      route('ListVideo', null, 'ListVideo'),
      route('ListNews', null, 'ListNews'),
      route('Users', null, 'Users'),
      // route('Login1', null, 'component/Login'),
    ]),

    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import( '../views/Login.vue')
    // },
    // { path: '/news/', name: 'news', component: () => import('../views/News.vue') }
    { path: '/login', name: 'login', component: () => import('../views/login.vue') }
  ],
})

// router.beforeEach((to, from, next) => {
//   if (to.path == "/") {
//     return next({ path: '/news' });
//   }
//   return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
// })

router.beforeEach((to, from, next) => {
  var tokenWorkLocal = workLocalStorage("DataUser");
  if (!tokenWorkLocal.data()  && to.path != "/login/") {
    return next({ path: '/login/' });
  }
  // if (to.path == "/") {
  //   return next({ path: '/news' });
  // }
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
