import React from "react";
import { Switch, useHistory, Route } from "react-router-dom";
import Room from "./Room";
import Payment from "./Payment";
import BookARoom from "./BookARoom";
import "./Home.css";
import HeroComponent from "./HeroComponent";



function Home() {


  return (
    <>
      
      <HeroComponent/>

      <Switch>
        {/*<Route path="/" component={HeroComponent}></Route> */}
        { <Route path="/BookARoom" component={BookARoom}></Route> }
        { <Route path="/Payment" component={Payment}></Route> }
      </Switch>
    </>
  );
}

export default Home;
