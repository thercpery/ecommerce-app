import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, useHistory, Link, Redirect } from "react-router-dom";
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
    const [isActive, setIsActive] = useState();

    const increment = () => setQuantity(quantity++);
    const decrement = () => {
        if(quantity > 1){
            setQuantity(quantity--);
        }
        else{
            setQuantity(1);
        }
    };

    function addToCart(){
        fetch("https://ancient-temple-55465.herokuapp.com/api/users/addToCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: "Item Added To Cart!",
                icon: "success",
                text: "The item is added to your cart."
            });
        });
    }

    function buyNow(){
        fetch("https://ancient-temple-55465.herokuapp.com/api/orders/buynow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: "Order Successful!",
                icon: "success",
                text: "You can now see your order."
            });
            history.push("/myorders");
        });
    }

    useEffect(() => {
        fetch(`https://ancient-temple-55465.herokuapp.com/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setIsActive(data.isActive);
        });
    }, [productId]);

    return (
        (!user.isAdmin)
        ?
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <img src="https://place-puppy.com/300x300" alt="Placeholder image" />
                </Col>
                <Col md={6}>
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
                                (isActive)
                                ?
                                    ((user.id !== null) || (localStorage.getItem("token") !== null))
                                    ?
                                    <Fragment>
                                        <Row>
                                            <Col>
                                                <Button className="cartBtn" onClick={addToCart}>Add to Cart</Button>
                                            </Col>
                                            <Col>
                                                <Button className="cartBtn" onClick={buyNow}>Buy Now</Button>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                    :
                                    <Button variant="danger" as={Link} to="/login">Log In to Order</Button>
                                :
                                    <Fragment>
                                        <p>This item is out of stock.</p>
                                    </Fragment>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        :
        <Redirect to="/admin"/>
    )
}

export default Product;
