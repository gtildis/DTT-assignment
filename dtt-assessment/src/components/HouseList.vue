<script setup>
import { ref, onMounted, computed } from "vue";
import DeleteListing from "./DeleteListing.vue";
import { useGlobalStore } from "../store/store";

const globalStore = useGlobalStore();
const searchInput = ref("");
const sortType = ref("price");
let isNotValid = ref(false);
const currentHouseId = ref("");

onMounted(() => {
	globalStore.fetchHouses();
});

const houses = computed(() => globalStore.houses);
const sortedHouses = ref([]);

const searchResults = computed(() => {
	if (searchInput.value) {
		return sortedHouses.value.filter((house) =>
			houseMatchesSearchCriteria(house, searchInput.value.toLowerCase())
		);
	} else {
		return sortedHouses.value;
	}
});

function houseMatchesSearchCriteria(house, query) {
	if (!house || !query) {
		return false;
	}
	isNotValid.value = !isNotValid;

	query = query.toLowerCase();
	return (
		house.location.street.toLowerCase().includes(query) ||
		house.location.zip.toLowerCase().includes(query) ||
		house.location.city.toLowerCase().includes(query)
	);
}

const clearSearch = () => {
	searchInput.value = "";
	sortHouses();
};

const sortHouses = () => {
	const housesToSort = [...houses.value];

	housesToSort.sort((house1, house2) => {
		const a = sortType.value === "price" ? house1.price : house1.size;
		const b = sortType.value === "price" ? house2.price : house2.size;

		return a - b;
	});

	sortedHouses.value = housesToSort;
};

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
	<div class="house-list">
		<div class="header-container">
			<div class="header-title">
				<h1>Houses</h1>
			</div>
			<div class="btn-header-container">
				<router-link to="/create-listing">
					<button>
						<img src="../assets/ic_plus_white@3x.png" class="desktop" />
						<img src="../assets/ic_plus_grey@3x.png" class="mobile" />
						<span>CREATE NEW</span>
					</button>
				</router-link>
			</div>
		</div>
		<div class="sorting-container">
			<div class="search-container">
				<img src="../assets/ic_search@3x.png" alt="search icon" />
				<input
					v-model="searchInput"
					placeholder="Search for a house"
					class="input-search"
				/>
				<button @click="clearSearch">
					<img src="../assets/ic_clear@3x.png" alt="clear icon" />
				</button>
			</div>

			<div class="button-group">
				<span
					class="price"
					@click="
						sortType = 'price';
						sortHouses();
					"
					:class="['segmented-button', { active: sortType === 'price' }]"
				>
					Price
				</span>
				<span
					class="size"
					@click="
						sortType = 'size';
						sortHouses();
					"
					:class="['segmented-button', { active: sortType === 'size' }]"
				>
					Size
				</span>
			</div>
		</div>

		<div class="results-container">
			<div v-if="searchResults.length > 0" class="search-results">
				<p>{{ searchResults.length }} results found</p>
			</div>
		</div>

		<!-- <router-link :to="`/houses/${house.id}`"></router-link> -->
		<div v-if="searchInput && searchResults.length === 0" class="no-results">
			<img src="../assets/img_empty_houses@3x.png" alt="no results image" />
			<p>No results found.</p>
			<p>Please try another keyword.</p>
		</div>

		<div
			v-else
			v-for="house in searchResults.length > 0 ? searchResults : houses"
			:key="house.id"
			class="house-item-container"
		>
			<router-link :to="`/houses/${house.id}`" class="house-item">
				<img :src="house.image" :alt="house.address" class="house-image" />

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
			<span v-if="house.madeByMe" class="house-buttons">
				<div class="button-group">
					<router-link :to="`/edit-listing/${house.id}`">
						<img src="../assets/ic_edit@3x.png" alt="edit icon" />
					</router-link>
					<button @click="openModal(house.id)">
						<img src="../assets/ic_delete@3x.png" alt="delete icon" />
					</button>
				</div>
			</span>
		</div>

		<DeleteListing
			v-if="showDeleteModal"
			:showDeleteModal="showDeleteModal"
			@closeModal="closeModal"
			:currentHouseId="currentHouseId"
		/>
	</div>
</template>

<style scoped>
.header-container {
	width: 70%;
	display: flex;
	justify-content: space-between;
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

.btn-header-container span {
	margin-right: 2rem;

	font-size: 16px;
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
	padding: 0.5rem 1rem;
}
.mobile {
	display: none;
}

.sorting-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 70%;
}

.results-container {
	width: 70%;
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	font-size: 22px;
}

.house-list {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
	align-items: center;
	display: flex;
	flex-direction: column;
	padding-bottom: 2rem;
	padding-top: 1rem;
}

.house-item-container {
	position: relative;
	width: 70%;
	display: flex;
	align-items: center;
}

.house-item {
	width: 100%;
	display: flex;
	align-content: space-between;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
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
	top: 1rem;
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
a {
	text-decoration: none;
	color: #000000;
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
	/* Styles for mobile */

	.container {
		margin-top: 0;
	}
	.sorting-container {
		flex-direction: column;
		width: 90%;
	}

	.house-list {
		margin-bottom: 5rem;
	}

	.desktop {
		display: none;
	}
	.mobile {
		display: block;
		/* background-color: #c3c3c3; */
	}

	.search-container {
		width: 100%;
	}

	.button-group {
		width: 100%;
	}
	.header-container button img {
		margin-right: 0;
	}
	.header-container button {
		background-color: transparent;
	}
	.price {
		flex-grow: 1;
	}
	.size {
		flex-grow: 1;
	}

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
		width: 5rem;
		height: 5rem;
		object-fit: cover;
		border-radius: 10px;
		margin: 0.4rem;
	}

	.house-details {
		margin: 0;
		line-height: 20%;
	}
	.house-item-container {
		width: 90%;
	}
	.house-item {
		width: 100%;
	}

	.house-price {
		font-size: 14px;
	}

	.house-specs img {
		width: 16px;
	}

	img {
		padding: 0;
	}
	h1 {
		font-family: "Montserrat", sans-serif;
		font-weight: 700;
		font-size: 22px;
		justify-self: center;
	}

	h2 {
		font-size: 16px;
		/* letter-spacing: 1px; */
	}

	h3 {
		font-size: 14px;
	}
}

/* search bar */

.search-container {
	margin-top: 1rem;
	display: flex;
	border-radius: 7px;
	align-items: center;
	justify-content: space-between;
	background-color: #e8e8e8;
	color: #c3c3c3;
}

input {
	flex-grow: 3;
	margin: 0 0.5rem;
	padding: 0.5rem;
	border: none;
	background-color: #e8e8e8;
}

.input-search {
	border: none;
	outline: none;
}

button {
	border: none;
	align-self: flex-end;
	cursor: pointer;
	padding: 0.5rem;
	background-color: #e8e8e8;
	border-radius: 7px;
}

.button-group button {
	background-color: #ffffff;
	margin: 1rem 0;
}

.search-results {
	margin-top: 1rem;
}

img {
	width: auto;
	height: 16px;
	padding: 0 0.5rem;
}

.no-results {
	color: black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.no-results img {
	margin-top: 4rem;
	margin-bottom: 2rem;
	width: 50%;
	height: auto;
}

.no-results p {
	margin: 0;
}

/* button */
.button-group {
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
}

.segmented-button {
	background-color: #ccc;
	color: white;
	border: none;
	padding: 10px 50px;
	font-size: 16px;
	cursor: pointer;
	margin-top: 1rem;
	transition: background-color 0.2s;
	text-align: center;
}

.segmented-button:not(:last-child) {
	margin-right: -1px; /* Overlap adjacent buttons slightly */
}

.active {
	background-color: #eb5440;
}

.price {
	border-top-left-radius: 7px;
	border-bottom-left-radius: 7px;
}
.size {
	border-bottom-right-radius: 7px;
	border-top-right-radius: 7px;
}
</style>
