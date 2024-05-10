import { apiRequest} from "../config/axios.Config";
export const registerUser = async (payLoad) => {
	const config= {
		method: "POST",
		url: `api/v1/auth/email-register`,
		data:payLoad,
		headers: {
            'Content-Type': "application/json"
        }
	};
	return await apiRequest(config);
};

export const verifyOtp = async (payLoad) => {
	const config= {
		method: "POST",
		url: `api/v1/auth/email-verify`,
		data:payLoad,
		headers: {
            'Content-Type': "application/json"
        }
	};
	return await apiRequest(config);
};

export const flightSearch = async (payLoad) => {
	const config= {
		method: "POST",
		url: `/api/v1/flights/flight-search`,
		data:payLoad,
		headers: {
            'Content-Type': "application/json"
        }
	};
	return await apiRequest(config);
};

export const ticketOrderCreate = async (payLoad) => {
	const config= {
		method: "POST",
		url: `/api/v1/flights/fllight-ticket-checkout`,
		data:payLoad,
		headers: {
            'Content-Type': "application/json"
        }
	};
	return await apiRequest(config);
};

export const verifyPayment = async (payLoad) => {
	const config= {
		method: "POST",
		url: `/api/v1/flights/flight-paymen-verify`,
		data:payLoad,
		headers: {
            'Content-Type': "application/json"
        }
	};
	return await apiRequest(config);
};
