import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
const SignUp = (props) => {
  const paperStyle = {
    padding: 20,
    height: "60%",
    width: "26%",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  var [redirect, setRedirect] = useState();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
    contactNumber: "",
  });
  const [contactNumber, setContactNumber] = useState();
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
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('logged', true);
        localStorage.setItem('email', res.data.email);
        props.history.push('/');
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

    setDetails(function (prev) {
      const newVal = {
        ...prev,
        [name]: value,
      };
      return newVal;
    });
  }

  return (
    <div>
      <Grid
        style={{
          paddingBottom: "0px",
          background: "white",
          marginTop: "110px",
          paddingBottom: "",
        }}
      >
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
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
          <PhoneInput
            style={{ marginTop: "25px", marginBottom: "15px" }}
            placeholder="Enter phone number"
            value={contactNumber}
            // name="contactNumber"
            onChange={setContactNumber}
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
