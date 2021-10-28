// import Image from "../Image/background.jpg";
import { Image } from "cloudinary-react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Gallery() {
  const [imageSelected, setImageSelected] = React.useState("");
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", process.env.REACT_APP_uploadPreset);

    axios
      .post("https://api.cloudinary.com/v1_1/" + process.env.REACT_APP_cloudName + "/image/upload", formData)
      .then((res) => {
        const imageUrl=res.data;
        console.log(imageUrl);
        axios({
          method:"POST",
          withCredentials:true,
          url:"http://localhost:8080/gallery",
          data:imageUrl
        }).then((respond)=>{
          console.log("Data sent successfully"+respond.data)
        })
      });
  };
  return (
    <div>
      <Card sx={{ maxWidth: "25%", marginTop: "12%", marginLeft: "20%" }}>
        <CardContent sx={{ height: "2%" }}>
          <Typography gutterBottom variant="h5" component="div">
            Add
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <input
              type="file"
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
              }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={uploadImage}>Upload Image</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: "25%", marginTop: "-28%", marginLeft: "55%" }}>
        <CardMedia >
          <Image
            style={{ maxHeight: "20" }}
            cloudName={process.env.REACT_APP_cloudName}
            publicId={"https://res.cloudinary.com/" + process.env.REACT_APP_cloudName + "/image/upload/v1635345109/spcobt4iikt6ahxlj5x9.jpg"}
          ></Image>
        </CardMedia>
        <CardContent maxHeight="10px">
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}