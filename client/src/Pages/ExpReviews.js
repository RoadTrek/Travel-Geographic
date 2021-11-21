import { React, useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import axios from "axios";

const Reviews = (props) => {

    const [rating, setRating] = useState(0);
    const [desc, setDesc] = useState("");

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating);
    };

    const submitReviewHandler = () => {
        props.reviewBackdrop();
        const url = "http://localhost:8080/expedition/submitReview/";
        const data = {
            expId: props.expId,
            name: localStorage.getItem("name"),
            userEmail: localStorage.getItem("email"),
            rating: rating,
            desc: desc
        }
        props.reviewHandler(data);
        axios({
            method: "POST",
            withCredentials: true,
            url: url,
            data: data
        }).then((res) => {
        });
    }

    return (
        <div
            style={{
                minHeight: "400px",
                marginTop: "50px",
                marginBottom: "50px",
                textAlign: "center"
            }}>
            <h2>Add a Review</h2>
            <hr />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "45px" }}>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    value={rating}
                    size={45}
                    activeColor="#ffd700"
                />
            </div>
            <InputGroup style={{ width: "80%", height: "80px", margin: "auto", marginTop: "30px", marginBottom: "30px" }}>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control value={desc} onChange={(event) => setDesc(event.target.value)} as="textarea" aria-label="With textarea" />
            </InputGroup>
            <Button onClick={submitReviewHandler} style={{ padding: "10px", margin: "10px" }} variant="success">Submit Review</Button>
        </div>
    );
}

export default Reviews;