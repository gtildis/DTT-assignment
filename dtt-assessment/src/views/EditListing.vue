<script setup>
import { ref, onMounted } from "vue";
import ListingForm from "@/components/ListingForm.vue";
</script>

<template>
	<div>
		<h1>Edit Listing</h1>
		<ListingForm
			:submitButtonText="isEditing ? 'Update Listing' : 'Create Listing'"
		/>
	</div>
</template>
