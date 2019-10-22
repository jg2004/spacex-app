<template>
  <div v-if="missionDetails" id="mission-details">
    <h2>Mission Details for {{missionDetails.mission_name}}</h2>

    <p>{{missionDetails.description}}</p>

    <h4>Manufacturers</h4>
    <div id="mfg">
      <span v-for="(mfg, index) in missionDetails.manufacturers" :key="index">{{mfg}}</span>
    </div>
    <div class="links">
      <a style="width:106px;" class="btn" target="_blank" :href="missionDetails.wikipedia">Wiki</a>
      <a style="width:106px;" class="btn" target="_blank" :href="missionDetails.website">Website</a>
    </div>
  </div>
</template>

<script>
import ai from "../../utils/axios";
export default {
  name: "MissionDetail",
  props: {
    mission_id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      missionDetails: null
    };
  },

  async created() {
    const response = await ai.get(`missions/${this.mission_id}`);
    this.missionDetails = response.data;
  }
};
</script>

<style scoped lang='scss'>
#mission-details {
  background: white;
  margin: 1rem auto;
  padding: 1rem 2rem;
  width: 85%;
  max-width: 800px;

  h2,
  h3,
  h4 {
    text-align: center;
    margin: 1rem 0;
  }
  p {
    font-size: 1rem;
    line-height: 1.4rem;
  }

  #mfg {
    text-align: center;
    margin-bottom: 1rem;
  }

  span::after {
    content: ", ";
  }

  span:last-child::after {
    content: " ";
  }
}
</style>