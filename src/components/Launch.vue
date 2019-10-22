<template>
  <div :class="{fail:!launch.launch_success}" class="card">
    <h3>{{launch.mission_name}}</h3>
    <h4>Flight No: {{launch.flight_number}}</h4>

    <router-link :to="{name:'launch-detail',params:{flightNumber:launch.flight_number.toString()}}">
      <img :src="launch.links.mission_patch_small" alt />
    </router-link>
    <h4>{{launch.launch_site.site_name}}</h4>
    <p>{{localDate(launch.launch_date_local)}}</p>
    <p>{{localTime(launch.launch_date_local)}}</p>
  </div>
</template>

<script>
export default {
  name: "launch",
  props: {
    launch: {
      required: true,
      type: Object
    }
  },
  methods: {
    localDate(date) {
      return new Date(date).toLocaleDateString();
    },
    localTime(date) {
      return new Date(date).toLocaleTimeString();
    }
  }
};
</script>


<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  // box-shadow: 2px 2px 5px #888888;
  background-color: #ffffff;
  &.fail {
    background-color: #b1432f;
    color: white;
  }

  h3,
  h4,
  p {
    text-align: center;
    font-size: 0.9rem;
  }

  img {
    width: 50%;
    height: auto;
    margin: 0.3rem auto 0.7rem auto;
    display: block;
    flex: 1;
  }
}
</style>