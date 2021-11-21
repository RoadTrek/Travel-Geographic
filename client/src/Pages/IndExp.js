import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Carousel,
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { Paper, Backdrop } from "@mui/material";
import "./IndExp.css";
import AdminApproval from "./AdminApproval";
import ExpReviews from "./ExpReviews";
import showReviews from "../components/Reviews/showReviews";
import ShowReviews from "../components/Reviews/showReviews";

const IndExp = (params) => {
  const [details, setDetails] = useState();
  const [checkArray, setCheckArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [imageBackdrop, setImageBackdrop] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [requestBackdrop, setRequestBackdrop] = useState(false);
  const [reviewBackdrop, setReviewBackdrop] = useState(false);

  const expRequest = (props) => {
    const tempSelectedItems = [];
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] === true) {
        console.log("here");
        tempSelectedItems.push({
          name: details.customItems[i].name,
          price: details.customItems[i].price,
        });
      }
    }

    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:8080/expedition/requestAdminExp",
      data: {
        expId: details._id,
        userEmail: localStorage.getItem("email"),
        reqStatus: false,
        customItemsSelected: tempSelectedItems,
        name: details.name,
      },
    }).then((res) => {
      console.log(details);
      props.onHide();
      axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:8080/expedition/registerUser",
        data: {
          expId: details._id,
          approveId: res.data._id,
          userEmail: localStorage.getItem("email"),
        },
      });
    });
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Final Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Your total cost is : {totalPrice}</h4>
          <p>Are you surely want to register</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={() => expRequest(props)}>Register</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  useEffect(() => {
    console.log("in use effect");
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/expedition/" + params.match.params.id,
    }).then((res) => {
      setDetails(res.data);
      const temp = [];
      for (let i = 1; i <= res.data.customItems.length; i++) {
        temp.push(false);
      }
      console.log(temp.length);
      setCheckArray(temp);
      setTotalPrice(Number(res.data.basePrice));
    });
  }, []);

  const priceHandler = (index) => {
    const temp = [...checkArray];
    let tempPrice = 0;
    tempPrice = totalPrice;
    if (temp[index] === false) {
      temp[index] = true;
      tempPrice += Number(details.customItems[index].price);
      setTotalPrice(tempPrice);
    } else {
      temp[index] = false;
      tempPrice -= Number(details.customItems[index].price);
      setTotalPrice(tempPrice);
    }
    setCheckArray(temp);
  };

  const uploadImage = () => {
    setImageBackdrop(false);

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
        const imageUrl = res.data.secure_url;
        const tempImageUrl = [...details.imageUrl];
        tempImageUrl.push(imageUrl);
        axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:8080/expedition/uploadExpImage",
          data: {
            ...details,
            imageUrl: tempImageUrl,
          },
        }).then((respond) => {
          console.log("Data sent successfully" + respond.data);
        });
        window.location.reload();
      });
  };

  const reviewBackdropHandler = () => {
    setReviewBackdrop(false);
  }
  const [newReview, setNewReview] = useState();
  const newReviewHandler = (review) => {
    setNewReview(review);
  }

  return (
    <div style={{ paddingBottom: "50px", overflowX: "hidden" }}>
      <Container>
        <Row>
          <Col md={0} lg={1}></Col>
          <Col sm={12} md={12} lg={10}>
            <Carousel variant="dark">
              {localStorage.getItem("email") ===
                "tg.official.1001@gmail.com" ? (
                <Carousel.Item>
                  <img
                    onClick={() => setImageBackdrop(true)}
                    fluid
                    style={{ height: "500px" }}
                    className="d-block w-100"
                    alt="Please Wait..."
                    src="https://i.ibb.co/bRHY8Ld/add-icon.jpg"
                  />
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={imageBackdrop}
                  >
                    <Paper elevation={24}>
                      <img
                        style={{ float: "right", margin: "5px" }}
                        onClick={() => setImageBackdrop(false)}
                        alt="Please Wait..."
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
                </Carousel.Item>
              ) : null}
              {details
                ? details.imageUrl.map((img) => {
                  return (
                    <Carousel.Item>
                      <Image
                        fluid
                        style={{ height: "500px" }}
                        className="d-block w-100"
                        src={img}
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  );
                })
                : null}
            </Carousel>
          </Col>
          <Col md={0} lg={1}></Col>
        </Row>
      </Container>
      <hr />
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col lg={7} style={{ textAlign: "center", padding: "10px", margin: "10px", boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>
              <p>About</p>
              {details ? details.description : null}
              <br />
              <p>BasePrice</p>
              {details ? details.basePrice : null}
            </h1>
          </div>
          <h3>Customizable</h3>
          <ul className="toppings-list">
            {details
              ? details.customItems.map((currentItem, index) => {
                return (
                  <div>
                    <li key={index}>
                      <div className="toppings-list-item">
                        <div className="left-section">
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={currentItem.name}
                            value="1"
                            onClick={() => priceHandler(index)}
                          />
                          <label htmlFor={`custom-checkbox-${index}`}>
                            {currentItem.name}
                          </label>
                        </div>
                        <div className="right-section">
                          <label htmlFor={`custom-checkbox-${index}`}>
                            {currentItem.price}
                          </label>
                        </div>
                      </div>
                    </li>
                  </div>
                );
              })
              : null}
            <li>
              <div className="toppings-list-item">
                <div className="left-section">Total:</div>
                <div className="right-section">{totalPrice}</div>
              </div>
            </li>
          </ul>
          {localStorage.getItem("email") !== "tg.official.1001@gmail.com" ? (
            <Button onClick={() => setModalShow(true)}>Register</Button>
          ) : (
            <>
              <Button onClick={() => setRequestBackdrop(true)}>
                Pending Requests
              </Button>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={requestBackdrop}
              >
                <Paper elevation={24} style={{ width: "55%" }}>
                  <img
                    style={{ float: "right", margin: "5px" }}
                    onClick={() => setRequestBackdrop(false)}
                    alt="Please Wait..."
                    src={
                      "https://img.icons8.com/" + "ios" + "/35/000000/cancel.png"
                    }
                  />
                  <AdminApproval expId={params.match.params.id} />
                </Paper>
              </Backdrop>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={reviewBackdrop}
              >
                <Paper elevation={24} style={{ width: "55%" }}>
                  <img
                    style={{ float: "right", margin: "5px" }}
                    onClick={() => setReviewBackdrop(false)}
                    alt="Please Wait..."
                    src={
                      "https://img.icons8.com/" + "ios" + "/35/000000/cancel.png"
                    }
                  />
                  <ExpReviews reviewHandler = {newReviewHandler} reviewBackdrop={() => reviewBackdropHandler()} expId={params.match.params.id} />
                </Paper>
              </Backdrop>
            </>
          )}

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Col>
        <Col lg={4} style={{ textAlign: "center", padding: "10px", margin: "10px", boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}>
          <ShowReviews newReview = {newReview} expId={params.match.params.id} />
          <Button onClick={() => setReviewBackdrop(true)}>
            Add Review
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default IndExp;
