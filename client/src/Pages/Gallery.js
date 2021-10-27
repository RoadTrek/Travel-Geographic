import Image from "../Image/background.jpg";
// import { Card, CardGroup } from "react-bootstrap";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Gallery() {
  return (
    <div>
      {/* <div
        style={{
          backgroundImage: `url(${Image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      ></div> */}

    <Card sx={{ maxWidth: "25%",marginTop:"12%",marginLeft:"20%" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={Image}
      />
      <CardContent sx={{height:"2%"}}>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography  variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>


    <Card sx={{ maxWidth: "25%",marginTop:"-28%",marginLeft:"55%" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={Image}
      />
      <CardContent maxHeight="10px">
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography  variant="body2" color="text.secondary">
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
