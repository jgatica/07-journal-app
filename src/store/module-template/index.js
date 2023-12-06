import state from "@/store/module-template/state";
import * as actions from "@/store/module-template/actions";
import * as getters from "@/store/module-template/getters";
import * as mutations from "@/store/module-template/mutations";

const myCustomModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default myCustomModule