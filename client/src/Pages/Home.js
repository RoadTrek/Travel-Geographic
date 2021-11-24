import "./Home.css";
import ParticleBackground from "../ParticleBackground";
import Image from "../Image/background.jpg";
import React from "react";
import sachin from "../Image/sachin2021.mp4";
import sponser1 from "../Image/sponser1.jpeg";
import sponser2 from "../Image/sponser2.jpeg";
const styles = {
  container: {
    margin: "0px",
  },
};

function Home() {
  //temp
  return (
    <>
      <div style={{ marginTop: "484px" }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            opacity: "0.9",
            width: "100%",
            left: "50%",
            height: "80%",
            top: "50%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: -0,
          }}
        >
          <source src={sachin} type="video/mp4" />
        </video>
      </div>
      <div id="text_div center_all">
        <div className="center_all">
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "550",
              color: "white",
              fontFamily: "'Montserrat',sans-serif",
            }}
          >
            Off-road the un-explored
          </h3>
          <div
            style={{
              marginTop: "5px",
              marginBottom: "15px",
              borderRadius: "100px",
              marginLeft: "160px",
              width: "100px",
              height: "5px",
              backgroundColor: "#fb2056",
            }}
          ></div>
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "700",
              color: "white",
              fontFamily: "'Montserrat',sans-serif",
            }}
            className="custom-subTitle"
          >
            Travel Geographic
          </h1>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "black",
          width: "100vw",
          height: "16vh",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#F7F7F7",
          width: "100vw",
          height: "25vh",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color: "#070707",
            fontFamily: "'Comforter Brush', cursive",
            textShadow: " 0px 0px 10px rgb(0 0 0 / 30%)",
            fontSize: "20px",
            fontWeight: "700",
            margin: "0",
            position: "relative",
            top: "40%",
          }}
        >
          “You Must Go On Adventure to find out who you belong to !!”
        </h3>
      </div>
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100vw",
          height: "50vh",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginTop: "15px",
            color: "#cf1010",
            fontSize: "",
            fontWeight: "700",
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          OUR PARTNERS
        </h1>
        <img
          style={{ height: "80px", width: "500px", marginRight: "250px" }}
          alt=""
          src={sponser1}
        ></img>
        <img alt="" src={sponser2} />
      </div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "black",
          width: "100%",
          height: "100px",
        }}
      >
        <span
          style={{
            fontWeight: "400",
            fontSize: "15px",
            color: "white",
            margin: "0",
            position: "relative",
            top: "40%",
          }}
        >
          Copyright©2021 TravelGeographic
        </span>
      </div>
    </>
  );
}

export default Home;
