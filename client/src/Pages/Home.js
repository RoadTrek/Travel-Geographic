import "./Home.css";
import ParticleBackground from "../ParticleBackground";
import Image from "../Image/background.jpg";
import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import NavbarAfterLogin from "../components/Navbar/NavbarAfterLogin.js";
import NavbarComp from "../components/Navbar/NavbarComp.js";

const styles = {
  container: {
    margin: '0px'
  }
}


function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [userData, setUserData] = React.useState({});
React.useEffect(() => {
  axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:8080/user",
  }).then((res) => {
    const loadedData = res.data;
    setUserData(loadedData);
    console.log("Hello",res.data);
    console.log("login mein hai",isLoggedIn);
    setIsLoggedIn(true);
  });
}, [userData.length]);
  return (
    <div>
    {isLoggedIn ? (
                <NavbarAfterLogin data={userData}/>
                ) : (
                  <NavbarComp/>
                )}
      <div style={
        {
          backgroundImage: `url(${Image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh'
        }}>
        <ParticleBackground />
        <CenterTitle />
      </div>
      <div style={
        {
          backgroundColor: "#ffffff",
          width: '100vw',
          height: '100vh'
        }
      } >

        <div>
          <h1 id="text_div2 center_all2" className="custom-subTitle" style={styles.container}>Travel Geographic</h1>
        </div>
      </div>
    </div>
  );
}

function CenterTitle() {
  return (
    <div id="text_div center_all">
      <div className="center_all">
        <h1 className="custom-subTitle">Travel Geographic</h1>
      </div>
    </div>
  );
}

export default Home;
