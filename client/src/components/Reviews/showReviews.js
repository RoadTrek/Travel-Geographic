import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const ShowReviews = (props) => {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/expedition/showReviews/" + props.expId,
        }).then((res) => {
            console.log(res.data);
            setDetails(res.data);
        });
    }, []);
    if (props.newReview) {
        const detailsLen = details.length;
        if (details && details[detailsLen - 1] !== props.newReview) {
            details.push(props.newReview);
        }
    }
    return (
        <div style={{ textAlign: "left" }}>
            <h3>Reviews</h3>
            {details ?
                details.map((review) => {
                    return (
                        <Card style={{ margin: "20px auto", width: "80%" }}>
                            <Card.Header>
                                <ReactStars
                                    edit={false}
                                    count={5}
                                    value={review.rating}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                            </Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {review.desc}
                                    </p>
                                    <footer className="blockquote-footer">
                                        By <cite title="Source Title">{review.name}</cite>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    );
                })
                : <p>FFF</p>}
        </div>
    );
}

export default ShowReviews;