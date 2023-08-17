<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineProps } from "vue";
import { createListing, editListing } from "../services/listingService";
import apiClient from "../services/api";

const props = defineProps({
	submitButtonText: String,
	isEdit: Boolean,
	listingId: String,
});

const streetName = ref("");
const houseNumber = ref("");
const numberAddition = ref("");
const zip = ref("");
const city = ref("");
const description = ref("");
const price = ref("");
const size = ref("");
const bedrooms = ref("");
const bathrooms = ref("");
const constructionYear = ref("");
const hasGarage = ref(false);

const previewImage = ref(null);

const router = useRouter();
const route = useRoute();
console.log(route.params);

const house = ref(null);

if (props.isEdit) {
	onMounted(async () => {
		try {
			const response = await apiClient.get(`/houses/${props.listingId}`);
			house.value = response.data[0];

			// Update the values cause isEdit
			streetName.value = house.value.location.street;
			houseNumber.value = house.value.location.houseNumber;
			numberAddition.value = house.value.location.numberAddition;
			zip.value = house.value.location.zip;
			city.value = house.value.location.city;
			description.value = house.value.description;
			price.value = house.value.price;
			size.value = house.value.size;
			bedrooms.value = house.value.rooms.bedrooms;
			bathrooms.value = house.value.rooms.bathrooms;
			constructionYear.value = house.value.constructionYear;
			hasGarage.value = house.value.hasGarage;
		} catch (error) {
			console.error("Error fetching house:", error);
		}
	});
}

const handleSubmit = async () => {
	try {
		if (
			!streetName.value ||
			!houseNumber.value ||
			!zip.value ||
			!city.value ||
			!description.value ||
			!price.value ||
			!size.value ||
			!bedrooms.value ||
			!bathrooms.value ||
			!constructionYear.value
		) {
			console.error(
				"Error importing data from form: Some required fields are missing."
			);
			return;
		}

		const formDataObject = {
			streetName: streetName.value,
			houseNumber: houseNumber.value,
			numberAddition: numberAddition.value,
			zip: zip.value,
			city: city.value,
			description: description.value,
			price: price.value,
			size: size.value,
			bedrooms: bedrooms.value,
			bathrooms: bathrooms.value,
			constructionYear: constructionYear.value,
			hasGarage: hasGarage.value,
		};
		console.log(props.listingId);
		let response;
		if (props.isEdit) {
			response = await editListing(props.listingId, formDataObject);
		} else {
			response = await createListing(formDataObject);
		}

		const imageFile = document.getElementById("image-input").files[0];

		if (previewImage) {
			const formData = new FormData();
			formData.append("image", imageFile);

			if (props.isEdit) {
				const uploadResponse = await apiClient.post(
					`/houses/${props.listingId}/upload`,
					formData
				);
			} else {
				const uploadResponse = await apiClient.post(
					`/houses/${response.id}/upload`,
					formData
				);
			}
		}
		if (props.isEdit) {
			router.push({
				path: `/houses/${route.params.listingId}`,
			});
		} else {
			router.push({
				path: `/houses/${response.id}`,
			});
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

const handleImageChange = (event) => {
	const file = event.target.files[0];
	if (file) {
		previewImage.value = URL.createObjectURL(file);

		// Update the backgroundImage using DOM manipulation
		const imageInput = document.getElementById("image-input");
		if (imageInput) {
			imageInput.style.backgroundImage = `url(${previewImage.value})`;
			imageInput.style.backgroundSize = "cover";
			imageInput.style.border = "none";
		}
	} else {
		previewImage.value = "";

		const imageInput = document.getElementById("image-input");
		if (imageInput) {
			imageInput.style.backgroundImage = "url('../assets/ic_upload@3x.png')";
		}
	}
};
const clearImage = () => {
	if (props.isEdit) {
		router.replace({
			name: "create-listing",
		});
	} else {
		router.replace({
			name: "create-listing",
		});
	}
	window.location.reload();
};
</script>

<template>
	<form @submit.prevent="handleSubmit" class="listing-form">
		<div class="form-container">
			<div class="single">
				<h4>Street name*</h4>
				<input
					v-model="streetName"
					type="text"
					class="input-field"
					placeholder="Enter the street name"
					required
				/>
			</div>
			<div class="double">
				<div class="half">
					<h4>House Number*</h4>
					<input
						v-model="houseNumber"
						type="text"
						class="input-field"
						placeholder="Enter house number"
						required
					/>
				</div>
				<div class="half">
					<h4>Addition (optional)</h4>
					<input
						v-model="numberAddition"
						type="text"
						class="input-field"
						placeholder="e.g A"
					/>
				</div>
			</div>
			<div class="single">
				<h4>Postal code*</h4>
				<input
					v-model="zip"
					type="text"
					class="input-field"
					placeholder="e.g 1000 AA"
					required
				/>
			</div>
			<div class="single">
				<h4>City*</h4>
				<input
					v-model="city"
					type="text"
					class="input-field"
					placeholder="e.g Utrecht"
					required
				/>
			</div>
			<label>
				<div class="single">
					<div class="half">
						<h4 class="imam">Upload picture (PNG or JPG)*</h4>
						<input
							@change="handleImageChange"
							id="image-input"
							type="file"
							accept="image/*"
							class="image-input"
						/>
						<button
							v-if="previewImage"
							class="clear-button"
							@click="clearImage"
						>
							x
						</button>
					</div>
				</div>
			</label>
			<div class="single">
				<h4>Price*</h4>
				<input
					v-model="price"
					type="text"
					class="input-field"
					placeholder="e.g €150.000"
					required
				/>
			</div>
			<div class="double">
				<div class="half">
					<h4>Size*</h4>
					<input
						v-model="size"
						type="text"
						class="input-field"
						placeholder="e.g 60m2"
						required
					/>
				</div>
				<div class="half">
					<h4>Garage*</h4>
					<select v-model="hasGarage" id="garage-select">
						<option value="" disabled>Select</option>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</div>
			</div>
			<div class="double">
				<div class="half">
					<h4>Bedrooms*</h4>
					<input
						v-model="bedrooms"
						type="text"
						class="input-field"
						placeholder="Enter amount"
						required
					/>
				</div>
				<div class="half">
					<h4>Bathrooms*</h4>
					<input
						v-model="bathrooms"
						type="text"
						class="input-field"
						placeholder="Enter amount"
						required
					/>
				</div>
			</div>
			<div class="single">
				<h4>Construction Date*</h4>
				<input
					v-model="constructionYear"
					type="text"
					class="input-field"
					placeholder="e.g 1990"
					required
				/>
			</div>
			<div class="single">
				<h4>Description*</h4>
				<textarea
					v-model="description"
					class="input-field"
					placeholder="Enter description"
					rows="5"
					required
				></textarea>
			</div>
			<div class="double btn">
				<button class="half button" type="submit">
					{{ submitButtonText }}
				</button>
			</div>
		</div>
	</form>
</template>

<style scoped>
.form-container {
	width: 35%;
	color: #4a4b4c;
}

.single {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.double {
	width: 100%;
	display: flex;
}

.half {
	display: flex;
	flex-direction: column;
	width: 50%;
}

.single input,
.double input,
.single textarea,
.double select {
	border: none;
	padding: 1rem;
	border-radius: 8px;
	margin-right: 1rem;
}

#image-input {
	background-image: url("../assets/ic_upload@3x.png");
	background-size: 30% auto;
	background-position: center;
	background-repeat: no-repeat;
	border: 2px dashed #ccc;
	width: 150px;
	height: 150px;
	outline: none;
	cursor: pointer;
	color: transparent;
}

#image-input::-webkit-file-upload-button {
	visibility: hidden;
}

/* Optional: Style the dashed border when hovering */
#image-input:hover {
	border-color: #555;
}

.image-input {
	position: relative;
}
.clear-button {
	position: absolute;
	width: 20px;
	height: 20px;
	background-color: #ccc;
	border: none;
	border-radius: 50%;
	color: white;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.clear-button:hover {
	background-color: #aaa;
}

h4 {
	margin: 0.8rem 0;
	font-family: "Montserrat", sans-serif;
	font-size: 16dpx;
}
.btn {
	display: flex;
	justify-content: flex-end;
}
.button {
	background-color: #eb5440;
	color: white;
	padding: 1rem 2rem;
	border: none;
	border-radius: 8px;
	margin: 1rem;
	font-family: "Montserrat", sans-serif;
	font-size: 22px;
	text-align: center;
	display: flex;
	align-items: center;
}
</style>
