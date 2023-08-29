<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import RecommendedHouses from "../components/RecommendedHouses.vue";
import BackToOverviewLink from "../components/BackToOverviewLink.vue";
import DeleteListing from "../components/DeleteListing.vue";
import { useGlobalStore } from "../store/store";

const globalStore = useGlobalStore();
const router = useRouter();
const route = useRoute();
const currentHouseId = ref(null);

const houseId = route.params.houseId;
const house = computed(() => globalStore.houseDetails);

onMounted(() => {
	globalStore.fetchHouseDetails(houseId);
});

const showDeleteModal = ref(false);

const openModal = (houseId) => {
	showDeleteModal.value = true;
	currentHouseId.value = houseId;
};

const closeModal = () => {
	showDeleteModal.value = false;
};
</script>

<template>
	<div class="container">
		<div class="house-details">
			<div v-if="house" class="house-details-container">
				<BackToOverviewLink class="back-to-overview-mobile" />
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
							<span class="card-title-mobile">
								<h2 class="address">
									{{ house.location.street }} {{ house.location.houseNumber }}
								</h2>
							</span>
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
						<div class="button-group-mobile">
							<router-link :to="`/edit-listing/${house.id}`">
								<img src="../assets/ic_edit_white@3x.png" alt="edit icon" />
							</router-link>
							<button @click="openModal(house.id)">
								<img src="../assets/ic_delete_white@3x.png" alt="delete icon" />
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
			:currentHouseId="house.id"
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
.card-title-mobile {
	display: none;
}

button {
	border: none;
	background-color: transparent;
	cursor: pointer;
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

.button-group-mobile {
	display: none;
	position: absolute;
	top: 2rem;
	right: 1rem;
	margin: 2rem 0;
}
.back-to-overview-mobile {
	display: none;
}

@media (max-width: 767px) {
	/* Styles for mobile */

	.house-details {
		width: 100%;
		flex-direction: column;
	}
	.button-group {
		display: none;
	}
	.button-group-mobile {
		display: block;
		z-index: 10;
	}

	.card-details {
		position: inherit;
	}
	.card-description {
		position: relative;
	}
	.card-title-mobile {
		display: block;
	}
	.card-title-mobile {
		border-top-right-radius: 35px;
		border-top-left-radius: 35px;
		background-color: white;
		/* padding: 1rem; */
		position: absolute;
		top: -4.5rem;
		left: -2rem;
		width: 97vw;
		text-align: left;
	}
	.card-details img {
		margin-right: 0.3rem;
	}
	.house-description {
		width: 100%;
	}
	.card-title-mobile h2 {
		margin-left: 2rem;
	}
	.card-title {
		display: none;
	}
	.card img {
		position: relative;
	}

	.house-details-container {
		width: 100%;
		border-top-right-radius: 10px;
	}
	.recommended-houses-container {
		width: 90%;
	}
	.house-item-container {
		width: 100%;
		margin-left: 1rem;
		margin-top: 0rem;
	}

	.back-to-overview {
		display: none;
	}
	.back-to-overview-mobile {
		display: block;
		position: fixed;
		top: 2rem;
		left: 2rem;
		z-index: 1;
	}

	.house-description p {
		font-size: 14px;
		margin: 0.3rem;
	}
}
</style>
