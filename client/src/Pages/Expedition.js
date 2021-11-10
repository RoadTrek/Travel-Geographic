import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Backdrop,
  Paper,
} from "@mui/material";
import { Form, Button as Butt } from "react-bootstrap";
import axios from "axios";

export default function Expedition() {
  const [open, setOpen] = useState(false);
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
  const [imageSelected, setImageSelected] = useState("");

  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/expedition/getExpedition",
    }).then(async (res) => {
      // res.data.image.reverse();
      // setDetails(res.data.image);
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

  const openBackdrop = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            imageUrl: newImageUrl
          },
        }).then((res) => {
          window.location.reload();
          console.log("Data Sent", res);
        });
      })

  };
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
            <Paper
              style={{
                maxHeight: "700px",
                "overflow-y": "scroll",
              }}
              elevation={24}
            >
              <img
                style={{ float: "right", margin: "5px" }}
                onClick={handleClose}
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
                  {/* <Form.Control
                    type="file"
                    onChange={(event) => {
                      setImageSelected(event.target.files[0]);
                    }}
                  /> */}
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
      Expedition
    </div>
  );
}
