<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["searchInput"]);
const emit = defineEmits();

const updateSearchInput = (event) => {
	emit("update:searchInput", event.target.value);
};

const clearSearch = () => {
	emit("update:searchInput", "");
};
</script>

<template>
	<div class="search-container">
		<img src="../assets/ic_search@3x.png" alt="search icon" />
		<input
			:value="searchInput"
			@input="updateSearchInput"
			placeholder="Search for a house"
			class="input-search"
		/>
		<button @click="clearSearch">
			<img src="../assets/ic_clear@3x.png" alt="clear icon" />
		</button>
	</div>
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
img {
	width: 18px;
	height: auto;
	margin: 0 1rem;
}

@media (max-width: 767px) {
	.search-container {
		width: 100%;
	}
	img {
		padding: 0;
	}
}
</style>
