import axios from 'axios';
import { React, useEffect, useState } from 'react';

const AdminApproval = (params) => {

    const [details, setDetails] = useState();
    useEffect(() => {
        const url = "http://localhost:8080/expedition/PendingRequests/" + params.expId
        axios({
            method: "GET",
            withCredentials: true,
            url: url
        }).then((res) => {
            console.log(res);
            setDetails(res.data);
        })
    }, []);

    return (
        <>
            <p>Hello</p>
        </>
    );
}

export default AdminApproval;