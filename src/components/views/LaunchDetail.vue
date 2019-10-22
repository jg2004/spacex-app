<template>
  <div v-if="currentLaunch" id="launch-detail">
    <div v-if="flightNumber!=='latest'" class="page-buttons">
      <button :disabled="disablePrevButton" @click="decId" id="prev">
        <i class="fas fa-arrow-left fa-3x"></i>
      </button>
      <button :disabled="disableNextButton" @click="incId" id="next">
        <i class="fas fa-arrow-right fa-3x"></i>
      </button>
    </div>
    <h2>Flight Number {{currentLaunch.flight_number}}</h2>
    <img id="patch" :src="currentLaunch.links.mission_patch_small" alt />

    <h3>Mission Name: {{currentLaunch.mission_name}}</h3>

    <div class="box">
      <p
        class="text-align-center"
        v-if="currentLaunch.launch_success"
        :class="{'text-green':currentLaunch.launch_success}"
      >
        <strong>Launch was Successful!</strong>
      </p>

      <template v-else>
        <p class="text-align-center" :class="{'text-red':!currentLaunch.launch_success}">
          <strong>Launch was Unsuccessful</strong>
        </p>
        <br />
        <p
          :class="{'text-red':!currentLaunch.launch_success}"
        >Launch Failure Reason: {{currentLaunch.launch_failure_details.reason}}</p>
      </template>

      <br />
      <p>Launch Date: {{new Date(currentLaunch.launch_date_utc).toLocaleDateString()}}</p>
      <p>Launch Site: {{currentLaunch.launch_site.site_name_long}}</p>

      <p id="rocket-link">
        Rocket name:
        <router-link
          :to="{name:'rocket-details',params:{rocketId:currentLaunch.rocket.rocket_id}}"
        >{{currentLaunch.rocket.rocket_name}}</router-link>
      </p>
      <p>Rocket type: {{currentLaunch.rocket.rocket_type}}</p>
      <router-link
        v-if="currentLaunch.mission_id.length>0"
        class="btn"
        :to="{name:'mission-details',params:{mission_id:currentLaunch.mission_id[0]}}"
      >Mission Details</router-link>
      <br />
      <hr />
      <br />
      <p>{{currentLaunch.details}}</p>
    </div>

    <!-- <pre style="color:black">{{currentLaunch}}</pre> -->

    <h3>Payload Information</h3>
    <div class="box">
      <div
        :key="payload.payload_id"
        v-for="(payload,index) in currentLaunch.rocket.second_stage.payloads"
      >
        <strong>
          <p>Payload {{ index+1}} of {{currentLaunch.rocket.second_stage.payloads.length}}:</p>
        </strong>
        <p>Payload ID: {{payload.payload_id}}</p>
        <p>Payload Type: {{payload.payload_type}}</p>
        <p>Payload mass (lbs): {{ 'N/A' || payload.payload_mass_lbs.toLocaleString()}}</p>
        <p>
          Customers:
          <span :key="index" v-for="(customer,index) in payload.customers">{{customer}}</span>
        </p>
        <p>Nationality: {{payload.nationality}}</p>
        <p>Manufacturer: {{payload.manufacturer || 'N/A'}}</p>
        <br />
      </div>
      <div class="links">
        <a class="btn" :href="currentLaunch.links.article_link" target="_blank">Article</a>
        <a class="btn" :href="currentLaunch.links.video_link" target="_blank">Video</a>
      </div>
    </div>

    <div v-if="currentLaunch.links.flickr_images" id="flicker-images">
      <div v-for="(image, index) in currentLaunch.links.flickr_images" :key="index">
        <a :href="image" target="_blank">
          <img :src="image" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LaunchDetails",
  props: {
    flightNumber: {
      required: true,
      type: String
    }
  },

  // watch: {
  //   currentFlightNumber(newValue, oldValue) {
  //     this.setCurrentLaunch(newValue);
  //   }
  // },
  methods: {
    ...mapActions("launches", ["setCurrentLaunch", "clearCurrentLaunch"]),
    decId() {
      const prevFlightNumber = parseInt(this.flightNumber) - 1;
      this.$router.push(prevFlightNumber.toString());
    },
    incId() {
      const nextFlightNumber = parseInt(this.flightNumber) + 1;
      this.$router.push(nextFlightNumber.toString());
    }
  },
  computed: {
    ...mapGetters("launches", ["currentLaunch", "pastLaunches"]),
    disablePrevButton() {
      const currentFlightNumber = parseInt(this.flightNumber);
      return currentFlightNumber === 1 ? true : false;
    },
    disableNextButton() {
      const currentFlightNumber = parseInt(this.flightNumber);
      return currentFlightNumber === this.pastLaunches.length ? true : false;
    }
  },
  created() {
    this.clearCurrentLaunch();
    this.setCurrentLaunch(this.flightNumber);
  },

  beforeRouteUpdate(to, from, next) {
    // ...
    this.setCurrentLaunch(to.params.flightNumber);
    next();
  }
};
</script>



<style scoped lang="scss">
#launch-detail {
  line-height: 1.3rem;
  background-color: white;
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 2rem;

  .page-buttons {
    display: flex;
    justify-content: space-between;

    button {
      background: none;
      padding: 1rem;
      border: 2px solid #555;
      cursor: pointer;
      &:hover {
        background: #fafafa;
      }
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

  a {
    display: block;
  }
  #rocket-link {
    a {
      display: inline;
      color: blue;
    }
  }

  img#patch {
    display: block;
    margin: 2rem auto;
  }
  #flicker-images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    div {
      img {
        border-radius: 10px;
        width: 100%;
        padding: 0.3rem;
        height: 300px;
        object-fit: cover;
      }
    }
  }
  @media only screen and (min-width: 601px) {
    #flicker-images {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media only screen and (min-width: 900px) {
    #flicker-images {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (max-width: 600px) {
    #flicker-images {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (max-width: 400px) {
    #flicker-images {
      display: block;
    }
  }
}
</style>