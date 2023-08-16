<script setup>
// import { ref, computed, defineProps, defineEmits } from "vue";

// const props = defineProps({
// 	houses: Array,
// });

// const emits = defineEmits(["search-results"]); // Declare the custom event

// const searchInput = ref("");
// const searchResults = ref([]);

// const filteredHouses = computed(() => {
// 	let newArray = [];
// 	newArray.push(...props.houses);
// 	return newArray.filter((house) =>
// 		houseMatchesSearchCriteria(house, searchInput.value.toLowerCase())
// 	);
// });

// const noResults = computed(
// 	() => searchInput.value !== "" && filteredHouses.value.length === 0
// );

// const searchHouses = () => {
// 	searchResults.value = filteredHouses.value;
// 	emits("search-results", filteredHouses.value); // Emit the custom event using emits
// };

// const clearSearch = () => {
// 	searchInput.value = "";
// 	searchResults.value = [];
// 	emits("search-results", []); // Emit an empty array to clear the filter in the parent
// };

// const clearOnEnter = (event) => {
// 	if (event.key === "Enter") {
// 		clearSearch();
// 	}
// };

// // Function to check if a house matches the search criteria
// function houseMatchesSearchCriteria(house, query) {
// 	return (
// 		house.location.street.toLowerCase().includes(query) ||
// 		house.location.city.toLowerCase().includes(query)
// 	);
// }
</script>

<template>
	<!-- <div class="search-container">
		<img src="../assets/ic_search@3x.png" alt="search icon" />
		<input
			v-model="searchInput"
			@input="searchHouses"
			placeholder="Search for a house"
			class="input-search"
		/>
		<button @click="clearSearch">
			<img src="../assets/ic_clear@3x.png" alt="clear icon" />
		</button>
	</div>
	<div v-if="searchResults.length > 0" class="search-results">
		<p>{{ searchResults.length }} results found:</p>
		<ul>
			<li v-for="result in searchResults" :key="result.id">
				{{ result.location.street }}, {{ result.location.city }}
			</li>
		</ul>
	</div>
	<div v-else-if="noResults" class="no-results">
		No results found for '{{ searchInput }}'
	</div> -->
</template>

<style scoped>
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
	background-color: #e8e8e8; /* Added red background color */
}

.input-search {
	border: none;
	outline: none;
}

button {
	border: none;
	align-self: flex-end; /* Changed justify-self to align-self */
	padding: 0.5rem;
	background-color: #e8e8e8;
	border-radius: 7px;
}

.search-results {
	margin-top: 1rem;
}

img {
	width: auto;
	height: 16px;
	padding: 0 1rem;
}

.no-results {
	color: red;
}
</style>
