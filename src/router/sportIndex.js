import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import("components/sport/login/login");
const Home = () => import("components/sport/home/home");
const Register = () => import("components/sport/register/register");
const Elements = () => import("components/sport/elements/elements");
const Reservation = () => import("components/sport/reservation/reservation");
const vipCard = () => import("components/sport/vipcard/vipcard");
const personalInfo = () => import("components/sport/personalInfo/personalInfo");
const coach = () => import("components/sport/coach/coach");
const userManage = () => import("components/sport/userManage/userManage");
const course = () => import("components/sport/course/course");



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "login"
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: "/home",
      name: "home",
      redirect: {name: "elements"},
      component: Home,
      children: [
        {
          path: "elements",
          name: "elements",
          component: Elements
        },
        {
          path: "reservation",
          name: "reservation",
          component: Reservation
        },
        {
          path:"vipCard",
          name:"vipCard",
          component:vipCard
        },{
          path:"personalInfo",
          name:"personalInfo",
          component:personalInfo
        },{
          path:"coach",
          name:"coach",
          component:coach
        },{
          path:"userManage",
          name:"userManage",
          component:userManage
        },{
          path:"course",
          name:"course",
          component:course
        }]
    },
  ]
})
