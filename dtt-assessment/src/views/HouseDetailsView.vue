<script setup>
import { ref, onMounted } from "vue";
import apiClient from "../services/api";
import { useRoute, useRouter } from "vue-router";
import RecommendedHouses from "../components/RecommendedHouses.vue";
import BackToOverviewLink from "../components/BackToOverviewLink.vue";
import DeleteListing from "../components/DeleteListing.vue"; // Import the DeleteListing component

const router = useRouter();
const route = useRoute();

const house = ref(null);

onMounted(async () => {
	try {
		const response = await apiClient.get(`/houses/${route.params.houseId}`);
		house.value = response.data[0];
	} catch (error) {
		if (error.response && error.response.status === 404) {
			console.error("House not found:", error);
		} else {
			console.error("Error fetching house details:", error);
		}
	}
});

const showDeleteModal = ref(false);

const openModal = () => {
	showDeleteModal.value = true;
};

const closeModal = () => {
	showDeleteModal.value = false;
};
</script>

<template>
	<div class="container">
		<div class="house-details">
			<div v-if="house" class="house-details-container">
				<BackToOverviewLink />

				<div class="card">
					<img :src="house.image" alt="House Image" />
					<div class="card-details">
						<div class="card-title">
							<h2 class="address">
								{{ house.location.street }} {{ house.location.houseNumber }}
							</h2>
						</div>

						<div class="card-description">
							<div class="location">
								<img src="../assets/ic_location@3x.png" alt="location icon" />
								<p>
									{{ house.location.zip }}
									{{ house.location.city }}
								</p>
							</div>
						</div>
						<div class="house-description">
							<div class="price">
								<img src="../assets/ic_price@3x.png" alt="price icon" />
								<p>{{ house.price }}</p>
							</div>
							<div class="size">
								<img src="../assets/ic_size@3x.png" alt="size icon" />
								<p>{{ house.size }} m2</p>
							</div>
							<div class="construction-year">
								<img
									src="../assets/ic_construction_date@3x.png"
									alt="construction year icon"
								/>
								<p>Built in {{ house.constructionYear }}</p>
							</div>
							<div class="bedrooms">
								<img src="../assets/ic_bed@3x.png" alt="bedrooms icon" />
								<p>{{ house.rooms.bedrooms }}</p>
							</div>
							<div class="bathrooms">
								<img src="../assets/ic_bath@3x.png" alt="bathrooms icon" />
								<p>{{ house.rooms.bathrooms }}</p>
							</div>
							<div class="has-garage">
								<img src="../assets/ic_garage@3x.png" alt="garage icon" />
								<p>{{ house.hasGarage ? "Yes" : "No" }}</p>
							</div>
						</div>
						<p class="description">{{ house.description }}</p>

						<div class="button-group">
							<router-link :to="`/edit-listing/${house.id}`">
								<img src="../assets/ic_edit@3x.png" alt="edit icon" />
							</router-link>
							<button @click="openModal">
								<img src="../assets/ic_delete@3x.png" alt="delete icon" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="recommended-houses-container">
				<RecommendedHouses />
			</div>
		</div>
		<DeleteListing
			v-if="showDeleteModal"
			:showDeleteModal="showDeleteModal"
			@closeModal="closeModal"
		/>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	min-height: 100vh;
	width: 100%;
	background-color: #f6f6f6;
	display: flex;
	justify-content: center;
}
.card {
	background-color: #ffffff;
}
.card img {
	width: 100%;
}
.card-details {
	position: relative;
	padding: 1rem;
	margin: 1rem;
}
.house-details {
	display: flex;
	width: 70%;
	font-family: "Open Sans" sans-serif;
}
.house-details-container {
	width: 65%;
}
.recommended-houses-container {
	width: 35%;
}

.address {
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	font-size: 22px;
}

.card-description img,
.card-details img {
	width: 18px;
	height: 18px;
	margin-right: 1rem;
}

.house-details .house-item img {
	width: 8rem;
	height: 8rem;
}

button {
	border: none;
	background-color: transparent;
}

.house-description {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	width: 50%;
}

.location,
.price,
.bedrooms,
.bathrooms,
.size,
.has-garage,
.construction-year {
	display: flex;
	align-items: center;
}

.description {
	width: 100%;
}

.button-group {
	position: absolute;
	top: 0;
	right: 0;
	margin: 2rem 0;
}
</style>
