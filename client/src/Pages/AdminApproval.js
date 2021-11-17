import axios from 'axios';
import { React, useEffect, useState } from 'react';
import {Alert} from 'react-bootstrap';

const AdminApproval = (params) => {

    const [details, setDetails] = useState();
    useEffect(() => {
        console.log("in admin use");
        const url = "http://localhost:8080/expedition/PendingRequests/" + params.expId
        axios({
            method: "GET",
            withCredentials: true,
            url: url
        }).then((res) => {
            setDetails(res.data);
        })
    }, []);

    return (
        <div style = {{marginTop: "50px"}}>
            {details ? details.map((request) => {
                return (
                    <div style = {{width: "75%", margin: "auto"}}>
                        <Alert variant="info">
                        {request.userEmail}
                        </Alert> 
                    </div>
                );
            }) : null}
        </div>
    );
}

export default AdminApproval;