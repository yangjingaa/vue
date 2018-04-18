import {dateFilter} from "../service/filter"

export const setNameCount=function ({commit, state,getters}, value) {
  let names=getters.get_name;
  let values=value+names;
  commit("set_name",values);
};

export const timeChange=function ({commit, state,getters}) {
  const teacherInfo=getters.get_teacher_info;
  console.log(teacherInfo);
  if(teacherInfo.time){
    const date=dateFilter(teacherInfo.time);
    teacherInfo.time=date;
    commit("set_teacher_info",teacherInfo);
  }
};
