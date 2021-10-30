import React, { useEffect, useState } from "react";
import { Card,CardActions,CardContent,Typography,Button, Backdrop, Paper } from '@mui/material'
import { Form, Button as Butt } from 'react-bootstrap'
import axios from "axios";


export default function Expedition() {
  const [open, setOpen] = useState(false);
  const [details,setDetails]=useState({
    name:"",
    description:"",
    imageUrl:""
  })

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
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleSubmit=()=>{

  }
  return (
    <div style={{backgroundColor:"black"}}>
      {localStorage.getItem('email') === "tg.official.1001@gmail.com" ?
        <div>
        <Card sx={{ paddingTop: "50px",paddingBottom:"50px",maxWidth: "10%", marginTop: "8%", marginLeft: "20%" }}>
        <CardContent >
          <Typography gutterBottom variant="h6" component="div">
          <Button onClick={openBackdrop}>Add Here<i class="fas fa-plus"></i></Button>
          </Typography>
        </CardContent>
      </Card>
          
          
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Paper elevation={24} >
              <img style={{ float: "right", margin: "5px" }} onClick={handleClose} src={"https://img.icons8.com/" + "ios" + "/35/000000/cancel.png"} />
              <Form style={{ padding: "40px", fontSize: "30px" }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value = {details.name} onChange={handleChange} placeholder="e.g: Shimla to Spiti" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Add Description</Form.Label>
                  <Form.Control name="description" value = {details.description} onChange={handleChange} as="textarea" rows={3} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Add Picture</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Butt onClick={handleSubmit} style = {{textAlign: "center"}} variant="dark" type = "submit">
                  Post
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
