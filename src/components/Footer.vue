<template>
  <footer id="footer">
    <ul id="footer-links">
      <li>Copyright 2019, JG</li>

      <li>
        <a href="/">
          <img src="@/assets/space-x-logo.jpg" alt="space-x logo" />
        </a>
      </li>
      <li>Powered by spacexdata.com API</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang='scss'>
footer {
  padding: 0rem 2rem;
  background: #030303;
  color: #aaa;
  img {
    height: 85px;
    width: auto;
  }
  ul {
    list-style-type: none;
  }

  #footer-links {
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>