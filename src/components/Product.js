import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Product = () => {

    const { user } = useContext(UserContext);
    const history = useHistory();

    const { productId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

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
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>&#8369; {price}</Card.Text>
                            {
                                ((user.id !== null) || (localStorage.getItem("token") !== null))
                                ?
                                <Button className="cartBtn">Add to Cart</Button>
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
