import React from "react";
import { Switch, useHistory, Route } from "react-router-dom";
import "./Home.css";



function HeroComponent({ onNextPage }) {

  const history = useHistory();

  const book = () => {
    history.push('/BookARoom');
  };

  return (
    <div className="Hero-section">
      <div className="home-block">
        <h1 style={{ color: "#fff", fontSize: "3rem", marginBottom: "1rem" }}>
          Welcome to StrangerX
        </h1>

        <button
          onClick={book}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#fff",
            color: "#000",
            marginTop: "2rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
export default HeroComponent;