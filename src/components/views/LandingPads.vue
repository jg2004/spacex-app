<template>
  <div id="landing-pads">
    <h1>Landing Pads</h1>

    <div v-for="(pad, index) in landingPads" :key="index" class="card">
      <h2>{{pad.full_name}}</h2>
      <h3 :class="{'text-red':pad.status!=='active'}">[{{pad.status}}]</h3>
      <div id="info">
        <p>Landing Type: {{pad.landing_type}}</p>
        <p>Location: {{pad.location.name}}, {{pad.location.region}}</p>

        <p>Attempted Landings: {{pad.attempted_landings}}</p>
        <p>Successful Landings: {{pad.successful_landings}}</p>
        <strong>
          <p
            v-if="pad.attempted_landings>0"
          >Success Rate: {{new Number(pad.successful_landings/pad.attempted_landings).toFixed(2)*100 || '0'}}%</p>
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
  name: "LandingPads",

  data() {
    return {
      landingPads: null
    };
  },

  async created() {
    const resp = await axiosInstance.get("landpads");
    this.landingPads = resp.data;
  }
};
</script>

<style lang='scss'>
#landing-pads {
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
  #landing-pads #details {
    padding: 0;
  }
}
</style>