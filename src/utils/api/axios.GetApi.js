// /ok

import { apiRequest } from "../config/axios.Config";
	

export const getAllFlights = async () => {
	const config= {
		method: "GET",
		url: `/api/v1/flights/flight-all`
	};
	return await apiRequest(config);
};
export const getFlightSeat=async(query)=>{
	console.log("ok calling");
	const config={
		method:"GET",
		url:`/api/v1/flights/flight-seat?seatId=${query}`
	};
	return await apiRequest(config)
}