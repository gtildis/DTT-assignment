<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineProps } from "vue";
import { createListing, editListing } from "../services/listingService";
import apiClient from "../services/api";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const props = defineProps({
	submitButtonText: String,
	isEdit: Boolean,
	listingId: String,
});
const previewImage = ref("");

const isFormSubmitAllowed = ref(false);
const router = useRouter();
const route = useRoute();

const house = ref(null);

const formData = reactive({
	streetName: "",
	houseNumber: "",
	numberAddition: "",
	zip: "",
	city: "",
	description: "",
	price: "",
	size: "",
	bedrooms: "",
	constructionYear: "",
	hasGarage: "",
});

const rules = computed(() => {
	return {
		streetName: {
			required: helpers.withMessage("Required missing field.", required),
		},
		houseNumber: {
			required: helpers.withMessage("Required missing field.", required),
		},
		zip: { required: helpers.withMessage("Required missing field.", required) },
		city: {
			required: helpers.withMessage("Required missing field.", required),
		},
		description: {
			required: helpers.withMessage("Required missing field.", required),
		},
		price: {
			required: helpers.withMessage("Required missing field.", required),
		},
		size: {
			required: helpers.withMessage("Required missing field.", required),
		},
		bedrooms: {
			required: helpers.withMessage("Required missing field.", required),
		},
		bathrooms: {
			required: helpers.withMessage("Required missing field.", required),
		},
		constructionYear: {
			required: helpers.withMessage("Required missing field.", required),
		},
		hasGarage: {
			required: helpers.withMessage("Required missing field.", required),
		},
	};
});

const v$ = useVuelidate(rules, formData);

if (props.isEdit) {
	onMounted(async () => {
		try {
			const response = await apiClient.get(`/houses/${props.listingId}`);
			house.value = response.data[0];

			formData.streetName = house.value.location.street;
			formData.houseNumber = house.value.location.houseNumber;
			formData.numberAddition = house.value.location.numberAddition;
			formData.zip = house.value.location.zip;
			formData.city = house.value.location.city;
			formData.description = house.value.description;
			formData.price = house.value.price;
			formData.size = house.value.size;
			formData.bedrooms = house.value.rooms.bedrooms;
			formData.bathrooms = house.value.rooms.bathrooms;
			formData.constructionYear = house.value.constructionYear;
			formData.hasGarage = house.value.hasGarage;
			previewImage.value = house.value.image;
		} catch (error) {
			console.error("Error fetching house:", error);
		}
	});

	const imageInput = document.getElementById("image-input");

	if (imageInput) {
		imageInput.style.backgroundImage = `url(${previewImage.value})`;
		imageInput.style.backgroundSize = "cover";
		imageInput.style.border = "none";
	}
}

const handleSubmit = async () => {
	const result = await v$.value.$validate();

	if (previewImage.value !== "") {
		isFormSubmitAllowed.value = true;
	}

	if (!isFormSubmitAllowed.value) {
		const errorMessages = document.querySelectorAll(".error-message-image");

		errorMessages.forEach((errorMessage) => {
			errorMessage.style.display = "block";
		});

		return;
	}

	if (result) {
		try {
			const formDataObject = {
				streetName: formData.streetName,
				houseNumber: formData.houseNumber,
				numberAddition: formData.numberAddition,
				zip: formData.zip,
				city: formData.city,
				description: formData.description,
				price: formData.price,
				size: formData.size,
				bedrooms: formData.bedrooms,
				bathrooms: formData.bathrooms,
				constructionYear: formData.constructionYear,
				hasGarage: formData.hasGarage,
			};

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
	}
};

const handleImageChange = (event) => {
	const file = event.target.files[0];

	if (file) {
		previewImage.value = URL.createObjectURL(file);
		isFormSubmitAllowed.value = true;

		const imageInput = document.getElementById("image-input");
		if (imageInput) {
			imageInput.style.backgroundImage = `url(${previewImage.value})`;
			imageInput.style.backgroundSize = "cover";
			imageInput.style.border = "none";
		}
	} else {
		previewImage.value = "";
		isFormSubmitAllowed.value = false;
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
					v-model="formData.streetName"
					type="text"
					class="input-field"
					placeholder="Enter the street name"
					:style="{
						border: v$.streetName.$error ? '1px solid red' : 'none',
					}"
					:class="{ 'error-placeholder': v$.streetName.$error }"
				/>
				<span
					v-for="error in v$.streetName.$errors"
					:key="error.$uid"
					class="error-message"
					>{{ error.$message }}
				</span>
			</div>
			<div class="double">
				<div class="half">
					<h4>House Number*</h4>
					<input
						v-model="formData.houseNumber"
						type="text"
						class="input-field"
						placeholder="Enter house number"
						:style="{
							border: v$.houseNumber.$error ? '1px solid red' : 'none',
						}"
						:class="{ 'error-placeholder': v$.houseNumber.$error }"
					/>
					<span
						v-for="error in v$.houseNumber.$errors"
						:key="error.$uid"
						class="error-message"
						>{{ error.$message }}
					</span>
				</div>
				<div class="half">
					<h4>Addition (optional)</h4>
					<input
						v-model="formData.numberAddition"
						type="text"
						class="input-field"
						placeholder="e.g A"
					/>
				</div>
			</div>
			<div class="single">
				<h4>Postal code*</h4>
				<input
					v-model="formData.zip"
					type="text"
					class="input-field"
					placeholder="e.g 1000 AA"
					:style="{
						border: v$.zip.$error ? '1px solid red' : 'none',
					}"
					:class="{ 'error-placeholder': v$.zip.$error }"
				/>
				<span
					v-for="error in v$.zip.$errors"
					:key="error.$uid"
					class="error-message"
					>{{ error.$message }}
				</span>
			</div>
			<div class="single">
				<h4>City*</h4>
				<input
					v-model="formData.city"
					type="text"
					class="input-field"
					placeholder="e.g Utrecht"
					:style="{
						border: v$.city.$error ? '1px solid red' : 'none',
					}"
					:class="{ 'error-placeholder': v$.city.$error }"
				/>
				<span
					v-for="error in v$.city.$errors"
					:key="error.$uid"
					class="error-message"
					>{{ error.$message }}
				</span>
			</div>
			<label v-if="props.isEdit">
				<div class="single">
					<div>
						<h4>Upload picture (PNG or JPG)*</h4>
						<div class="image-input-container">
							<input
								@change="handleImageChange"
								id="image-input"
								type="file"
								accept="image/*"
								class="image-input"
								:style="{
									backgroundImage: previewImage
										? `url(${previewImage})`
										: `url('../assets/ic_upload@3x.png')`,
									backgroundSize: 'cover',
								}"
							/>
							<button
								v-if="previewImage"
								class="clear-button"
								@click="clearImage"
							>
								x
							</button>
						</div>
						<span class="error-message-image error-message"
							>Required missing field
						</span>
					</div>
				</div>
			</label>
			<label v-else>
				<div class="single">
					<div>
						<h4>Upload picture (PNG or JPG)*</h4>
						<div class="image-input-container">
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
						<span class="error-message-image error-message"
							>Required missing field
						</span>
					</div>
				</div>
			</label>
			<div class="single">
				<h4>Price*</h4>
				<input
					v-model="formData.price"
					type="text"
					class="input-field"
					placeholder="e.g €150.000"
					:style="{
						border: v$.price.$error ? '1px solid red' : 'none',
					}"
					:class="{ 'error-placeholder': v$.price.$error }"
				/>
				<span
					v-for="error in v$.price.$errors"
					:key="error.$uid"
					class="error-message"
					>{{ error.$message }}
				</span>
			</div>
			<div class="double">
				<div class="half">
					<h4>Size*</h4>
					<input
						v-model="formData.size"
						type="text"
						class="input-field"
						placeholder="e.g 60m2"
						:style="{
							border: v$.size.$error ? '1px solid red' : 'none',
						}"
						:class="{ 'error-placeholder': v$.size.$error }"
					/>
					<span
						v-for="error in v$.size.$errors"
						:key="error.$uid"
						class="error-message"
						>{{ error.$message }}
					</span>
				</div>
				<div class="half">
					<h4>Garage*</h4>
					<select v-model="formData.hasGarage" id="garage-select">
						<option value="" disabled>Select</option>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
					<span
						v-for="error in v$.hasGarage.$errors"
						:key="error.$uid"
						class="error-message"
						>{{ error.$message }}
					</span>
				</div>
			</div>
			<div class="double">
				<div class="half">
					<h4>Bedrooms*</h4>
					<input
						v-model="formData.bedrooms"
						type="text"
						class="input-field"
						placeholder="Enter amount"
						:style="{
							border: v$.bedrooms.$error ? '1px solid red' : 'none',
						}"
						:class="{ 'error-placeholder': v$.bedrooms.$error }"
					/>
					<span
						v-for="error in v$.bedrooms.$errors"
						:key="error.$uid"
						class="error-message"
						>{{ error.$message }}
					</span>
				</div>
				<div class="half">
					<h4>Bathrooms*</h4>
					<input
						v-model="formData.bathrooms"
						type="text"
						class="input-field"
						placeholder="Enter amount"
						:style="{
							border: v$.bathrooms.$error ? '1px solid red' : 'none',
						}"
						:class="{ 'error-placeholder': v$.bathrooms.$error }"
					/>
					<span
						v-for="error in v$.bathrooms.$errors"
						:key="error.$uid"
						class="error-message"
						>{{ error.$message }}
					</span>
				</div>
			</div>
			<div class="single">
				<h4>Construction Date*</h4>
				<input
					v-model="formData.constructionYear"
					type="text"
					class="input-field"
					placeholder="e.g 1990"
					:style="{
						border: v$.constructionYear.$error ? '1px solid red' : 'none',
					}"
					:class="{ 'error-placeholder': v$.constructionYear.$error }"
				/>
				<span
					v-for="error in v$.constructionYear.$errors"
					:key="error.$uid"
					class="error-message"
					>{{ error.$message }}
				</span>
			</div>
			<div class="single">
				<h4>Description*</h4>
				<textarea
					v-model="formData.description"
					class="input-field"
					placeholder="Enter description"
					rows="5"
					:style="{
						border: v$.description.$error ? '1px solid red' : 'none',
					}"
					:class="{ 'error-placeholder': v$.description.$error }"
				></textarea>
				<span
					v-for="error in v$.description.$errors"
					:key="error.$uid"
					class="error-message"
					>{{ error.$message }}
				</span>
			</div>
			<div class="double btn-container">
				<button class="half button" type="submit">
					{{ submitButtonText }}
				</button>
			</div>
		</div>
	</form>
</template>

<style scoped>
.error-placeholder::placeholder {
	color: red;
}
.error-message {
	color: red;
	font-size: 12px;
	font-style: italic;
}
.error-message-image {
	display: none;
}

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
#image-input::file-selector-button {
	display: none;
}

#image-input:hover {
	border-color: #555;
}

.image-input-container {
	position: relative;
	display: inline-block;
}
.clear-button {
	position: absolute;
	top: 0rem;
	right: 0rem;
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
.btn-container {
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

@media (max-width: 767px) {
	/* Styles for mobile */
	.form-container {
		width: 100%;
	}
	.btn-container {
		justify-content: center;
	}
	.button {
		width: 100%;
		margin: 1rem 0;
	}
	.single input,
	.double input,
	.single textarea,
	.double select {
		margin-right: 1rem;
	}
}
</style>
