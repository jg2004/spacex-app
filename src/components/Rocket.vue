<template>
  <div v-if="rocket" id="rocket">
    <h2>{{rocket.rocket_name}} ({{isActiveString}})</h2>
    <h3>First Flight: {{new Date(rocket.first_flight).toLocaleDateString()}}</h3>
    <h4>Description</h4>
    <p>{{rocket.description}}</p>
    <h4>Info</h4>
    <p>Cost per launch: {{rocket.cost_per_launch | currencyFormatter}}</p>
    <p>Success Rate: {{rocket.success_rate_pct}}%</p>
    <h4>Physical Characteristics</h4>
    <p>No. of stages: {{rocket.stages}}</p>
    <p>No. of boosters: {{rocket.boosters}}</p>
    <p
      v-if="rocket.landing_legs.number>0"
    >Landing Legs: {{rocket.landing_legs.number}} ({{rocket.landing_legs.material}})</p>

    <p>Diameter: {{rocket.diameter.feet}} ft.</p>
    <p>Mass: {{rocket.mass.lb.toLocaleString()}} lbs.</p>
    <p>Height: {{rocket.height.feet}} ft.</p>
    <h4>Engines</h4>
    <p>Number of engines: {{rocket.engines.number}}</p>
    <p>Type of engine: {{rocket.engines.type}}</p>
    <p>Propellants: {{rocket.engines.propellant_1}} + {{rocket.engines.propellant_2}}</p>
    <p>Thrust (first-stage): {{rocket.first_stage.thrust_sea_level.lbf.toLocaleString()}} lbf</p>

    <div id="rocket-image">
      <a target="_blank" :href="rocket.wikipedia">
        <img :src="rocket.flickr_images[0]" alt />
      </a>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/axios";
export default {
  name: "Rocket",

  props: {
    rocketDetail: {
      type: Object
    },
    rocketId: {
      type: String
    }
  },

  data() {
    return {
      rocket: null
    };
  },

  async created() {
    if (this.rocketDetail) {
      this.rocket = this.rocketDetail;
    } else {
      const response = await axiosInstance.get(`rockets/${this.rocketId}`);
      this.rocket = response.data;
    }
  },
  filters: {
    currencyFormatter(val) {
      return val.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
    }
  },
  computed: {
    isActiveString() {
      const firstFlightDate = new Date(this.rocket.first_flight);
      const now = new Date();

      if (this.rocket.active) {
        return "Active";
      }

      if (now >= firstFlightDate) {
        return "Retired";
      } else {
        return "In Development";
      }
    }
  }
};
</script>

<style scoped lang='scss'>
#rocket {
  background: white;

  margin: 1rem auto;
  padding: 1rem 2rem;
  max-width: 800px;

  h2,
  h3 {
    text-align: center;
  }

  h2,
  h3,
  h4 {
    margin-top: 0.7rem;
  }

  #rocket-image img {
    width: 85%;
    margin: 0.5rem auto;
    display: block;
  }
}
</style>