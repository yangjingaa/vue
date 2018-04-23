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

/**
 * 登录
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login=(data)=>{
  return Axios.post("/sport/login", data)
    .then(res => {
      return resultCheck(res)
    })
};

/**
 * 注册
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const register = (data) => {
  return Axios.post("/sport/register", data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 获得健身器材列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const  getEquipment=(data={})=>{
  const url="/sport/getEquipment"+urlSplice(data);
  return Axios.get(url)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 添加设备信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const  addEquipment=(data={})=>{
  const url="/sport/addEquipment";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};
/**
 * 编辑设备信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const editEquipment=(data={})=>{
  const url="/sport/editEquipment";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 删除设备
 * @param data —id
 * @returns {Promise<AxiosResponse<any>>}
 */

export const deleteEquipment=(data)=>{
  const url="/sport/deleteEquipment";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 预约课程
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addReverse=(data)=>{
  const url="/sport/addReverse";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};
