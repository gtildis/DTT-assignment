<script setup>
import BackToOverviewLink from "../components/BackToOverviewLink.vue";
import ListingForm from "../components/ListingForm.vue";

const props = defineProps({
	listingId: String, // Change the type if needed
});
</script>

<template>
	<div class="container">
		<div class="form-container">
			<BackToOverviewLink />
			<h1>Edit listing</h1>
			<ListingForm
				submitButtonText="SAVE"
				:isEdit="true"
				:listingId="listingId"
			/>
		</div>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
	background-image: url("../assets/img_background@3x.png");
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
}
.form-container {
	width: 70%;
}

.form-container h1 {
	font-family: "Montserrat", sans-serif;
	font-size: 32px;
}
</style>
