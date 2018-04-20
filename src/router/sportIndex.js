import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import("components/sport/login/login");
const Home = () => import("components/sport/home/home");
const Register = () => import("components/sport/register/register");
const Elements = () => import("components/sport/elements/elements");


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
      path:'/register',
      name:'register',
      component:Register
    },{
      path:"/home",
      name:"home",
      redirect:{name:"elements"},
      component:Home,
      children: [{
        path: "elements",
        name: "elements",
        component: Elements
      },]
    },
  ]
})
