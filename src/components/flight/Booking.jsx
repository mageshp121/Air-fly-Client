import React, { useEffect, useState } from "react";
import { getFlightSeat } from "../../utils/api/axios.GetApi";
import {
  ticketOrderCreate,
  verifyPayment,
} from "../../utils/api/axios.PostAPi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

window.Razorpay = window.Razorpay || {};

function Booking() {
  const [flitSeatData, setFlightSeatData] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const secreat = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
  const seatPrice = useSelector((store) => {
    return store.user.seatPrice;
  });
  const flightId = useSelector((store) => {
    return store.user.fliightId;
  });
  // Define state variables
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    numPassengers: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = (seat) => {
    if (seat.status === "available") {
      // Check if the seat is already selected
      const seatIndex = selectedSeats.findIndex(
        (selectedSeat) => selectedSeat.id === seat.id
      );
      if (seatIndex === -1) {
        // If not, add it to the selectedSeats array
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        // If already selected, remove it from the array
        const updatedSelectedSeats = [...selectedSeats];
        updatedSelectedSeats.splice(seatIndex, 1);
        setSelectedSeats(updatedSelectedSeats);
      }
    }
  };

  useEffect(() => {
    handleGetFlightSeat(flightId);
  }, []);

  const handleGetFlightSeat = async (flightId) => {
    const flightSeatDat = await getFlightSeat(flightId);
    setFlightSeatData(flightSeatDat.data);
  };

  const initPayment = (data, razorPayId) => {
    const price = data.totalAmmount;
    const options = {
      key: razorPayId,
      amount: price * 1000,
      order_id: data.order_Id,
      handler: async (RazorPayresponse) => {
        try {
          const response = await verifyPayment(RazorPayresponse);
          if (response.status === 200) {
            handleGetFlightSeat(flightId);
            toast.success("Ticket successFully bookes");
          } else {
            toast.error("Something went wrong..!");
          }
        } catch (error) {
          toast.error("Something went wrong..!");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const bookFlight = async () => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      numberOfpassenger: formData.numPassengers,
      flightId: flitSeatData.flightId,
      totalAmmount: seatPrice,
      seatnumber: selectedSeats[0].id,
      status: "pending",
    };
    if (selectedSeats.length !== 0) {
      const response = await ticketOrderCreate(payload);
      if (response.status === 200) {
        initPayment(response.data, secreat);
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-green-50  to-green-100 p-12">
        <div className=" bg-white gap-10 border  flex-row  p-12 border-gray-300 rounded-xl shadow-2xl h-[750px]  ">
          <div className="w-full text-center h-5 mb-12">
            <h1>Provide You'r details </h1>
          </div>
          <div className="flex gap-6 ">
            <div className="w-full rounded-xl shadow-xl border border-gray-300 bg-white  h-auto">
              <div className=" w-full p-12 flext justify-center ">
                <h1 className="text-center mb-6">Select you'r seat</h1>
                <div className="grid grid-cols-3  grid-rows-2 gap-4">
                  {flitSeatData?.seatsData?.map((seat) => (
                    <div
                      key={seat.id}
                      onClick={() => handleClick(seat)}
                      className={`text-center flex items-center shadow-2xl justify-center h-28 transform transition duration-500 hover:scale-110 rounded-2xl ${
                        seat.status === "available" &&
                        selectedSeats.find(
                          (selectedSeat) => selectedSeat.id === seat.id
                        )
                          ? "bg-green-500 border border-green-800"
                          : seat.status === "available"
                          ? "bg-blue-200 border border-blue-600"
                          : "bg-amber-600 border border-amber-800"
                      } `}
                    >
                      <h1>
                        {seat.status === "available" ? seat.id : "Booked"}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white shadow-2xl border border-gray-300 rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              <div className="-mx-3 w-[500px] md:flex mb-6">
                <div className="md:w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    First name
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                    id="grid-password"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Last name
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                    id="grid-password"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Select number of passengers
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 hover:focus:border-black  dark:text-gray-400 dark:focus:ring-black dark:focus:border-black"
                name="numPassengers"
                value={formData.numPassengers}
                onChange={handleInputChange}
              >
                <option value="">Number of passengers</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => bookFlight()}
            className="w-full bg-black mt-12 h-12 rounded-xl text-white text-xl"
          >
            Book
          </button>
        </div>
      </div>
    </>
  );
}

export default Booking;
