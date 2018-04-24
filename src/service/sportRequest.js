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
 * 获得用户信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserInfo=(data)=>{
  return Axios.post("/sport/getUserInfo", data)
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

/**
 * 獲得用戶 預約課程
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const getReservationEquipment=(data)=>{
  const url="/sport/reservationEquipment"+urlSplice(data);
  return Axios.get(url)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 取消預約
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const cancelRes=(data)=>{
  const url="/sport/cancelRes";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 获得设备预约时间
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getResTime=(data)=>{
  const url="/sport/getResTime"+urlSplice(data);
  return Axios.get(url)
    .then(res => {
        return resultCheck(res)
      }
    )
};
/**
 * 获取会员卡
 * @returns {Promise<AxiosResponse<any>>}
 */

export const getCard=(data={})=>{
  const url="/sport/getCard";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * t添加会员卡
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addVipCard=(data)=>{
  const url="/sport/addVipCard";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 编辑会员卡
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateCard=(data)=>{
  const url="/sport/updateCard";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};

/**
 * 购买会员卡
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

export const buyCards=(data)=>{
  const url="/sport/buyCards";
  return Axios.post(url,data)
    .then(res => {
        return resultCheck(res)
      }
    )
};
