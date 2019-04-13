import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import taskDetail from '@/components/taskDetail'
import myReleaseTask from '@/components/myReleaseTask'
import myAcceptTask from '@/components/myAcceptTask'
import userInf from '@/components/userInf'
import personalPage from '@/components/personalPage'
import MainPage from '@/components/MainPage'
import taskSearch from '@/components/taskSearch'
import taskRelease from '@/components/taskRelease'
import groupSearch from '@/components/groupSearch'
import myGroup from '@/components/myGroup'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/taskDetail/:id',
    //   name: 'taskDetail',
    //   component: taskDetail
    // },
    // {
    //   path: '/myReleaseTask',
    //   name: 'myReleaseTask',
    //   component: myReleaseTask
    // },
    // {
    //   path: '/myAcceptTask',
    //   name: 'myAcceptTask',
    //   component: myAcceptTask
    // },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/MainPage/taskSearch',
          name: 'taskSearch',
          component: taskSearch
        },
        {
          path: '/MainPage/taskRelease',
          name: 'taskRelease',
          component: taskRelease
        },
        {
          path: '/MainPage/myAcceptTask',
          name: 'myAcceptTask',
          component: myAcceptTask
        },
        {
          path: '/MainPage/myReleaseTask',
          name: 'myReleaseTask',
          component: myReleaseTask
        },
        {
          path: '/MainPage/groupSearch',
          name: 'groupSearch',
          component: groupSearch
        },
        {
          path: '/MainPage/myGroup',
          name: 'myGroup',
          component: myGroup
        },
        {
          path: '/MainPage/taskDetail/:id',
          name: 'taskDetail',
          component: taskDetail
        }
      ]
    },
    {
      path: '/personalPage',
      name: 'personalPage',
      component: personalPage,
      children:[
        {
          path: '/personalPage/userInf',
          name: 'userInf',
          component: userInf,
        }
      ]
    },
  
    
  ]
})
