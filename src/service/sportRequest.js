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
