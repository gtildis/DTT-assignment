<script setup>
import HouseList from "@/components/HouseList.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const houses = ref([]);

onMounted(async () => {
	try {
		const response = await axios.get("/api/houses");
		houses.value = response.data;
	} catch (error) {
		console.error("Error fetching houses:", error);
	}
});
</script>

<template>
	<main>
		<div class="container">
			<HouseList :houses="houses" />
		</div>
	</main>
</template>

<style scoped>
.container {
	margin-top: 4rem;
}
</style>
