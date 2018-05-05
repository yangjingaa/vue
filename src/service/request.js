import Axios from "axios"
import {StatusCode} from "../public/message/index"
import {urlSplice} from "./tools"

//处理数据
const resultCheck = (res) => {
  return new Promise((resolve, reject) => {
    if (res.data.status == 0) {
      resolve(res.data)
    }
    if (res.data.status == 1) {
      reject(res.data.message);
    }

  })
};

//登录

export const login = (data) => {
  return Axios.post("/login", data)
    .then(res => {
      return resultCheck(res)
    })
};

//获取老师列表

export const getTeacherList = () => {
  return Axios.get("/teacher")
    .then(res => {
      return resultCheck(res)
    })
};



//获取申请老师列表

export const getAppTeacherList = () => {
  return Axios.get("/appTeacher")
    .then(res => {
      return resultCheck(res)
    })
};

//审核老师

export const confirmTeacher = (data) => {
  return Axios.post("/confirmTeacher", data)
    .then(res => {
      return resultCheck(res)
    })
};

//获取学生列表

export const getStudentList = () => {
  return Axios.get("/student")
};

//获取课程列表

export const getCourseList = (data = {}) => {
  const url="/course"+urlSplice(data);
  return Axios.get(url)
    .then(res => {
      return resultCheck(res)
    })
};


/**
 * 添加课程列表
 * @param data
 * @returns {AxiosPromise<any>}
 */

export const addCourse = (data) => {
  return Axios.post("/addCourse", data)
    .then(res => {
      return resultCheck(res)
    })
};

/**
 * 添加老师
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const addTeacher = (data) => {
  return Axios.post("/addTeacher", data)
    .then(res => {
      return resultCheck(res)
    })
};

//注册

export const register = (data) => {
  return Axios.post("/register", data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 向老师发送警告
 */
export const sendWarning=(data)=>{
  if(data){
    return Axios.post("/warning",data)
      .then(res=>{
        return resultCheck(res)
      })
  }
};

/**
 * 获取老师警告信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWarningInfo=(data)=>{
  if(data){
    const url="/warning"+urlSplice(data);

    return Axios.get(url)
      .then(res=>{
        return resultCheck(res)
      })
  }
};

/**
 * 辞退老师 参数老师ID 和管理员ID
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const dismissTeacher=(data)=>{
  if(data){
    console.log(data);
    return Axios.post("/dismissTeacher",data)
      .then(res=>{
        return resultCheck(res)
      })
  }
};
/**
 * 获得用户列表
 * @returns {Promise<AxiosResponse<any>>}
 */

export const getUserList=()=>{
  return Axios.get("/userList")
    .then(res=>{
      return resultCheck(res)
    })
};

/**
 * 删除用户
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const deleteUser=(data)=>{
  return Axios.post("/deleteUser",data)
    .then(res=>{
      return resultCheck(res)
    })
};

/**
 * 获得老师信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const  getTeacherInfo=(data)=>{
  const  url="/getTeacherInfo"+urlSplice(data);
  return Axios.get(url)
    .then(res=>{
      return resultCheck(res)
    })
};
/**
 * 恢复老师授权
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const recoveryteUser=(data)=>{
  return Axios.post("/recoveryteUser",data)
    .then(res=>{
      return resultCheck(res)
    })
};
/**
 * 筛选课程
 * @param  data 
 */
export const screenTable=(data)=>{
  return Axios.post("/screenTable",data)
  .then(res=>{
    return resultCheck(res)
  })
}
