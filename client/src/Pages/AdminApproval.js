import axios from "axios";
import { React, useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";

const AdminApproval = (params) => {
  const [details, setDetails] = useState();
  useEffect(() => {
    const url =
      "http://localhost:8080/expedition/PendingRequests/" + params.expId;
    axios({
      method: "GET",
      withCredentials: true,
      url: url,
    }).then((res) => {
      setDetails(res.data);
    });
  }, []);

  const approveRequest = (request, index) => {
    const url =
      "http://localhost:8080/expedition/approveRequest/" + request._id;
    axios({
      method: "POST",
      withCredentials: true,
      url: url,
    }).then((res) => {
      console.log(res.data);
      const tempDetails = [...details];
      tempDetails.splice(index, 1);
      setDetails(tempDetails);
    });
  }

  const declineRequest = (request, index) => {
    const url =
      "http://localhost:8080/expedition/declineRequest/" + request._id;
    axios({
      method: "POST",
      withCredentials: true,
      url: url,
    }).then((res) => {
      console.log(res.data);
      const tempDetails = [...details];
      tempDetails.splice(index, 1);
      setDetails(tempDetails);
    });
  }

  return (
    <div
      style={{
        maxHeight: "600px",
        "overflow-y": "scroll",
        marginTop: "50px",
      }}
    >
      {details
        ? details.map((request, index) => {
          return (
            <div
              style={{
                width: "75%",
                margin: "auto",
              }}
            >
              <Accordion
                style={{ marginBottom: "10px" }}
                defaultActiveKey="0"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{request.userEmail}</Accordion.Header>
                  {request
                    ? request.customItemSelected.map((item) => {
                      return (
                        <>
                          <Accordion.Body>
                            {item.name}:{item.price}
                          </Accordion.Body>
                        </>
                      );
                    })
                    : null}
                </Accordion.Item>
                <Accordion.Item style={{ display: "flex" }}>
                  <Button onClick={() => approveRequest(request, index)} style={{ marginLeft: "60%" }} variant='primary'>Approve</Button>
                  <Button onClick={() => declineRequest(request, index)} variant='primary'>Decline</Button>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })
        : null}
    </div>
  );
};

export default AdminApproval;
