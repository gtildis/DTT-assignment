<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["sortType"]);
const emit = defineEmits();

const setSortType = (type) => {
	emit("update:sortType", type);
};
</script>

<template>
	<div class="button-group">
		<span
			class="price"
			@click="setSortType('price')"
			:class="['segmented-button', { active: sortType === 'price' }]"
		>
			Price
		</span>
		<span
			class="size"
			@click="setSortType('size')"
			:class="['segmented-button', { active: sortType === 'size' }]"
		>
			Size
		</span>
	</div>
</template>
<style scoped>
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
.button-group {
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
}
.price {
	border-top-left-radius: 7px;
	border-bottom-left-radius: 7px;
}
.size {
	border-bottom-right-radius: 7px;
	border-top-right-radius: 7px;
}
.active {
	background-color: #eb5440;
}

@media (max-width: 767px) {
	.button-group {
		width: 100%;
	}
	.price {
		flex-grow: 1;
	}

	.size {
		flex-grow: 1;
	}
}

</style>
