import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import("components/login/index");
const Home = () => import("components/home/index");
const Teachers = () => import("components/teacher/teacher");
const Course = () => import("components/course/course");
const Register = () => import("components/register/index");
const Personal = () => import("components/personal/index");
const ApplicationTeacher=()=>import("components/applicationTeacher/applicationTeacher");
const TeacherInfo=()=>import("components/teacherInfo/teacherInfo");
const UserList=()=>import("components/userList/userList");

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
    {
      path: '/home',
      name: "home",
      redirect:{name:"course"},
      component: Home,
      children: [{
        path: "teacher",
        name: "teacher",
        component: Teachers
      }, {
        path: "courseList",
        name: "courseList",
        component: Login
      },{
        path:"course",
        name:"course",
        component:Course,
      },{
        path:"personal",
        name:"personal",
        component:Personal
      },{
        path:"applicationTeacher",
        name:"applicationTeacher",
        component:ApplicationTeacher
      },{
        path:"teacherInfo/:id",
        name:"teacherInfo",
        component:TeacherInfo
      },{
        path:"userList",
        name:"userList",
        component:UserList
      }]
    },

  ]
})
