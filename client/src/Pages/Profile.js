import { React, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {

    const [details, setDetails] = useState();

    useEffect(() => {
        const url =
            "http://localhost:8080/profile";
        axios({
            method: "POST",
            withCredentials: true,
            url: url,
            data: {
                email: localStorage.getItem('email')
            }
        }).then((res) => {
            console.log(res.data);
        });
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{
                borderBottomLeftRadius: "90%", borderBottomRightRadius: "90%", 
                height: "100px", backgroundColor: "#8d9496", display: "flex", justifyContent: "center"
            }}>
                <Image style={{ height: "150px", width: "175px", margin: "30px" }} src="https://www.grunge.com/img/gallery/the-tragic-real-life-story-of-shirley-temple/l-intro-1603459690.jpg" roundedCircle />
            </div>
            <div style={{ marginTop: "90px" }}>
                <p style={{ fontSize: "2rem", fontWeight: "600", margin: "0" }} >{localStorage.getItem("name")}</p>
                <p style={{ fontSize: "1.2rem", fontWeight: "400", margin: "0" }} >{localStorage.getItem("email")}</p>
                <p style={{ fontSize: "1.2rem", fontWeight: "400", margin: "0" }} >{localStorage.getItem("contactNumber")}</p>
            </div>
            <div style={{height:"35vh"}}></div>
            <div style={{
                borderTopLeftRadius: "90%", borderTopRightRadius: "90%", 
                height: "90px", backgroundColor: "#8d9496", display: "flex", justifyContent: "center"
            }}></div>
        </div>
    )
}

export default Profile;