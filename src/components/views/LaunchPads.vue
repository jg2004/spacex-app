<template>
  <div id="launch-pads">
    <h1>Launch Pads</h1>

    <div v-for="(pad, index) in launchPads" :key="index" class="card">
      <h2>{{pad.site_name_long}}</h2>
      <h3 :class="{'text-red':pad.status!=='active'}">[{{pad.status}}]</h3>

      <div id="info">
        <p>Location: {{pad.location.name}}, {{pad.location.region}}</p>

        <div id="vehicles-launched">
          <p>Vehicles Launched:</p>
          <span v-for="(vehicle, index) in pad.vehicles_launched" :key="index">{{vehicle}}</span>
        </div>
        <p>Attempted Launches: {{pad.attempted_launches}}</p>
        <p>Successful Launches: {{pad.successful_launches}}</p>
        <strong>
          <p
            v-if="pad.attempted_launches>0"
          >Success Rate: {{new Number(pad.successful_launches/pad.attempted_launches).toFixed(2)*100 || '0'}}%</p>
        </strong>
      </div>

      <p id="details">{{pad.details}}</p>

      <a :href="pad.wikipedia" class="btn">Wiki</a>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/axios";
export default {
  name: "LaunchPads",

  data() {
    return {
      launchPads: null
    };
  },

  async created() {
    const resp = await axiosInstance.get("launchpads");
    this.launchPads = resp.data;
  }
};
</script>

<style scoped lang='scss'>
#launch-pads {
  padding: 2rem 0;

  #info {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    margin: 1rem auto;
    width: 85%;
    max-width: 600px;
    background: #eee;
  }
  #details {
    margin-bottom: 1rem;
    line-height: 1.4;
    padding: 0 1.5rem;
  }
  h1 {
    color: white;
    font-weight: 400;
    text-align: center;
  }
  .card {
    background: white;
    width: 85%;
    max-width: 800px;
    margin: 1rem auto;
    padding: 1rem;

    h2,
    h3 {
      font-weight: 400;
      text-align: center;
    }
    #vehicles-launched {
      display: flex;
      span::after {
        content: ", ";
      }
      span:last-child::after {
        content: "";
      }
    }

    a.btn {
      width: 50%;
      margin: 0.5rem auto;
      display: block;
    }
  }
}

@media only screen and (max-width: 600px) {
  h2,
  h3 {
    font-size: 1.2rem;
  }

  p,
  span {
    font-size: 12px;
  }
  #launch-pads #details {
    margin: 0;
    padding: 0;
  }
}

@media only screen and (max-width: 400px) {
  #info {
    p,
    span {
      font-size: 10px;
    }
  }
}
</style>