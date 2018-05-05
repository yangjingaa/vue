/**
 * 时间戳 的时间转换
 * @param time
 * @returns {string}
 */

export const dateFilter=(time,value)=>{
  const date=new Date(parseInt(time));
  let year=date.getFullYear();

  let month=date.getMonth()+1;
  let day=date.getDate();
  let hours=date.getHours();
  let minute=date.getMinutes();
  if(month<10){
    month="0"+month
  }
  if(day<10){
    day="0"+day
  }
  if(hours<10){
    hours="0"+hours
  }
  if(minute<10){
    minute="0"+minute
  }
  let str="";
  if(value){
    str=`${hours}:${minute}`
  }else {
    str=`${year}-${month}-${day} ${hours}:${minute}`;
  }
  return str
};

export const scoreStatus=(score)=>{
  const num=Number(score);
  if(num>=0&&num<=5){
    return "差"
  }else if(num<=10){
    return "良好"
  }else {
    return "好"
  }
};

/**
 * 根据isAdmin 整理角色名称
 * @param num
 * @returns {string}
 */

export const roleName = (num) => {
  num=Number(num);
  if (num === 0) {
    return "超级管理员"
  } else if (num === 2) {
    return "用户"
  } else if (num === 100) {
    return "被辞退"
  }
};
/**
 * 等级筛选
 * @param {} num 
 */
export const grade=(num)=>{
  num=Number(num);
  if (num === 0) {
    return "初级"
  } else if (num === 1) {
    return "中级"
  }else if (num === 2) {
    return "高级"
  } else if (num === 3) {
    return "顶级"
  }
}
