import { React, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import "./Profile.css";
import "../index.css";
const Profile = () => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const url = "http://localhost:8080/profile";
    axios({
      method: "POST",
      withCredentials: true,
      url: url,
      data: {
        email: localStorage.getItem("email"),
      },
    }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <div style={{
                borderBottomLeftRadius: "90%", borderBottomRightRadius: "90%", 
                height: "100px", backgroundColor: "#8d9496", display: "flex", justifyContent: "center"
            }}> */}
        <Image
          style={{
            position: "absolute",
            height: "239px",
            width: "239px",
            marginTop: "200px",
          }}
          src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg"
          roundedCircle
        />
        
        <div
          style={{
            margin: "140px 0 0 700px",
          }}
        >
          <div
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              marginBottom: "20px",
              height: "50px",
              fontSize: "2rem",
              fontWeight: "400",
            }}
          >
            Details
          </div>
          <div className="details">Name:</div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "450",
              fontFamily: "'Open Sans', sans-serif",
              marginRight: "50px",
              height: "50px",
            }}
          >
            {localStorage.getItem("name")}
          </div>
          <div className="details">Email:</div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "450",
              fontFamily: "'Open Sans', sans-serif",
              height: "50px",
            }}
          >
            {localStorage.getItem("email")}
          </div>
          <div className="details">Contact Number</div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "450",
              fontFamily: "'Open Sans', sans-serif",
              height: "50px",
            }}
          >
            {localStorage.getItem("contactNumber")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
