import { React, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import "./Profile.css";
import "../index.css";
import { Button, Card, ListGroup, Form } from "react-bootstrap";
import { Backdrop,Paper } from "@mui/material";
import ScrollArea from "react-scrollbar";

const Profile = () => {
  const [expCur, setExpCur] = useState([]);
  const [expPast, setExpPast] = useState([]);
  const [dpBackdrop, setDpBackdrop] = useState(false);
  const [imageSelected, setImageSelected] = useState();

  useEffect(() => {
    const url = "http://localhost:8080/profile";
    axios({
      method: "POST",
      withCredentials: true,
      url: url,
      data: {
        email: localStorage.getItem("email"),
        reqStatus: "true"
      },
    }).then((res) => {
      const newExpCur = [];
      const newExpPast = [];
      res.data.map((item) => {
        if (new Date(item.endingDate) >= new Date())
          newExpCur.push(item);
        else
          newExpPast.push(item);
      })
      setExpCur(newExpCur);
      setExpPast(newExpPast);
    });
  }, []);

  const [state, setState] = useState({
    isPaneOpenPast: false,
    isPaneOpenUpcoming: false,
  });

  const uploadImage = () => {
    // axios
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={dpBackdrop}
        >
          <Paper elevation={24}>
            <img
              alt=""
              style={{ float: "right", margin: "5px" }}
              onClick={() => setDpBackdrop(false)}
              src={
                "https://img.icons8.com/" +
                "ios" +
                "/35/000000/cancel.png"
              }
            />
            <Form style={{ padding: "40px", textAlign: "center" }}>
              <input
                type="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
              <hr />
              <Button
                style={{ fontSize: "1.2rem" }}
                onClick={uploadImage}
              >
                Upload
              </Button>
            </Form>
          </Paper>
        </Backdrop>
        <div
          style={{
            margin: "20px 100px 0 0",
            fontFamily: "'Josefin Sans', sans-serif",
            height: "50px",
            fontSize: "2rem",
            fontWeight: "400",
            display: "inline-block",
          }}
        >
          <div style={{ marginLeft: "60px", display: "inline-block" }}>
            <Button
              variant="outline-light"
              onClick={() =>
                setState({ isPaneOpenPast: true, isPaneOpenUpcoming: false })
              }
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: "600",
                fontSize: "1.2rem",
                color: "black",
                border: "1px groove",
                borderRadius: "10%"
              }}
            >
              Past
            </Button>
          </div>
          <div style={{ display: "inline-block", marginLeft: "50px" }}>
            <Button
              variant="outline-light"
              onClick={() =>
                setState({ isPaneOpenPast: false, isPaneOpenUpcoming: true })
              }
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: "600",
                color: "black",
                fontSize: "1.2rem",
                border: "1px groove",
                borderRadius: "10%"
              }}
            >
              Upcoming
            </Button>
          </div>
          {state.isPaneOpenPast === true ? (
            <div>
              <Card className="card">
                <Card.Header style={{ fontSize: "1.5rem", fontWeight: "550" }}>Past Expeditions</Card.Header>
                <ScrollArea
                  speed={0.5}
                  className="area"
                  contentClassName="content"
                  horizontal={false}
                  verticalScrollbarStyle={{ borderRadius: "500px" }}
                >
                  <ListGroup className="textstyle" variant="flush">
                    {expPast.length === 0 ? <p>No past Expedition found</p> :
                      expPast.map((exp) => {
                        return (
                          <ListGroup.Item>{exp.name}</ListGroup.Item>
                        );
                      })
                    }
                  </ListGroup>
                </ScrollArea>
              </Card>
            </div>
          ) : (
            <div>
              <Card className="card">
                <Card.Header style={{ fontSize: "1.5rem", fontWeight: "550" }}>Upcoming Expeditions</Card.Header>
                <ScrollArea
                  verticalScrollbarStyle={{ borderRadius: "500px" }}
                  speed={0.5}
                  className="area"
                  contentClassName="content"
                  horizontal={false}
                >
                  <ListGroup className="textstyle" variant="flush">
                    {expCur.length === 0 ? <p>No Upcoming Expedition found</p> :
                      expCur.map((exp) => {
                        return (
                          <ListGroup.Item>{exp.name}</ListGroup.Item>
                        );
                      })
                    }
                  </ListGroup>
                </ScrollArea>
              </Card>
            </div>
          )}
        </div>
        <div style={{ marginLeft: "50px" }}>
          <h1
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              marginTop: "50px",
              marginLeft: "40px",
              fontSize: "3rem"
            }}
          >
            Profile
          </h1>
          <Image
            onClick={() => setDpBackdrop(true)}
            style={{
              position: "absolute",
              height: "239px",
              width: "239px",
              marginTop: "40px",
              display: "inline-block",
              border: "3px ridge"
            }}
            src="https://static.thenounproject.com/png/204868-200.png"
            roundedCircle
          />
        </div>
        <div
          style={{
            margin: "20px 0 0 300px",
            display: "inline-block",
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
              height: "40px",
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
              height: "40px",
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
              height: "40px",
            }}
          >
            {localStorage.getItem("contactNumber")}
          </div>
        </div>
        {/* </Col>
          </Row>
        </Container> */}
      </div>
    </>
  );
};

export default Profile;
