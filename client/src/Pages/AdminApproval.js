import axios from "axios";
import { React, useEffect, useState } from "react";
import { Accordion,Button } from "react-bootstrap";

const AdminApproval = (params) => {
  const [details, setDetails] = useState();
  useEffect(() => {
    console.log("in admin use");
    const url =
      "http://localhost:8080/expedition/PendingRequests/" + params.expId;
    axios({
      method: "GET",
      withCredentials: true,
      url: url,
    }).then((res) => {
      console.log(res);
      setDetails(res.data);
      console.log(details);
    });
  }, []);

  return (
    <div
      style={{
        maxHeight: "600px",
        "overflow-y": "scroll",
        marginTop: "50px",
      }}
    >
      {details
        ? details.map((request) => {
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
                  <Accordion.Item>
                      <Button style={{marginLeft:"79%"}} variant='primary'>Approve</Button>
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
