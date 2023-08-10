<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
	<NavBar />
	<RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,500&display=swap");

* {
	font-family: "Open Sans", sans-serif;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style>
