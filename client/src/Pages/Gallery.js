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
  const data = [""];

  const [details, setDetails] = React.useState([{
    _id: "",
    imageUrl: ""
  }]);
  // const [boolean, setBoolean] = React.useState(false);
  const formData = new FormData();
  const tempStorage = [];
  const uploadImage = () => {
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
        axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:8080/gallery",
          data: imageUrl,
        }).then((respond) => {
          console.log("Data sent successfully" + respond.data);
        });
      });
  };
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/image",
    }).then(async (res) => {
      setDetails(res.data.image);
    });
  }, []);
  return (
    <div>
      { localStorage.getItem('email') === "tg.official.1001@gmail.com" ? (<Card sx={{ maxWidth: "25%", marginTop: "12%", marginLeft: "20%" }}>
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
      </Card>) : (<></>)}

      {details.map(function (image) {
        return (
          <Card sx={{ maxWidth: "50%", marginTop: "28%", marginLeft: "5%" }}>
            <CardMedia sx={{ maxHeight: "10%" }} >
              <Image
                cloudName={process.env.REACT_APP_cloudName}
                publicId={image.imageUrl}
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
        )
      })}

    </div>
  );
}
