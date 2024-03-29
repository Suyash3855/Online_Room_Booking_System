import React, { useState , useEffect } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row m-3 p-3 bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-8">
        <h2 color="#28041f"><b>{room.name}</b></h2>
        <h1 color="#28041f">{room.city}</h1>
        <div>
        {/* <p>Parking | Reception | Free Wifi</p> */}
        <hr></hr>
        
        </div>
        <p>
          <b>Max Person Allowed : {room.maxcount}</b>
        </p>
        <p>
          <b>Phone Number : </b>
          {room.phonenumber}
        </p>
        <p>
          <b>Type : {room.type}</b>
        </p>

        <div style={{ float: "right" }}>
          
          {(fromdate && todate) && (<Link to={`/book/₹{room._id}/₹{fromdate}/₹{todate}`}>
            <button className="btn btn-dark m-2">Book Now</button>
          </Link>)}

          <button className="btn btn-danger m-2"  onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" data--aos='zoom-in'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel nextLabel="" prevLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    src={url}
                    className="img-fluid"
                    style={{ height: "400px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
