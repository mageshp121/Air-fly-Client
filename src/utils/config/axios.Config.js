import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5000
});  

export const apiRequest = async (config) => {
	console.log(config,"config");
	try {
		const response = await api(config);
		console.log(response,"response config");
		return response;
	} catch (error) {
		console.error(error, "errr,okok");
		return error;
	}
};


export const headerConfg = () => {
	const token = localStorage.getItem("adminToken");
	if (token) {
		return {
			Authorization: ` Bearer ${token}`
		};
	}
};
