import {getLocalData} from "./tools"
import { requestMethod, dataMethod } from "./index";

export const powerMiXin = {
  data(){
    return{
      teacher:{}
    }
  },
  created(){
    this.getTeacher();
  },
  computed: {
    power() {
      return getLocalData("user")[0].isAdmin === 0
    },
    teacherPower(){
      return getLocalData("user")[0].isAdmin === 2
    },

  },
  methods:{
    loginPower(){
      const power=getLocalData("user")[0].isAdmin === 0;
      return power;
    },
    userIsTeacher(){
      const isTeachers=getLocalData("teacher")||false;
      if(isTeachers&&isTeachers.isTeacher===1){
        return true;
      }else{
        return false;
      }
    },
    getTeacher(){
     this.teacher = dataMethod.getLocalData("teacher");
    }
  }
};
