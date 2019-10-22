<template>
  <div v-if="info" id="home">
    <div class="container">
      <h1>SpaceX Info</h1>
      <p class="lead">{{info.summary}}</p>

      <div class="box">
        <p>Founder: {{info.founder}}</p>
        <p>Founded: {{info.founded}}</p>
        <p>Employees: {{info.employees.toLocaleString()}}</p>
        <p>Vehicles: {{info.vehicles}}</p>
        <p>CEO: {{info.ceo}}</p>
        <p>CTO: {{info.cto}}</p>
        <p>COO: {{info.coo}}</p>
        <p>CTO Propulsion: {{info.cto_propulsion}}</p>
        <p>Valuation: {{info.valuation.toLocaleString()}}</p>
        <p>HQ: {{info.headquarters.address}},{{info.headquarters.city}},{{info.headquarters.state}}</p>
        <div class="links">
          <a target="_blank" :href="info.links.website">Website</a>
          <a target="_blank" :href="info.links.flickr">Photos</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/axios";

export default {
  name: "Home",
  data() {
    return {
      info: null
    };
  },

  async created() {
    const resp = await axiosInstance.get("info");
    this.info = resp.data;
  }
};
</script>

<style lang='scss'>
#home {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(../../assets/night-launch-lg.jpg) no-repeat fixed center/cover;

  height: 100vh;
  color: #eee;

  h1 {
    font-weight: 500;
  }
  .lead {
    margin: 2rem 0;
    font-size: 1.3rem;
    line-height: 1.4;
    padding: 0 2rem;
  }
  .box {
    width: 50%;
    margin: 0 auto;
    border: 1px solid white;
    padding-top: 1rem;
    text-align: center;
  }
  .links {
    display: flex;
    justify-content: center;
    a {
      display: block;
      color: white;
      border: 1px solid white;
      padding: 0.5rem;
      margin: 0 0.5rem;
    }
  }

  @media only screen and (max-width: 800px) {
    h1 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .lead {
      padding: 0;
      //   line-height: 1.3;
      font-size: 1.1rem;
      margin-top: 0;
    }
    .box {
      width: 75%;
      font-size: 0.85rem;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      display: none;
    }
    .lead {
      padding: 0;
      line-height: 1.2;
      font-size: 1rem;
      margin-top: 0;
    }
    .box {
      width: 100%;
    }
  }
}
</style>