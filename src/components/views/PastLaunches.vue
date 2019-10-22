<template>
  <div id="past-launches" class="container">
    <h3 id="message" v-if="pastLaunches.length===0">Retrieving Launches...</h3>
    <h3 v-else class="text-white">Launches: {{pastLaunches.length}}</h3>
    <div class="grid">
      <app-launch :key="launch.flight_number" v-for="launch in pastLaunches" :launch="launch"></app-launch>
    </div>
  </div>
</template>

<script>
import Launch from "../Launch";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "past-launches",
  components: {
    appLaunch: Launch
  },
  computed: {
    ...mapGetters("launches/", ["pastLaunches"])
  },

  methods: {
    ...mapActions("launches/", ["setPastLaunches"])
  },
  created() {
    if (this.pastLaunches.length === 0) {
      this.setPastLaunches();
    }
  }
};
</script>

<style lang="scss">
#past-launches {
  .grid {
    display: grid;
    margin: 1rem 0;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0.7rem;
  }
  #message {
    color: white;
  }
}

@media only screen and (min-width: 400px) {
  #past-launches {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
@media only screen and (min-width: 600px) {
  #past-launches {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
@media only screen and (min-width: 800px) {
  #past-launches {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>