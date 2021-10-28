import "./Home.css";
import ParticleBackground from "../ParticleBackground";
import Image from "../Image/background.jpg";
import React from 'react';
import sachin from '../Image/sachin2021.mp4'

const styles = {
  container: {
    margin: '0px'
  }
}

function Home() {
  //temp
  return (
    <div>
      <div>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            opacity: "0.8",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: -0
          }}
        >
          <source src={sachin} type="video/mp4" />
        </video>
      </div>
      <CenterTitle />
      <div style={
        {
          backgroundColor: "#ffffff",
          width: '100vw',
          height: '100vh'
        }
      } >

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
