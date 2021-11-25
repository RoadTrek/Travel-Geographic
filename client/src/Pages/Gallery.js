import * as React from "react";
import {
  Form,
  Card,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Button, Backdrop,Paper } from "@mui/material";
import axios from "axios";
import sachin from "../Image/sachin2021.mp4";
import "./Home.css";
export default function Gallery() {
  const [imageName, setImageName] = React.useState("");
  const [imageSelected, setImageSelected] = React.useState("");
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const [backdropImage, setBackdropImage] = React.useState("");
  const [imageBackdrop, setImageBackdrop] = React.useState("");

  const [details, setDetails] = React.useState([
    {
      name: "",
      _id: "",
      imageUrl: "",
    },
  ]);

  // const [boolean, setBoolean] = React.useState(false);
  const formData = new FormData();
  const uploadImage = () => {
    formData.append("file", imageSelected);
    formData.append("upload_preset", process.env.REACT_APP_uploadPreset);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/" +
          process.env.REACT_APP_cloudName +
          "/image/upload",
        formData
      )
      .then((res) => {
        const imageUrl = res.data;
        console.log(imageUrl);
        axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:8080/gallery/uploadImage",
          data: {
            url: imageUrl,
            name: imageName,
          },
        }).then((respond) => {
          console.log("Data sent successfully" + respond.data);
        });
        window.location.reload();
      });
  };
  const carouselImage = [];
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/gallery/getImage",
    }).then(async (res) => {
      res.data.image.reverse();
      setDetails(res.data.image);
    });
  }, []);
  details.map((obj) => {
    carouselImage.push({
      image: obj.imageUrl,
      caption: "caption",
    });
  });

  const toggleBackdrop = (imageUrl) => {
    setBackdropImage(imageUrl);
    setShowBackdrop(true);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ marginTop: "530px" }}>
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              opacity: "0.9",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "80%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: -0,
            }}
          >
            <source src={sachin} type="video/mp4" />
          </video>
        </div>
        <div id="text_div center_all">
          <div className="center_all">
            <h1
              style={{
                zIndex: 20,
                fontSize: "50px",
                fontWeight: "700",
                color: "white",
                fontFamily: "'Montserrat',sans-serif",
              }}
              className="custom-subTitle"
            >
              Gallery
            </h1>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          top: "50%",
          height: "25vh",
          backgroundColor: "#f7f7f7",
        }}
      >
        <h3
          style={{
            color: "#070707",
            fontFamily: "'Comforter Brush', cursive",
            textShadow: " 0px 0px 10px rgb(0 0 0 / 30%)",
            fontSize: "40px",
            fontWeight: "700",
            margin: "0",
            position: "relative",
            top: "35%",
          }}
        >
          Explore the Unexplored
        </h3>
        <div
          style={{
            top: "40%",
            position: "relative",
            marginBottom: "15px",
            borderRadius: "100px",
            marginLeft: "540px",
            width: "200px",
            height: "5px",
            backgroundColor: "#fb2056",
          }}
        ></div>
      </div>
      <div>
        <Container style={{ marginTop: "50px", marginLeft: "160px" }}>
          <Row>
            <Col lg={12} xl={6} style={{ marginBottom: "20px" }}>
              {localStorage.getItem("email") ===
              "tg.official.1001@gmail.com" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "500px",
                      height: "300px",
                      marginRight: "150px",
                      border: "3px solid black",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Button>
                      <Card.Img
                        style={{ zIndex: "0", width: "350px", height: "280px" }}
                        onClick={() => setImageBackdrop(true)}
                        src="https://i.ibb.co/v4wxH68/add-button.gif"
                        alt="Card"
                      ></Card.Img>
                    </Button>
                  </Card>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={imageBackdrop}
                  >
                    <Paper elevation={24}>
                      <img
                        alt=""
                        style={{ float: "right", margin: "5px" }}
                        onClick={() => setImageBackdrop(false)}
                        src={
                          "https://img.icons8.com/" +
                          "ios" +
                          "/35/000000/cancel.png"
                        }
                      />
                      <Form style={{ padding: "40px", textAlign: "center" }}>
                        <Form.Group
                          style={{ textAlign: "left" }}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            name="name"
                            value={imageName}
                            onChange={(event) =>
                              setImageName(event.target.value)
                            }
                            placeholder="e.g: Shimla to Spiti"
                          />
                        </Form.Group>
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
                </div>
              ) : (
                <></>
              )}
            </Col>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showBackdrop}
              onClick={() => setShowBackdrop(false)}
            >
              <span>
                <img alt="" style={{ height: "500px" }} src={backdropImage} />
              </span>
            </Backdrop>
            {details.map(function(image) {
              return (
                <Col lg={12} xl={6} style={{ marginBottom: "20px" }}>
                  <Card
                    onClick={() => toggleBackdrop(image.imageUrl)}
                    style={{
                      borderRadius: "10px",
                      // border: "2px solid black",
                      display: "inline-block",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    className="bg-dark text-white"
                  >
                    <Card.Img
                      style={{
                        width: "500px",
                        height: "300px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 5px 8px 5px",
                      }}
                      src={image.imageUrl}
                      alt="Card image"
                    />
                    <Card.Body
                      style={{
                        border: "null",
                        justifyContent: "center",
                        display: "flex",
                        backgroundColor: "white",
                      }}
                    >
                      <Card.Title
                        style={{
                          fontWeight: "700",
                          fontFamily: "'Comforter Brush', cursive",
                          color: "black",
                        }}
                      >
                        {image.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "black",
          width: "100%",
          height: "100px",
        }}
      >
        <span
          style={{
            fontWeight: "400",
            fontSize: "15px",
            color: "white",
            margin: "0",
            position: "relative",
            top: "40%",
          }}
        >
          Copyright ©2021 TravelGeographic
        </span>
      </div>
    </div>
  );
}
