import "./Home.css";
import React from "react";
import sachin from "../Image/homepage.mp4";
import sponser1 from "../Image/sponser1.jpeg";
import sponser2 from "../Image/sponser2.jpeg";
import { Parallax } from "react-parallax";
import {Link} from 'react-router-dom';
import {Button } from 'react-bootstrap'
function Home() {
  const insideStyles = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    margin:"0 0 0 200px",
    transform: "translate(-50%,-50%)",
  };
  return (
    <>
      <div>
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
            zIndex: 0,
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
      <div style={{ position: "absolute", marginTop: "480px" }}>
        <div
          style={{
            position: "relative",
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
        <div>
          <Parallax bgImage="https://i.ibb.co/wc6CFm2/bgimg.jpg" strength={500}>
            <div style={{ height: 600 }}>
              <div>
                <img
                  style={{margin:"170px 0 0 250px",width:"25%",height:"260px"}}
                  alt=""
                  src="https://i.ibb.co/nwY8z95/car.jpg"
                ></img>
              </div>
              <div style={insideStyles}>
                <h1 style={{fontWeight:"700"}}>Explore the Un-Explored</h1>
                <div
                  style={{
                    borderRadius: "100px",
                    marginTop: "15px",
                    marginBottom: "50px",
                    width: "100px",
                    height: "5px",
                    backgroundColor: "#fb2056",
                  }}
                ></div>
                <h4 style={{fontWeight:"700"}}>Don't be gama in the land of lama.</h4>
                <br />
                <br />
                <br />
                <Link to="/expedition">
                  <Button
                  variant="secondary"
                    style={{
                      borderRadius:"40px",
                      fontWeight:"700",
                      color:"white",
                      width: "120px",
                      height: "45px",
                      backgroundColor: "#fb2056",
                    }}
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          </Parallax>
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
      </div>
    </>
  );
}

export default Home;
