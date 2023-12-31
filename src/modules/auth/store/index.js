import state from "@/modules/auth/store/state";
import * as actions from "@/modules/auth/store/actions";
import * as getters from "@/modules/auth/store/getters";
import * as mutations from "@/modules/auth/store/mutations";

const authModule = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default authModule