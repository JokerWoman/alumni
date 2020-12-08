<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style src="./assets/genericStyle.css"></style>
