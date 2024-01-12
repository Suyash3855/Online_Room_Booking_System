import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Room from "./Room";
import Payment from "./Payment";
import "./BookARoom.css";

const BookARoom = () => {
  const [checkInDate, setCheckInDate] = React.useState("");
  const [checkOutDate, setCheckOutDate] = React.useState("");
  const [numGuests, setNumGuests] = React.useState(1);
  const [roomType, setRoomType] = React.useState("DELUX");
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [noofBooked, setnoOfBooked] = React.useState(1);


  const history = useHistory();
  

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleNumGuestsChange = (event) => {
    setNumGuests(parseInt(event.target.value));
  };

  const handleRoomTypeChange = (event) => {
    console.log(event.target.value);
    setRoomType(event.target.value);
  };

  const calculatePrice = () => {
    const pricePerNight = roomType === "DELUX" ? 1200 : 800;
    const numNights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = pricePerNight * numNights * numGuests;
    return totalPrice;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const price = calculatePrice();
    setTotalPrice(price);

  
    const email = sessionStorage.getItem("email");
    const data = {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numGuests: numGuests,
      roomType: roomType,
      totalPrice: price,
      email: email,
      noofBooked:noofBooked,
    };

    history.push({
      pathname: "/Payment",
      state: {
        bookingData: data,
        totalPrice: price,
      },
    });
  };

  //handle confirm is not required here but it show error so i put this.
  const handleConfirm = () => {
    console.log("Booking confirmed!");
    axios.post("/Payment", {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numGuests: numGuests,
      roomType: roomType,
      totalPrice: totalPrice,
      noofBooked: noofBooked,
    });
    setTotalPrice(0);
    setCheckInDate("");
    setCheckOutDate("");
    setNumGuests(1);
    setRoomType("DELUX");
  };

  

  return (
    <div>
      <h2>Book a Room</h2>
      <Room />
      <form onSubmit={handleSubmit}>
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkInDate}
            onChange={handleCheckInDateChange}
          />
        </label>
        <br />
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
          />
        </label>
        <br />
        <label>
          Number of Guests:
          <input
            type="number"
            min="1"
            value={numGuests}
            onChange={handleNumGuestsChange}
          />
        </label>
        <br />
        <label>
          Room Type:
          <select value={roomType} onChange={handleRoomTypeChange}>
            <option value="DELUX">Delux</option>
            <option value="NON_DELUX">Non-Delux</option>
          </select>
        </label>
        <br />
        
        <button type="submit">Calculate Price</button>
      </form>
      {totalPrice > 0 && (
        <div>
          <h3>Total Price: {totalPrice}</h3>
          <button onClick={handleConfirm}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default BookARoom;
