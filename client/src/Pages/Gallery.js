import * as React from "react";
import { Form, Card, Image, Row, Col, Container } from "react-bootstrap";
import { Button, Typography, Backdrop, Grid, Paper } from "@mui/material";
import axios from "axios";

export default function Gallery() {
  const [imageName, setImageName] = React.useState("");
  const [imageSelected, setImageSelected] = React.useState("");
  const [showBackdrop, setShowBackdrop] = React.useState(false)
  const [backdropImage, setBackdropImage] = React.useState("");
  const [imageBackdrop, setImageBackdrop] = React.useState("");

  const [details, setDetails] = React.useState([{
    name: "",
    _id: "",
    imageUrl: ""
  }]);

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
            name: imageName
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
    carouselImage.push(
      {
        image: obj.imageUrl,
        caption: "caption"
      }
    )
  })

  const toggleBackdrop = (imageUrl) => {
    setBackdropImage(imageUrl);
    setShowBackdrop(true);
  }

  return (
    <div>
      {localStorage.getItem('email') === "tg.official.1001@gmail.com" ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img onClick={() => setImageBackdrop(true)} style={{ width: "200px" }} src="https://i.ibb.co/v4wxH68/add-button.gif" />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={imageBackdrop}
          >
            <Paper elevation={24} >
              <img style={{ float: "right", margin: "5px" }} onClick={() => setImageBackdrop(false)} src={"https://img.icons8.com/" + "ios" + "/35/000000/cancel.png"} />
              <Form style={{ padding: "40px", textAlign: "center" }}>
                <Form.Group style = {{textAlign: "left"}} className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={imageName} onChange={(event) => setImageName(event.target.value)} placeholder="e.g: Shimla to Spiti" />
                </Form.Group>
                <input
                  type="file"
                  onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                  }}
                />
                <hr />
                <Button style = {{fontSize: "1.2rem"}} onClick={uploadImage}>Upload</Button>
              </Form>
            </Paper>
          </Backdrop>
        </div>
      ) : (<></>)}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
        onClick={() => setShowBackdrop(false)}
      >
        <span >
          <img style={{ height: "500px" }} src={backdropImage} />
        </span>
      </Backdrop>
      <Container style={{ marginTop: "30px" }}>
        <Row>
          {details.map(function (image) {
            return (
              <Col lg={12} xl={6} style={{ marginBottom: "20px" }}>
                <Card onClick={() => toggleBackdrop(image.imageUrl)} style={{ display: "inline-block", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }} className="bg-dark text-white">
                  <Card.Img style={{ width: "500px", height: "300px" }} src={image.imageUrl} alt="Card image" />
                  <Card.ImgOverlay>
                    <Card.Title style={{ fontSize: "2rem", color: "black", padding: "5px", backgroundColor: "white", textAlign: "center", opacity: "0.5" }}>{image.name}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}
