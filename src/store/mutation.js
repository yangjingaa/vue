import * as type from "./mutationType"

const mutation={
  [type.set_name](state,name){
    state.name=name;
  },
  [type.set_name_array](state,nameArray){
    state.nameArray=nameArray;
  },
  [type.set_name_object](state,nameObject){
    state.nameObject=nameObject;
  },
  [type.set_teacher_info](state,teacherObject){
    state.teacherInfo=teacherObject;
  },
};

export default mutation
