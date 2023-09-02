<script setup>
import BackToOverviewLink from "../components/BackToOverviewLink.vue";
import ListingForm from "../components/ListingForm.vue";

const props = defineProps({
	listingId: String,
});
</script>

<template>
	<div class="container">
		<div class="form-container">
			<div class="form-header">
				<BackToOverviewLink />
				<h1>Edit listing</h1>
			</div>
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
	margin-top: 5em;
}
.form-container {
	width: 70%;
}

.form-container h1 {
	font-family: "Montserrat", sans-serif;
	font-size: 32px;
}

@media (max-width: 767px) {
	/* Styles for mobile */

	.container {
		margin-bottom: 6rem;
		margin-top: 0;
	}
	.form-container {
		width: 90%;
	}
	.form-header {
		display: flex;
		align-items: center;
		position: relative;
		justify-content: center;
	}
	.form-header h1 {
		padding: 1rem;
		font-size: 22px;
		font-weight: 700;
		text-align: center;
	}
}
</style>
