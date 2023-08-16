<template>
	<form @submit.prevent="handleSubmit">
		<button type="submit">{{ submitButtonText }}</button>
	</form>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
	address: "",
});

const handleSubmit = () => {};
</script>
