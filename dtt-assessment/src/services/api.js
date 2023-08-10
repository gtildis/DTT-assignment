import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://api.intern.d-tt.nl/api",
	headers: {
		"X-Api-Key": "9QfJTUoG1dIEZLvg3Yu_4bentCky6-mc",
		"Content-Type": "multipart/form-data",
	},
});

export default apiClient;
