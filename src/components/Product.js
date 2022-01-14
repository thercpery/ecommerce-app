import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Product = () => {

    const { user } = useContext(UserContext);
    const history = useHistory();
    let [quantity, setQuantity] = useState(1);

    const { productId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const increment = () => setQuantity(quantity++);
    const decrement = () => {
        if(quantity < 1){
            setQuantity(quantity--);
        }
        else{
            setQuantity(1);
        }
    };


    useEffect(() => {
        fetch(`https://ancient-temple-55465.herokuapp.com/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
        });
    }, [productId]);

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span:6, offset:3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>
                                <h1>{name}</h1>
                            </Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Quantity:</Card.Subtitle>
                            <Row className="mt-2 mb-2">
                                <Col>
                                    <Button className="btn-block" onClick={decrement}>-</Button>
                                </Col>
                                <Col>
                                    <Form.Control 
                                        type="number"
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        disabled
                                        />
                                </Col>
                                <Col>
                                    <Button className="btn-block" onClick={increment}>+</Button>
                                </Col>
                            </Row>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>&#8369; {price * quantity}</Card.Text>
                            {
                                ((user.id !== null) || (localStorage.getItem("token") !== null))
                                ?
                                <Fragment>
                                    <Row>
                                        <Col>
                                            <Button className="cartBtn">Add to Cart</Button>
                                        </Col>
                                        <Col>
                                            <Button className="cartBtn">Buy Now</Button>
                                        </Col>
                                    </Row>
                                </Fragment>
                                :
                                <Button variant="danger" as={Link} to="/login">Log In to Order</Button>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Product;
