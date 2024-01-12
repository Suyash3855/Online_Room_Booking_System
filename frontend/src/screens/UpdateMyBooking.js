import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateMyBooking() {
  const [booking, setBooking] = useState({
    noofBooked: "",
    checkInDate: "",
    checkOutDate: "",
    numGuests: "",
    roomType: "",
    bookingHotel: "1"
  });
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = () => {
    const bookingId = sessionStorage.getItem("bookingId");
    const url = `http://localhost:7070/booking/bookingdetail/${bookingId}`;
    axios.get(url)
      .then(function(response) {
        setBooking(response.data);
      })
      .catch(function(error){
        console.log(error);
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookingId = sessionStorage.getItem("bookingId");
    const url = `http://localhost:7070/booking/update/${bookingId}`;
    axios.put(url, booking)
      .then(function(response) {
        setIsUpdated(true);
      })
      .catch(function(error){
        console.log(error);
      })
  };

  return (
    <div>
      {isUpdated ? (
        <h1 style={{ color: "green", fontWeight: "bold" }}>
          Booking updated successfully!
        </h1>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label>
          No. of Booked:
          <input
            type="text"
            value={booking.noofBooked}
            onChange={(event) =>
              setBooking({ ...booking, noofBooked: event.target.value })
            }
          />
        </label>
        <br />
        <label>
          Check-in Date:
          <input
            type="date"
            value={booking.checkInDate}
            onChange={(event) =>
              setBooking({ ...booking, checkInDate: event.target.value })
            }
          />
        </label>
        <br />
        <label>
          Check-out Date:
          <input
            type="date"
            value={booking.checkOutDate}
            onChange={(event) =>
              setBooking({ ...booking, checkOutDate: event.target.value })
            }
          />
        </label>
        <br />
        <label>
          No. of Guests:
          <input
            type="number"
            value={booking.numGuests}
            onChange={(event) =>
              setBooking({ ...booking, numGuests: event.target.value })
            }
          />
        </label>
        <br />
        <label>
          Room Type:
          <select
            value={booking.roomType}
            onChange={(event) =>
              setBooking({ ...booking, roomType: event.target.value })
            }
          >
            <option value="NON_DELUX">Non-Deluxe</option>
            <option value="DELUX">Deluxe</option>
          </select>
        </label>
        <br />
        {/* <label>
          Booking Hotel:
          <input
            type="text"
            value={booking.bookingHotel}
            onChange={(event) =>
              setBooking({ ...booking, bookingHotel: event.target.value })
            }
          />
        </label> */}
        <br />
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
}

export default UpdateMyBooking;
