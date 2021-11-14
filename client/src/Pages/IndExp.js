import { React, useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";
import "./IndExp.css";

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

const IndExp = (params) => {
    const [details, setDetails] = useState();
    const [checkArray, setCheckArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/expedition/" + params.match.params.id,
        }).then((res) => {
            setDetails(res.data);
            const temp = [];
            for (let i = 1; i <= res.data.customItems.length; i++) {
                temp.push(false);
            }
            console.log(temp.length);
            setCheckArray(temp);
            setTotalPrice(Number(res.data.basePrice));
        });
    }, []);
    
    const priceHandler = (index) => {
        const temp = [...checkArray];
        console.log(temp.length);
        let tempPrice = 0;
        tempPrice = totalPrice;
        console.log(temp[index]);
        if (temp[index] === false) {
            temp[index] = true;
            tempPrice += Number(details.customItems[index].price);
            setTotalPrice(tempPrice);
        } else {
            temp[index] = false;
            tempPrice -= Number(details.customItems[index].price);
            setTotalPrice(tempPrice);
        }
        setCheckArray(temp);
    };
    return (
        <>
            <Container>
                <Row>
                    <Col md={0} lg={1}></Col>
                    <Col sm={12} md={12} lg={10}>
                        <Carousel variant="dark">
                            {localStorage.getItem("email") ===
                                "tg.official.1001@gmail.com" ? (
                                <Carousel.Item>
                                    <img
                                        fluid
                                        style={{ height: "500px" }}
                                        className="d-block w-100"
                                        alt="Please Wait..."
                                        src="https://img.icons8.com/cute-clipart/64/000000/add-image.png%22/%3E"
                                    />
                                    <Carousel.Caption></Carousel.Caption>
                                </Carousel.Item>
                            ) : null}
                            {details
                                ? details.imageUrl.map((img) => {
                                    return (
                                        <Carousel.Item>
                                            <Image
                                                fluid
                                                style={{ height: "500px" }}
                                                className="d-block w-100"
                                                src={img}
                                            />
                                            <Carousel.Caption></Carousel.Caption>
                                        </Carousel.Item>
                                    );
                                })
                                : null}
                        </Carousel>
                    </Col>
                    <Col md={0} lg={1}></Col>
                </Row>
            </Container>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                    <p>About</p>
                    {details ? details.description : null}
                    <br />
                    <p>BasePrice</p>
                    {details ? details.basePrice : null}
                </h1>
            </div>
            <h3>Customizable</h3>
            <ul className="toppings-list">
                {details
                    ? details.customItems.map((currentItem, index) => {
                        return (
                            <div>
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={currentItem.name}
                                                value="1"
                                                onClick={() => priceHandler(index)}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`}>
                                                {currentItem.name}
                                            </label>
                                        </div>
                                        <div className="right-section">
                                            <label htmlFor={`custom-checkbox-${index}`}>
                                                {currentItem.price}
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        );
                    })
                    : null}
                <li>
                    <div className="toppings-list-item">
                        <div className="left-section">Total:</div>
                        <div className="right-section">{totalPrice}</div>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default IndExp;
