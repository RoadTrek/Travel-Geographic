import React, { useState } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
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
const Login = (props) => {
  const paperStyle = {
    padding: 20,
    height: "60%",
    width: "26%",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const [details, setDetails] = React.useState({
    email: "",
    password: "",
  });

  const[redirect,setRedirect]=useState();
  const handleSubmit = () => {
    console.log("inside login");
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:8080/login",
      data: {
        ...details,
      },
    })
      .then((res) => {
          if(res.status===200){
              console.log(res.data);
              localStorage.setItem('name', res.data.name);
              localStorage.setItem('logged', true);
              localStorage.setItem('email', res.data.email);
              props.history.push('/');
              // setRedirect(1);
          }
          else{
              console.log("wrong details");
          }
        console.log(res.data);
    })
      .catch((err) => {
          console.log(err);
      });
      
  };
  // if(redirect===1){
  //   return <Redirect to="/" />;
  // }
  // if(redirect===0){
  //     //if user enters wrong email or password
  //     return (
  //         <div>
  //            <h1>Enter correct details.</h1> 
  //         </div>
  //     )
  // }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "password") {
      setDetails(function (prev) {
        const newVal = {
          ...prev,
          [name]: value,
        };
        return newVal;
      });
    } else {
      setDetails(function (prev) {
        const newVal = {
          ...prev,
          email: value,
        };
        return newVal;
      });
    }
  }

  return (
    <div>
      <Grid
        style={{
          paddingBottom: "0px",
          background: "white",
          marginTop: "125px",
        }}
      >
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <TextField
            value={details.email}
            name="email"
            onChange={handleChange}
            label="Email"
            placeholder="Enter email"
            type="email"
            fullWidth
            required
          />
          <TextField
            value={details.password}
            name="password"
            onChange={handleChange}
            label="Password"
            placeholder="Enter password"
            style={{ marginTop: "25px" }}
            type="password"
            fullWidth
            required
          />

          <div style={{ marginTop: " 25px" }}>
            <Button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
                setDetails({
                  email: "",
                  password: "",
                });
              }}
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              LogIn
            </Button>
          </div>
          <Typography style={{ marginTop: "10px" }}>
            {" "}
            New User ?<Link href="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
