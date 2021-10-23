import "./Home.css";
import ParticleBackground from "../ParticleBackground";
import Image from "../Image/background.jpg";
import React from 'react';

const styles = {
  container: {
    margin: '0px'
  }
}

function Home() {
  return (
    <div>
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
