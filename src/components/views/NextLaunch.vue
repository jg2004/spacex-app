<template>
  <div v-if="currentLaunch" id="launch-detail">
    <h2>Flight Number {{currentLaunch.flight_number}}</h2>

    <h3>Mission Name: {{currentLaunch.mission_name}}</h3>

    <div class="box">
      <p>Launch Date: {{new Date(currentLaunch.launch_date_utc).toLocaleDateString()}}</p>
      <p>Launch Time: {{new Date(currentLaunch.launch_date_utc).toLocaleTimeString()}}</p>
      <p>Launch Site: {{currentLaunch.launch_site.site_name_long}}</p>
      <p id="rocket-link">
        Rocket name:
        <router-link
          :to="{name:'rocket-details',params:{rocketId:currentLaunch.rocket.rocket_id}}"
        >{{currentLaunch.rocket.rocket_name}}</router-link>
      </p>
      <p>Rocket type: {{currentLaunch.rocket.rocket_type}}</p>
      <br />
      <hr />
      <h3>Details</h3>
      <p>{{currentLaunch.details}}</p>
    </div>

    <h3>Payload Information</h3>
    <div class="box">
      <div :key="payload.payload_id" v-for="payload in currentLaunch.rocket.second_stage.payloads">
        <p>Payload ID: {{payload.payload_id}}</p>
        <p>Payload Type: {{payload.payload_type}}</p>
        <p v-if="payload.payload_mass_lbs">Payload mass (lbs): {{payload.payload_mass_lbs}}</p>
        <p>
          Customers:
          <span :key="index" v-for="(customer,index) in payload.customers">{{customer}}</span>
        </p>
        <p>Nationality: {{payload.nationality}}</p>
        <p>Manufacturer: {{payload.manufacturer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LaunchDetails",

  methods: {
    ...mapActions("launches", ["setCurrentLaunch"])
  },
  computed: {
    ...mapGetters("launches", ["currentLaunch"])
  },
  created() {
    this.setCurrentLaunch("next");
  }
};
</script>

<style scoped lang="scss">
#launch-detail {
  line-height: 1.3rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  background: white;

  #rocket-link {
    a {
      display: inline;
      color: blue;
    }
  }

  h1,
  h2,
  h3 {
    text-align: center;
    margin: 1rem 0;
  }
  .box {
    max-width: 600px;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 600px) {
  #launch-detail {
    margin: 0 auto;
  }
}
</style>