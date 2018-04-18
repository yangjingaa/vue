import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import("components/sport/login/login");
const Home = () => import("components/sport/home/home");
const Register = () => import("components/sport/register/register");


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
    },
  ]
})
