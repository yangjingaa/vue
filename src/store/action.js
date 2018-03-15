export const setNameCount=function ({commit, state,getters}, value) {
  let names=getters.get_name;
  let values=value+names;
  commit("set_name",values);
};
