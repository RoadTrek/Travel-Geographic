import React from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  toast.configure();
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
        console.log(res.data);
        if (res.status === 200) {
          toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem("name", res.data.detail.name);
          localStorage.setItem("logged", true);
          localStorage.setItem("email", res.data.detail.email);
          props.history.push("/");
        } else {
          toast.error(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "password") {
      setDetails(function(prev) {
        const newVal = {
          ...prev,
          [name]: value,
        };
        return newVal;
      });
    } else {
      setDetails(function(prev) {
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
      <div>
        <img
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "-0",
            marginTop: "30px",
          }}
          alt=""
          src="https://i.ibb.co/pbYcZSG/login-background.jpg"
        />
      </div>
      <Grid
        style={{
          position: "relative",
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 20,
          paddingBottom: "0px",
          marginTop: "120px",
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
