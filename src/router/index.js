import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import taskDetail from '@/components/taskDetail'
import myReleaseTask from '@/components/myReleaseTask'
import myAcceptTask from '@/components/myAcceptTask'
import personalInfo from '@/components/personalInfo'
import personalPage from '@/components/personalPage'
import MainPage from '@/components/MainPage'
import taskSearch from '@/components/taskSearch'
import taskRelease from '@/components/taskRelease'
import groupSearch from '@/components/groupSearch'
import myGroup from '@/components/myGroup'
import createGroup from '@/components/createGroup'
import groupDetail from '@/components/groupDetail'
import defaultGroupDetail from '@/components/defaultGroupDetail'
import orgGroupDetail from '@/components/orgGroupDetail'
import modifyGroupInfo from '@/components/modifyGroupInfo'
import login from '@/components/login'
import register from '@/components/register'
import userInfo from '@/components/userInfo'
import deposit from '@/components/deposit'
import withdraw from '@/components/withdraw'
import questionnaire from '@/components/questionnaire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/login',
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      redirect: '/MainPage/taskSearch',
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
          component: myGroup,
        },
        {
          path: '/MainPage/createGroup',
          name: 'createGroup',
          component: createGroup
        },
        {
          path: '/MainPage/taskDetail/:id',
          name: 'taskDetail',
          component: taskDetail
        },
        {
          path: '/MainPage/groupDetail/:id',
          name: 'groupDetail',
          component: groupDetail
        },
        {
          path: '/MainPage/defaultGroupDetail/:id',
          name: 'defaultGroupDetail',
          component: defaultGroupDetail
        },
        {
          path: '/MainPage/orgGroupDetail/:name',
          name: 'orgGroupDetail',
          component: orgGroupDetail
        },
        {
          path: '/MainPage/groupDetail/:id/modifyInfo',
          name: 'modifyGroupInfo',
          component: modifyGroupInfo
        },
        {
          path: '/MainPage/questionnaire/:url',
          name: 'questionnaire',
          component: questionnaire
        }
      ]
    },
    {
      path: '/personalPage',
      name: 'personalPage',
      component: personalPage,
      children:[
        {
          path: '/personalPage/personalInfo',
          name: 'personalInfo',
          component: personalInfo
        },
        {
          path: '/personalPage/deposit',
          name: 'deposit',
          component: deposit
        },
        {
          path: '/personalPage/withdraw',
          name: 'withdraw',
          component: withdraw
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {	
      path: '/user/:username',
      name: 'userInfo',	
      component: userInfo	
    }
    
  ]
})
