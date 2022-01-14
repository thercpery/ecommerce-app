import { useState, useEffect, useContext } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import UserContext from '../UserContext';

const AdminOrders = () => {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState();
    useEffect(() => {
        if(user.isAdmin){
            fetch("https://ancient-temple-55465.herokuapp.com/api/orders/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setOrders(data.map(order => {
                    return(
                        <Card key={order._id}>
                            <Card.Header>Order number {order._id}</Card.Header>
                            <Card.Body>
                                <p>Items:</p>
                                <ul>
                                    {
                                        order.products.map(product => {
                                            return (<li key={product._id}>{product.name} - &#8369; {product.price}</li>)
                                        })
                                    }
                                </ul>
                                <p>Total Amount: &#8369; {order.totalAmount}</p>
                            </Card.Body>
                        </Card>
                    )
                }));
            });
        }
    }, [user, orders]);
    return (
        <Container className="text-center">
            <h1 className="mt-3">All User Orders</h1>
            {orders}
        </Container>
    )
}

export default AdminOrders;
