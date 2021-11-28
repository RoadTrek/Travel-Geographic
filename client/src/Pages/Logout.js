import { React, useEffect } from 'react';
import axios from 'axios';

const Logout = () => {

    axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:8080/logout",
    }).then((res) => {
        console.log(res);
        localStorage.removeItem("name");
        localStorage.removeItem("logged", false);
        localStorage.removeItem("email");
        window.location.href = "http://localhost:3000";
    });

    return (
        <div style = {{display: "flex", justifyContent: "center"}}>
            <img style = {{height: "500px"}} src = "https://ih1.redbubble.net/image.1217030462.8500/pp,840x830-pad,1000x1000,f8f8f8.jpg" />
        </div>
        
    );
}

export default Logout;