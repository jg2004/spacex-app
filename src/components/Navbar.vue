<template>
  <nav id="nav">
    <ul class="left-nav">
      <li>
        <router-link id="logo" :to="{name:'home'}">
          <img src="@/assets/space-x-logo.jpg" alt />
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'past-launches'}">Past Launches</router-link>
      </li>
      <li>
        <router-link :to="{name:'launch-detail',params:{flightNumber:'latest'}}">Latest Launch</router-link>
      </li>
      <li>
        <router-link :to="{name:'next-launch'}">Next Launch</router-link>
      </li>
    </ul>

    <ul class="right-nav">
      <li>
        <router-link :to="{name:'rockets'}">Rockets</router-link>
      </li>
      <li>
        <router-link :to="{name:'roadster'}">Roadster</router-link>
      </li>
      <li>
        <router-link :to="{name:'landing-pads'}">Landing Pads</router-link>
      </li>
      <li>
        <router-link :to="{name:'launch-pads'}">Launch Pads</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang='scss'>
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 13vh;
  background: #030303;
  padding: 1rem;

  #logo {
    border: none;
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }
  .left-nav,
  .right-nav {
    display: flex;
    align-items: center;
  }
  img {
    width: 65px;
  }
  a {
    color: white;
    height: auto;
    padding: 0 0.5rem;
    &:hover {
      color: #eee;
    }

    &.router-link-exact-active {
      color: red;
    }
  }
}

@media only screen and (max-width: 660px) {
  #nav {
    flex-direction: column;
    height: auto;
    padding-top: 0;

    ul,
    li {
      width: 100%;
      a {
        margin: 0.2rem 0;
        display: block;
        border: 1px solid #555;
        padding: 0.75rem 0;
        text-align: center;
      }
    }
    .left-nav,
    .right-nav {
      flex-direction: column;
    }
  }
}
</style>