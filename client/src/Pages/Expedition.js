import React, { useState } from "react";
import "./Home.css";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
  Backdrop,
  Paper,
} from "@mui/material";
import { Form, Button as Butt, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import sachin from "../Image/sachin2021.mp4";
import DatePicker from "react-date-picker";

export default function Expedition(props) {
  const [expDetail, setExpDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [mouseCard, setMouseCard] = useState({ width: "100%" });
  const [details, setDetails] = useState({
    name: "",
    desc: "",
    imageUrl: [],
    customItems: [],
    basePrice: "",
  });
  const [itemDetail, setItemDetail] = useState({
    name: "",
    price: "",
  });
  console.log(new Date());
  // const current = new Date();
  // const date = current.getDate();
  // console.log(date);
  const [imageSelected, setImageSelected] = useState("");
  const [endingDate, setEndingDate] = useState(new Date());
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/expedition/getExpedition",
    }).then((res) => {
      res.data.reverse();
      setExpDetail(res.data);
      console.log(expDetail);
    });
  }, []);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setDetails(function (prev) {
      const newVal = {
        ...prev,
        [name]: value,
      };
      return newVal;
    });
  }

  const handleItemChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setItemDetail((prev) => {
      const newVal = {
        ...prev,
        [key]: value,
      };
      return newVal;
    });
  };

  const handleAddItem = () => {
    const newCustomItems = [...details.customItems];
    newCustomItems.push(itemDetail);
    setItemDetail({
      name: "",
      price: "",
    });
    setDetails((prev) => {
      return {
        ...prev,
        customItems: newCustomItems,
      };
    });
  };

  const handleSubmit = () => {
    console.log(imageSelected);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", process.env.REACT_APP_uploadPreset);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/" +
        process.env.REACT_APP_cloudName +
        "/image/upload",
        formData
      )
      .then(async (res) => {
        const url = res.data.secure_url;
        const newImageUrl = [...details.imageUrl];
        newImageUrl.push(url);
        axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:8080/expedition/uploadExpedition",
          data: {
            ...details,
            endingDate: endingDate,
            imageUrl: newImageUrl,
          },
        }).then((res) => {
          window.location.reload();
          console.log("Data Sent", res);
        });
      });
  };

  const viewMoreHandler = (expId) => {
    const url = "/expedition/" + expId;
    props.history.push({
      pathname: url,
    });
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
            zIndex: -0,
          }}
        >
          <source src={sachin} type="video/webm" />
        </video>
      </div>
      <div id="text_div center_all">
        <div className="center_all">
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "700",
              color: "white",
              fontFamily: "'Montserrat',sans-serif",
            }}
            className="custom-subTitle"
          >
            Expedition
          </h1>
          <div
            style={{
              marginTop: "5px",
              marginBottom: "15px",
              borderRadius: "100px",
              width: "100px",
              height: "5px",
              backgroundColor: "#fb2056",
            }}
          ></div>
        </div>
      </div>
      <div style={{ position: "absolute", zIndex: -1, marginTop: "500px" }}>
        <div
          style={{
            position: "relative",
            backgroundColor: "black",
            width: "100vw",
            height: "16vh",
          }}
        ></div>
        {localStorage.getItem("email") === "tg.official.1001@gmail.com" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt=""
              onClick={() => setOpen(true)}
              style={{ width: "200px" }}
              src="https://i.ibb.co/v4wxH68/add-button.gif"
            />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <Paper
                style={{
                  maxHeight: "600px",
                  "overflow-y": "scroll",
                }}
                elevation={24}
              >
                <img
                  style={{ float: "right", margin: "5px" }}
                  onClick={() => setOpen(false)}
                  src={"https://img.icons8.com/ios/35/000000/cancel.png"}
                  alt="Please wait..."
                />
                <Form style={{ padding: "40px", fontSize: "20px" }}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                      placeholder="e.g: Shimla to Spiti"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Add Description</Form.Label>
                    <Form.Control
                      name="desc"
                      value={details.desc}
                      onChange={handleChange}
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Base Price (₹)</Form.Label>
                    <Form.Control
                      style={{ width: "40%" }}
                      name="basePrice"
                      type="number"
                      step="100"
                      value={details.basePrice}
                      onChange={handleChange}
                    />
                    <Form.Label>Registration Ending Date:</Form.Label>
                    <br />
                    <DatePicker
                      minDate={new Date()}
                      name="endingDate"
                      value={endingDate}
                      onChange={setEndingDate}
                    ></DatePicker>
                    {/* <Form.Control
                      style={{ width: "50%" }}
                      name="endingDate"
                      type="number"
                    /> */}
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Add Picture</Form.Label>
                    <br />
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageSelected(event.target.files[0]);
                      }}
                    />
                  </Form.Group>

                  {/* customizable */}

                  <hr />
                  <div style={{ display: "flex", fontSize: "1rem" }}>
                    <Form.Group
                      style={{ marginRight: "20px", width: "35%" }}
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control
                        name="name"
                        value={itemDetail.name}
                        onChange={handleItemChange}
                        placeholder="e.g Sleeping Bag"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Item Price (₹)</Form.Label>
                      <Form.Control
                        style={{ width: "100px", marginRight: "20px" }}
                        name="price"
                        type="number"
                        step="100"
                        value={itemDetail.price}
                        onChange={handleItemChange}
                      />
                    </Form.Group>
                    <Butt
                      style={{ height: "50%", marginTop: "30px" }}
                      onClick={handleAddItem}
                      variant="secondary"
                    >
                      Add Item
                    </Butt>
                  </div>
                  <div
                    style={{
                      margin: "10px",
                      marginBottom: "20px",
                      padding: "5px",
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                    }}
                  >
                    {details.customItems.map((item) => {
                      return (
                        <div style={{ display: "flex" }}>
                          <pre>
                            {" "}
                            <img
                              alt="PLease wait..."
                              src="https://img.icons8.com/cotton/44/000000/mountain.png"
                            />{" "}
                            {item.name} : ₹{item.price}
                          </pre>
                        </div>
                      );
                    })}
                  </div>

                  <Butt
                    onClick={handleSubmit}
                    style={{ textAlign: "center" }}
                    variant="dark"
                  // type="submit"
                  >
                    Post
                  </Butt>
                </Form>
              </Paper>
            </Backdrop>
          </div>
        ) : (
          <></>
        )}

        <Container style={{ marginTop: "30px" }}>
          <div>
            <Row>
              <h1 className="headingStyle">Past Expeditions</h1>
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "black",
                  height: "1px",
                  width: "100%",
                  marginBottom: "50px",
                }}
              ></div>
              {expDetail.map((exp) => {
                return new Date(exp.endingDate) < new Date() ? (
                  <>
                    <Col
                      lg={12}
                      xl={6}
                      style={{
                        marginBottom: "50px",
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Card
                        onMouseEnter={() => setMouseCard(exp._id)}
                        onMouseLeave={() => setMouseCard(0)}
                        style={
                          exp._id === mouseCard
                            ? {
                              width: "100%",
                              boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            }
                            : {
                              width: "100%",
                              boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                            }
                        }
                        sx={{ maxWidth: 345 }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={exp.imageUrl[0]}
                        />
                        <CardContent>
                          <Typography
                            style={{ fontFamily: "'Goudy Bookletter 1911', serif", textAlign: "center", fontWeight: "600" }}
                            gutterBottom
                            variant="h5"
                            component="div"

                          >
                            {exp.name}
                          </Typography>
                          <Typography style={{ fontFamily: "'Open Sans', sans-serif" }} variant="body2" color="text.secondary">
                            {exp.description.length > 150 ? (
                              <>
                                {exp.description.substring(0, 150) + "..."}
                                {localStorage.getItem("email") !== null ? (
                                  <Button
                                    onClick={() => viewMoreHandler(exp._id)}
                                    size="small"
                                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                                  >
                                    Read More
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              exp.description
                            )}
                          </Typography>
                          <br />
                          <Typography style={{ fontFamily: "'Goudy Bookletter 1911', serif", fontWeight: "700" }} variant="h5" color="text.secondary">
                            Base Price : ₹{exp.basePrice}
                          </Typography>
                          <Typography style={{ fontFamily: "'Goudy Bookletter 1911', serif", fontWeight: "700" }} variant="h6" color="text.secondary">
                            Registration Ended
                          </Typography>
                        </CardContent>
                        {localStorage.getItem("email") !== null ? (
                          <CardActions>
                            <Button
                              onClick={() => viewMoreHandler(exp._id)}
                              size="small"
                            >
                              Learn More
                            </Button>
                          </CardActions>
                        ) : (
                          <></>
                        )}
                      </Card>
                    </Col>
                  </>
                ) : (
                  <></>
                );
              })}
            </Row>
          </div>
          <div>
            <h1 style={{ marginTop: "50px" }} className="headingStyle">
              Upcoming Expeditions
            </h1>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "black",
                height: "1px",
                width: "100%",
                marginBottom: "50px",
              }}
            ></div>
            <Row>
              {expDetail.map((exp) => {
                return new Date(exp.endingDate) < new Date() ? (
                  <></>
                ) : (
                  <Col
                    lg={12}
                    xl={6}
                    style={{
                      marginBottom: "50px",
                      padding: "0px",
                      margin: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      onMouseEnter={() => setMouseCard(exp._id)}
                      onMouseLeave={() => setMouseCard(0)}
                      style={
                        exp._id === mouseCard
                          ? {
                            width: "100%",
                            boxShadow:
                              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                          }
                          : {
                            width: "100%",
                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                          }
                      }
                      sx={{ maxWidth: 345 }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={exp.imageUrl[0]}
                      />
                      <CardContent>
                        <Typography
                          style={{ fontFamily: "'Goudy Bookletter 1911', serif", textAlign: "center", fontWeight: "600" }}
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
                          {exp.name}
                        </Typography>
                        <Typography style={{ fontFamily: "'Open Sans', sans-serif" }} variant="body2" color="text.secondary">
                          {exp.description.length > 150 ? (
                            <>
                              {exp.description.substring(0, 150) + "..."}
                              {localStorage.getItem("email") !== null ? (
                                <Button
                                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                                  onClick={() => viewMoreHandler(exp._id)}
                                  size="small"
                                >
                                  Read More
                                </Button>

                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            exp.description
                          )}
                        </Typography>
                        <br />
                        <Typography style={{ fontFamily: "'Goudy Bookletter 1911', serif", fontWeight: "700" }} variant="h5" color="text.secondary">
                          Base Price : ₹{exp.basePrice}
                        </Typography>
                        <Typography style={{ fontFamily: "'Goudy Bookletter 1911', serif", fontWeight: "700" }} variant="h6" color="text.secondary">
                          Registration ends on :{" "}
                          {exp.endingDate.substring(0, 10)}
                        </Typography>
                      </CardContent>
                      {localStorage.getItem("email") !== null ? (
                        <CardActions>
                          <Button
                            onClick={() => viewMoreHandler(exp._id)}
                            size="small"
                          >
                            Learn More
                          </Button>
                        </CardActions>
                      ) : (
                        <></>
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
