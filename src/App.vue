<template>
  <div id="app">
    <app-nav></app-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: {
    appNav: Navbar
  }
};
</script>

<style lang="scss">
#app {
}

@media (max-width: 400px) {
  #app .grid {
    display: block;
  }
}

@media (max-width: 500px) {
  #app .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 800px) {
  #app .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
