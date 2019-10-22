import axiosInstance from "@/utils/axios";

const namespaced = true;
const state = {
  pastLaunches: [],
  currentLaunch: null
};

const getters = {
  pastLaunches: state => state.pastLaunches,
  currentLaunch: state => state.currentLaunch
};

const mutations = {
  SET_PAST_LAUNCHES: (state, data) => {
    state.pastLaunches = data;
  },
  SET_CURRENT_LAUNCH: (state, currentLaunch) => {
    state.currentLaunch = currentLaunch;
  },
  CLEAR_CURRENT_LAUNCH: state => {
    state.currentLaunch = null;
  }
};

const actions = {
  clearCurrentLaunch: context => {
    context.commit("CLEAR_CURRENT_LAUNCH");
    console.log("clearing launch", context.state.currentLaunch);
  },
  setPastLaunches: async context => {
    const resp = await axiosInstance.get("launches/past");
    console.log(resp.data[3]);
    context.commit("SET_PAST_LAUNCHES", resp.data);
  },
  setCurrentLaunch: async (context, flightNumber) => {
    const resp = await axiosInstance.get(`launches/${flightNumber}`);
    console.log(resp.data);
    context.commit("SET_CURRENT_LAUNCH", resp.data);
  }
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
