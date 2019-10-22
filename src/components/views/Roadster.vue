<template>
  <div v-if="roadster" id="roadster">
    <h2>{{roadster.name}}</h2>

    <div id="info">
      <p>Launch Date: {{ new Date(roadster.launch_date_utc).toLocaleString()}}</p>
      <p>Mass: {{roadster.launch_mass_lbs.toLocaleString()}} lbs.</p>
      <p>Orbital Period: {{roadster.period_days.toFixed(0)}} Days</p>
      <p>Speed: {{new Number(roadster.speed_mph.toFixed(0)).toLocaleString()}} mph</p>
      <p>Earth Distance: {{new Number(roadster.earth_distance_mi.toFixed()).toLocaleString()}} miles</p>
    </div>

    <p id="details">{{roadster.details}}</p>
    <div class="link">
      <a target="_blank" :href="roadster.wikipedia" class="btn">Wiki</a>
    </div>

    <div id="images">
      <div v-for="(image, index) in roadster.flickr_images" :key="index">
        <a target="_blank" :href="image">
          <img :src="image" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/axios";
export default {
  name: "Roadster",
  data() {
    return {
      roadster: null
    };
  },

  async created() {
    const resp = await axiosInstance.get("roadster");
    this.roadster = resp.data;
  }
};
</script>

<style lang='scss'>
#roadster {
  background: #fff;
  max-width: 800px;
  width: 90%;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 2px;

  p {
    line-height: 1.4;
  }

  #info {
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.5rem;
    background: #efefef;
    max-width: 800px;
    margin: 0 auto;
  }

  #details {
    margin: 1rem auto;
    font-size: 1.08rem;
    line-height: 1.2;
    max-width: 800px;
  }

  #images {
    img {
      max-width: 100%;
    }
  }

  h1,
  h2,
  h3 {
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h2 {
    text-align: center;
  }
  .link {
    a {
      display: block;
      margin: 1rem 0;
      max-width: 800px;
      margin: 1rem auto;
    }
  }

  @media only screen and (min-width: 600px) {
    #images {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.6rem;
    }
  }

  @media only screen and (max-width: 400px) {
    h2 {
      font-size: 1rem;
    }
    #info {
      font-size: 0.95rem;
    }
  }
}
</style>