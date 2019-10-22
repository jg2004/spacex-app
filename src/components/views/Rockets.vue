<template>
  <div id="rockets">
    <app-rocket :rocketDetail="rocket" :key="rocket.id" v-for="rocket in rockets"></app-rocket>
  </div>
</template>

<script>
import axiosInstance from "@/utils/axios";
import Rocket from "../Rocket";
export default {
  name: "Rockets",
  components: {
    appRocket: Rocket
  },
  data() {
    return {
      rockets: []
    };
  },

  async created() {
    const resp = await axiosInstance.get("rockets");
    this.rockets = resp.data;
  }
};
</script>

<style>
pre {
  color: white;
}
</style>