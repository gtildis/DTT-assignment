<script setup>
import { ref, onMounted } from "vue";
import apiClient from "../services/api";

const lastSearchCriteria = localStorage.getItem("lastSearchCriteria");
const recommendedHouses = ref([]);
const searchResults = ref([]);

onMounted(async () => {
	fetchAllHouses();
});

async function fetchAllHouses() {
	try {
		const response = await apiClient.get("/houses");
		searchResults.value = response.data;

		// Filter recommended houses based on the last search criteria

		recommendedHouses.value = searchResults.value.filter(
			(house) =>
				house.location.street.toLowerCase().includes(lastSearchCriteria) ||
				house.location.zip.toLowerCase().includes(lastSearchCriteria) ||
				house.location.city.toLowerCase().includes(lastSearchCriteria)
		);
	} catch (error) {
		console.error("Error fetching houses:", error);
	}
}
</script>
<template>
	<div v-if="recommendedHouses" class="house-item-container">
		<h1 class="recommended-title">Recommended for you</h1>
		<div v-for="house in recommendedHouses" :key="house.id" class="house-item">
			<img
				:src="house.image"
				:alt="house.address"
				class="recommended-house-image"
			/>
			<div class="house-details">
				<a :href="`/houses/${house.id}`">
					<h2 class="house-details-title">
						{{ house.location.street }} {{ house.location.houseNumber }}
					</h2>
				</a>
				<h3 class="house-price">€ {{ house.price }}</h3>
				<h3 class="house-location">
					{{ house.location.zip }} {{ house.location.city }}
				</h3>
				<div class="house-specs">
					<img src="../assets/ic_bed@3x.png" alt="bed" />
					<h3>{{ house.rooms.bedrooms }}</h3>
					<img src="../assets/ic_bath@3x.png" alt="bed" />
					<h3>{{ house.rooms.bathrooms }}</h3>
					<img src="../assets/ic_size@3x.png" alt="bed" />
					<h3>{{ house.size }} m2</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.house-item-container {
	width: 90%;
	display: flex;
	flex-direction: column;
	margin-left: 5rem;
	margin-top: 4rem;
}
.house-item {
	display: flex;
	align-content: space-between;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
	margin: 0.7rem 0;
}

.recommended-title {
	text-align: left;
	font-family: "Montserrat", sans-serif;
	font-size: 24px;
	font-weight: bold;
}
.house-details h2 {
	font-size: 18px;
	font-weight: 700;
	font-family: "Montserrat", sans-serif;
}

.house-details h3 {
	margin-right: 1rem;
}

.house-details h3 {
	font-weight: 500;
}

.house-item img {
	width: 7rem;
	height: 7rem;
	object-fit: cover;
	border-radius: 10px;
	margin: 0.7rem 0.3rem;
}

.house-details {
	line-height: 0.3;
	margin: 0 1rem;
	font-family: "Open Sans", sans-serif;
	font-size: 14px;
}
.house-price {
	font-size: 16px;
	font-weight: 600;
	color: #4a4b4c;
}

.house-location {
	color: #c3c3c3;
}
.house-specs {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.house-specs img {
	width: 16px;
	height: 16px;

	object-fit: contain;
}

a {
	text-decoration: none;
	color: black;
}
@media (max-width: 767px) {
	.house-details h2 {
		font-size: 16px;
	}
	.house-details h3 {
		font-size: 14px;
		margin: 1rem 0;
	}
	.recommended-title {
		font-size: 18px;
	}
}
</style>
