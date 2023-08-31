<script setup>
import { ref, onMounted, computed } from "vue";

import { useGlobalStore } from "../store/store";

const globalStore = useGlobalStore();

const recommendedHouses = computed(() =>
	globalStore.houses.filter((house) =>
		house.location.city.toLowerCase().includes(globalStore.city.toLowerCase())
	)
);
</script>

<template>
	<div class="recommended-houses">
		<div v-for="house in recommendedHouses" class="house-item-container">
			<router-link :to="`/houses/${house.id}`" class="house-item">
				<img
					:src="house.image"
					:alt="house.address"
					class="recommended-house-image"
				/>

				<div class="house-details">
					<h2>
						{{ house.location.street }}&nbsp;{{ house.location.houseNumber }}
					</h2>

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
			</router-link>
		</div>
	</div>
</template>

<style scoped>
.recommended-houses {
	margin-top: 4.5rem;
}
.house-item-container {
	width: 90%;
	display: flex;
	flex-direction: column;
	margin-left: 4rem;
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
	.recommended-houses {
		margin-top: 0;
	}
	.container {
		margin-top: 0;
	}
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
