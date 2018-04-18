/**
 * 时间戳 的时间转换
 * @param time
 * @returns {string}
 */

export const dateFilter=(time)=>{
  const date=new Date(time);
  const year=date.getFullYear();
  const month=date.getMonth()+1;
  const day=date.getDate();
  const hours=date.getHours();
  const minute=date.getMinutes();
  let str=`${year}-${month}-${day} ${hours}:${minute}`;
  return str
};

export const scoreStatus=(score)=>{
  const num=Number(score);
  if(num>=0&&num<5){
    return "差"
  }else if(num<10){
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
