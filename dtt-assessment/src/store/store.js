import { defineStore } from "pinia";
import apiClient from "../services/api";

export const useGlobalStore = defineStore("global", {
	state: () => ({
		houseDetails: null,
		houses: [],
		recommendedHouses: [],
		city: "",
	}),

	actions: {
		async fetchHouseDetails(houseId) {
			try {
				const response = await apiClient.get(`/houses/${houseId}`);
				this.houseDetails = response.data[0];
			} catch (error) {
				console.error("Error fetching house details:", error);
				throw error;
			}
		},
		async fetchHouses() {
			try {
				const response = await apiClient.get("/houses");
				this.houses = response.data;
			} catch (error) {
				console.error("Error fetching houses:", error);
				throw error;
			}
		},
		async deleteHouse(houseId) {
			try {
				await apiClient.delete(`/houses/${houseId}`);
				await this.fetchHouses();
			} catch (error) {
				console.error("Error deleting house:", error);
			}
		},
	},
});
