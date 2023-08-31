<script setup>
import { defineProps, defineEmits } from "vue";
import { useGlobalStore } from "../store/store";
import { useRouter } from "vue-router";

const props = defineProps({
	showDeleteModal: Boolean,
	currentHouseId: Number,
});

const emit = defineEmits();
const globalStore = useGlobalStore();
const router = useRouter();

const closeDeleteModal = () => {
	emit("closeModal");
};

const deleteListing = async () => {
	try {
		if (props.currentHouseId) {
			await globalStore.deleteHouse(props.currentHouseId);
			closeDeleteModal();
			router.push({ name: "home" });
		}
	} catch (error) {
		console.error("Error deleting house:", error);
	}
};
</script>

<template>
	<div class="modal-overlay">
		<div class="modal">
			<div class="modal-details">
				<h2>Delete Listing</h2>
				<p>Are you sure you want to delete this listing?</p>
				<p>This action cannot be undone.</p>
				<div class="modal-buttons">
					<button @click="deleteListing" class="delete-button">
						YES, DELETE
					</button>
					<button @click="closeDeleteModal" class="cancel-button">
						CANCEL
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
	border-radius: 8px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	width: 30%;
	height: 30%;

	display: flex;
	align-items: center;
	justify-content: center;
}
.modal-details {
	width: 80%;
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
@media (max-width: 767px) {
	.modal {
		width: 80%;
	}

	.modal-details h2 {
		margin: 2rem;
	}
	.modal p {
		font-size: 14px;
	}
	.modal-buttons {
		width: 65%;
	}
}
</style>
