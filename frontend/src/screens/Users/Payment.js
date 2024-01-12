import React, { useState } from "react";
import axios from 'axios';
import "./payment.css";

const Payment = (props) => {
  debugger;
  const [bookingId, setBookingId] = useState(null);
  const [name, setName] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const price = props.location.state.totalPrice;
  const bookingData = props.location.state.bookingData;
  const userEmail = sessionStorage.getItem('userName'); // get email from session
  console.log(userEmail);
  
  const handlePayment = (e) => {
    e.preventDefault();
    const bookingId = generateBookingId();
    const name = e.target.elements.name.value;
    const date = new Date().toISOString();
    const data = {
     // "noofBooked":"",
      "checkInDate": bookingData.checkInDate,
      "checkOutDate": bookingData.checkOutDate,
      "numGuests": bookingData.numGuests,
      "roomType": bookingData.roomType,
      "bookingHotel":"1",
      "userId": userEmail,
      "noofBooked":bookingData.noofBooked,
    };
    console.log(data);
    
    axios.post("http://localhost:7070/booking/book", data)
      .then(response => {
        setBookingId(bookingId);
        setName(name);
        setBookingStatus("Booking Successful!");
      })
      .catch(error => {
        console.log(error);
        setBookingStatus("Booking Failed. Please try again.");
      });

    setBookingId(bookingId);
    setName(name);
    setBookingStatus("Booking Successful!");
  };

  const generateBookingId = () => {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Payment Page</h2>
      <h3 className="payment-price">Total Price: ₹{price}</h3>
      <p>Please enter your payment details:</p>
      <form onSubmit={handlePayment}>
        <label>
          Card Number:
          <br/>
          <input type="text" className="payment-input" />
        </label>
        <br />
        <label>
          Expiry Date:
          <br/>
          <input type="text" className="payment-input" />
        </label>
        <br />
        <label>
          CVV:
          <br/>
          <input type="text" className="payment-input" />
        </label>
        <br />
        <label>
          Name on Card:
          <br/>
          <input type="text" className="payment-input" name="name" />
        </label>
        <br />
        <button type="submit" className="payment-button">Pay Now</button>
      </form>
      {bookingStatus && (
        <div className="booking-details">
          <p className="booking-id">Booking ID: {bookingId}</p>
          <p className="booking-name">Name: {name}</p>
          <p className="booking-price">Total Price: ₹{price}</p>
          <p className="booking-status">Booking Status: {bookingStatus}</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
