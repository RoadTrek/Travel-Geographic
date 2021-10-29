import React, { useEffect, useState } from "react";
import { Button, Backdrop, CircularProgress, Paper } from '@mui/material'
import { Form, Button as Butt } from 'react-bootstrap'
import axios from "axios";

export default function Expedition() {
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/expedition",
    }).then(async (res) => {
      if (res.data.type === 1) {
        setAdmin(true);
      }
    });
  }, [admin]);

  const openBackdrop = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      {admin ?
        <div>
          Add here
          <Button onClick={openBackdrop}>Show backdrop</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Paper elevation={24} >
              <img style={{ float: "right", margin: "5px" }} onClick={handleClose} src={"https://img.icons8.com/" + "ios" + "/35/000000/cancel.png"} />
              <Form style={{ padding: "40px", fontSize: "30px" }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Butt style = {{textAlign: "center"}} variant="dark" type = "submit">
                  Submit
                </Butt>
              </Form>
            </Paper>
            {/* <CircularProgress color="inherit" /> */}
          </Backdrop>
        </div>
        : <></>}
      Expedition
    </div>
  );
}
