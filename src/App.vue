<template>
  <div id="app">
    <app-nav></app-nav>
    <main>
      <router-view></router-view>
    </main>

    <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    appNav: Navbar,
    appFooter: Footer
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  main {
    flex: 1;
  }
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
