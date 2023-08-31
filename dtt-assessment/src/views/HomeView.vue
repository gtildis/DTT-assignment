<script setup>
import HouseList from "../components/HouseList.vue";
</script>

<template>
	<div class="container">
		<HouseList />
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}

@media (max-width: 767px) {
	.container {
		margin-top: 0;
	}
}
</style>
