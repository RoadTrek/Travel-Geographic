import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "react-phone-number-input/style.css";
import axios from "axios";
const SignUp = (props) => {
  const paperStyle = {
    padding: 20,
    height: "60%",
    width: "26%",
    margin: "20px auto",
    zIndex:20
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
    contactNumber: "",
  });
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    console.log("inside signup");
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:8080/signup",
      data: {
        ...details,
      },
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("logged", true);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("contactNumber", res.data.contactNumber);
        props.history.push("/");
        setMessage(res.data.msg);
        console.log("signup details sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setDetails(function(prev) {
      const newVal = {
        ...prev,
        [name]: value,
      };
      return newVal;
    });
  }
  const url = "https://i.ibb.co/R6v9V0W/sign-up-background.jpg";
  return (
    <div>
      <div>
        <img
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "-0",
          }}
          alt=""
          src={url}
        />
      </div>
      <Grid
        style={{
          position:"absolute",
          right:0,
          bottom:0,
          left:0,
          paddingBottom: "0px",
          background: "transparent",
          marginTop: "110px",
          zIndex:20
        }}
      >
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 >Sign Up</h2>
          </Grid>
          <TextField
            name="name"
            value={details.name}
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            label="Email"
            placeholder="Email"
            value={details.email}
            name="email"
            type="email"
            fullWidth
            required
          />
          <TextField
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            value={details.password}
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          />
          <TextField
            type="string"
            style={{ marginTop: "20px", marginBottom: "15px" }}
            placeholder="Enter phone number"
            value={details.contactNumber}
            name="contactNumber"
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
              setDetails({
                email: "",
                password: "",
                name: "",
                contactNumber: "",
              });
            }}
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign up
          </Button>
          <Typography style={{ marginTop: "10px" }}>
            {" "}
            Already have an account ?<Link href="/login">Log in</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignUp;
