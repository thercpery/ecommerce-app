import { useState, useEffect, useContext } from 'react'
import { Container, Button, Table, Form, Row, Col } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Cart = () => {

    const {user} = useContext(UserContext);
    const [cartItems, setCartItems] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [isCartEmpty, setIsCartEmpty] = useState();
    const history = useHistory();

    const increment = (productId) => {
        fetch(`https://ancient-temple-55465.herokuapp.com/api/users/cart/${productId}/increment`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => data);
    };
    const decrement = (productId) => {
        fetch(`https://ancient-temple-55465.herokuapp.com/api/users/cart/${productId}/decrement`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => data);
    };

    const removeCartItem = (productId) => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/users/cart/remove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productId: productId
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: "Item Removed In Cart!",
                icon: "success",
                text: "You have successfully removed an item in the cart."
            });
        });
    };

    const checkoutFromCart = () => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/orders/checkoutcart", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
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
        fetch("https://ancient-temple-55465.herokuapp.com/api/users/cart", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsCartEmpty((data.products.length === 0) ? true : false);
            setTotalAmount(data.totalAmount);
            setCartItems(data.products.map(product => {
                return(
                    <tr key={product.productId}>
                        <td>{product.name}</td>
                        <td>&#8369; {product.price}</td>
                        <td>
                            <Row>
                                <Col>
                                    <Button onClick={(e) => decrement(product.productId)}>-</Button>
                                </Col>
                                <Col>
                                    <Form.Control 
                                        disabled
                                        type="number"
                                        value={product.quantity}
                                    />
                                </Col>
                                <Col>
                                    <Button onClick={(e) => increment(product.productId)}>+</Button>
                                </Col>
                            </Row>
                            
                        </td>
                        <td>&#8369; {product.price * product.quantity}</td>
                        <td><Button variant="danger" onClick={(e) => removeCartItem(product.productId)}>Remove</Button></td>
                    </tr>
                )
            }));
        });
    }, [cartItems]);
    return (
        ((user.id !== null) || (localStorage.getItem("token") !== null))
        ?
            (!user.isAdmin)
            ?
            <Container className="text-center">
                <h1 className="mt-3">Cart</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price Per Unit</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems}
                        {
                            (!isCartEmpty)
                            ?
                            <tr>
                                <td colSpan={3}>TOTAL PRICE</td>
                                <td>&#8369; {totalAmount}</td>
                                <td><Button variant="success" onClick={checkoutFromCart}>Checkout</Button></td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={5}>THERE ARE NO ITEMS IN YOUR CART.</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Container>
            :
            <Redirect to="/admin" />
        :
        <Redirect to="/login" />
    )
}

export default Cart;
