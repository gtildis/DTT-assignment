<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import apiClient from "../services/api";

const route = useRoute();
const router = useRouter();

const props = defineProps({
	showDeleteModal: Boolean,
	currentHouseId: Number,
});

const emit = defineEmits();

const closeDeleteModal = () => {
	emit("closeModal");
};

const deleteListing = async () => {
	try {
		if (route.params) {
			await apiClient.delete(`/houses/${route.params.houseId}`);
			router.push({ name: "home" });
		} else {
			await apiClient.delete(`/houses/${props.currentHouseId}`);
			router.push({ name: "home" });
			window.location.reload();
		}
	} catch (error) {
		console.error("Error deleting house:", error);
	}

	closeDeleteModal();
};
</script>

<template>
	<div class="modal-overlay">
		<div class="modal">
			<div class="modal-details">
				<h2>Confirm Deletion</h2>
				<p>Are you sure you want to delete this listing?</p>
				<p>This action cannot be undone.</p>
				<div class="modal-buttons">
					<button @click="deleteListing" class="delete-button">Delete</button>
					<button @click="closeDeleteModal" class="cancel-button">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Open Sans" sans-serif;
}

.modal {
	background-color: white;
	padding: 1rem;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	width: 30%;
	height: 30%;

	display: flex;
	align-items: center;
	justify-content: center;
}
.modal-details {
	width: 70%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.modal h2 {
	margin-top: 0;
	font-family: "Montserrat", sans-serif;
	font-size: 22px;
}
.modal p {
	margin: 0;
	font-size: 16px;
}

.modal-buttons {
	padding: 2rem;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	margin: 1rem;
}

.delete-button,
.cancel-button {
	background-color: #eb5440;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 5px;
	cursor: pointer;
}
.cancel-button {
	margin-top: 1rem;
	background-color: #4a4b4c;
}

.delete-button:hover {
	background-color: #cc0000;
}

button {
	padding: 8px 16px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}
</style>
