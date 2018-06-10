import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import("components/teachers/login/index");
const Home = () => import("components/teachers/home/index");
const Teachers = () => import("components/teachers/teacher/teacher");
const Course = () => import("components/teachers/course/course");
const Register = () => import("components/teachers/register/index");
const Personal = () => import("components/teachers/myInfo/index");
const ApplicationTeacher=()=>import("components/teachers/applicationTeacher/applicationTeacher");
const TeacherInfo=()=>import("components/teachers/teacherInfo/teacherInfo");
const UserList=()=>import("components/teachers/userList/userList");
const openCourse=()=>import("components/teachers/openCourse/openCourse");

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
      },{
        path:"openCourse",
        name:"openCourse",
        component:openCourse
      }]
    },

  ]
})
