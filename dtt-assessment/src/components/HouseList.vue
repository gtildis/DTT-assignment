<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/services/api";

const houses = ref([]);

onMounted(async () => {
	try {
		const response = await apiClient.get("/houses");
		houses.value = response.data;
	} catch (error) {
		console.error("Error fetching houses:", error);
	}
});
</script>

<template>
	<div class="house-list">
		<div class="header-container">
			<div class="header-title">
				<h1>Houses</h1>
			</div>
			<div class="btn-header-container">
				<button>
					<img src="../assets/ic_plus_white@3x.png" />
					<span>CREATE NEW&nbsp;</span>
				</button>
			</div>
		</div>

		<div v-for="house in houses" :key="house.id" class="house-item">
			<img :src="house.image" :alt="house.address" class="house-image" />
			<div class="house-details">
				<span class="house-buttons"><h3>yo</h3> </span>
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
		</div>
	</div>
</template>

<style scoped>
.header-container {
	width: 70%;
	display: flex;
	align-items: center;
	padding: 1rem;
}

.header-container h1 {
	font-size: 32px;
	font-family: "Montserrat", sans-serif;
	margin: 0;
}
.btn-header-container {
	display: flex;
	align-items: flex-end;
}

.header-container button {
	display: flex;
	align-items: center;
	background-color: #eb5440;
	border-radius: 12px;
	border: none;
	color: white;
	font-weight: 700;
	font-size: 18px;
}

.header-container button img {
	margin-right: 8px;
	width: 18px;
	padding: 1rem;
}

.house-list {
	width: 100vw;
	height: auto;
	background-color: #f6f6f6;
	align-items: center;
	display: flex;
	flex-direction: column;
}

.house-item {
	position: relative;
	width: 70%;
	display: flex;
	align-content: space-between;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	background-color: #ffffff;
	margin-top: 1rem;
}

.house-image {
	width: 10rem;
	height: 10rem;
	object-fit: cover;
	border-radius: 10px;
	margin: 0.7rem;
}

.house-buttons {
	position: absolute;
	top: 0;
	right: 1rem;
}

.house-details {
	line-height: 0.5;
	margin: 1rem;
	font-family: "Open Sans", sans-serif;
}

.house-price {
	font-size: 18px;
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
	width: 18px;
	height: auto;
}

h2 {
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
}
h3 {
	font-weight: 400;
	font-size: 18px;
}

@media (max-width: 767px) {
	.header-container {
		justify-content: space-between;
		width: 85%;
	}
	.helper {
		justify-content: center;
		flex-grow: 1;
	}

	.header-title {
		align-self: center;
	}

	.btn-header-container {
		align-items: flex-end;
	}
	.btn-header-container button span {
		display: none;
	}

	.house-item {
		width: 85%;
	}

	.house-image {
		width: 7rem;
		height: 7rem;
		object-fit: cover;
		border-radius: 10px;
		margin: 0.7rem;
	}

	.house-details {
		margin: 0;
	}

	.house-price {
		font-size: 14px;
	}

	.house-specs img {
		width: 16px;
	}
	h1 {
		font-family: "Montserrat", sans-serif;
		font-weight: 700;
		font-size: 22px;
		justify-self: center;
	}

	h2 {
		font-size: 18px;
	}

	h3 {
		font-size: 14px;
	}
}
</style>
