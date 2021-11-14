import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, Container, Row, Col, Image } from 'react-bootstrap';

const IndExp = (params) => {

    const [details, setDetails] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/expedition/" + params.match.params.id,
        }).then((res) => {
            setDetails(res.data);
        });
    }, []);

    console.log(details);

    return (
        <>
            <Container>
                <Row>
                    <Col md={0} lg={1}></Col>
                    <Col sm={12} md={12} lg={10}>
                        <Carousel variant="dark">
                            {localStorage.getItem('email') === "tg.official.1001@gmail.com" ?
                                <Carousel.Item>
                                    <img
                                        fluid
                                        style={{ height: "500px" }}
                                        className="d-block w-100"
                                        src="https://img.icons8.com/cute-clipart/64/000000/add-image.png%22/%3E"
                                    />
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                : null}
                            {details ? details.imageUrl.map((img) => {
                                return (
                                    <Carousel.Item>
                                        <Image
                                            fluid
                                            style={{ height: "500px" }}
                                            className="d-block w-100"
                                            src={img}
                                        />
                                        <Carousel.Caption>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                );
                            }) : null}
                        </Carousel>
                    </Col>
                    <Col md={0} lg={1}></Col>
                </Row>
            </Container>
        </>
    );
}

export default IndExp;