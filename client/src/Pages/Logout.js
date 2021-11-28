import { React } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
toast.configure();
    axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:8080/logout",
    }).then((res) => {
        toast.success("Logged out Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        console.log(res);
        localStorage.removeItem("name");
        localStorage.removeItem("logged", false);
        localStorage.removeItem("email");
        localStorage.removeItem("contactNumber");
        window.location.href = "http://localhost:3000";

    });

    return (
        <div style = {{display: "flex", justifyContent: "center"}}>
            <img alt="" style = {{height: "500px"}} src = "https://ih1.redbubble.net/image.1217030462.8500/pp,840x830-pad,1000x1000,f8f8f8.jpg" />
        </div>
        
    );
}

export default Logout;