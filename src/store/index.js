import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import launches from "./modules/launches";

const store = new Vuex.Store({
  modules: {
    launches
  }
});

export default store;
