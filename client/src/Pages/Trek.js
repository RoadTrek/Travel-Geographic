import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Backdrop,
  Paper,
} from "@mui/material";
import { Image } from "cloudinary-react";
import { Form, Button as Butt } from "react-bootstrap";
import axios from "axios";

export default function Trek() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const data = [];
  const[renderImageUrl,setRenderImageUrl]=useState([])
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/trek/getTrek",
    }).then((res) => {
      console.log(res.data);
      // setData(res.data.image);
      res.data.image.forEach(function (url) {
        data.push(url.imageUrl[0]);
      });
      console.log(data);
      setRenderImageUrl(data);
      console.log(renderImageUrl);
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

  const openBackdrop = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [imageSelected, setImageSelected] = React.useState("");
  // const [data,setData]=React.useState([{
  //   _id: "",
  //   name:"",
  //   imageUrl: "",
  //   registeredMembers:""
  // }]);

  const uploadImage = () => {
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
      .then((res) => {
        const imageUrl = res.data;
        console.log(imageUrl);
        setDetails(function (prev) {
          const newVal = {
            ...prev,
            imageUrl: imageUrl,
          };
          return newVal;
        });
        console.log(imageUrl);
      });
  };
  const handleSubmit = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:8080/trek/uploadTrek",
      data: details,
    }).then((respond) => {
      console.log("Data sent successfully" + respond.data);
    });
    setOpen(false);
  };
  console.log("Hello",data);
  return (
    <div style={{ backgroundColor: "black" }}>
      {localStorage.getItem("email") === "tg.official.1001@gmail.com" ? (
        <div>
          <Card
            sx={{
              paddingTop: "50px",
              paddingBottom: "50px",
              maxWidth: "10%",
              marginTop: "8%",
              marginLeft: "20%",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                <Button onClick={openBackdrop}>
                  Add Here<i class="fas fa-plus"></i>
                </Button>
              </Typography>
            </CardContent>
          </Card>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Paper elevation={24}>
              <img
                style={{ float: "right", margin: "5px" }}
                onClick={handleClose}
                src={
                  "https://img.icons8.com/" + "ios" + "/35/000000/cancel.png"
                }
              />
              <Form style={{ padding: "40px", fontSize: "30px" }}>
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
                    name="description"
                    value={details.description}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                  />
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

                  <Button onClick={uploadImage}>Upload Image</Button>
                </Form.Group>
                <Butt
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                    setDetails({
                      name: "",
                      description: "",
                    });
                  }}
                  style={{ textAlign: "center" }}
                  variant="dark"
                  type="submit"
                >
                  Post
                </Butt>
              </Form>
            </Paper>
          </Backdrop>
          
      {console.log(data)}
        </div>
      ) : (
        <></>
      )}
      {renderImageUrl.map(function (image) {
        return (
          <Card sx={{ maxWidth: "50%", marginTop: "28%", marginLeft: "5%" }}>
            <CardMedia sx={{ maxHeight: "10%" }}>
              <Image
                cloudName={process.env.REACT_APP_cloudName}
                publicId={image}
              ></Image>
            </CardMedia>
            <CardContent maxHeight="10px">
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
