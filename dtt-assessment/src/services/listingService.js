import apiClient from "../services/api";

// Function to create a new listing
async function createListing(formData) {
	try {
		const response = await apiClient.post("/houses", formData);
		return response.data;
	} catch (error) {
		console.error("Error creating listing:", error);
		throw error;
	}
}

// Function to edit an existing listing
async function editListing(listingId, formData) {
	try {
		const response = await apiClient.post(`/houses/${listingId}`, formData);
		return response.data;
	} catch (error) {
		console.error("Error editing listing:", error);
		throw error;
	}
}

export { createListing, editListing };
