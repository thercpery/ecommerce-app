import { useState, useEffect, useContext } from 'react';
import { Container, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserContext from "../UserContext";

const MyOrders = () => {

    const [orders, setOrders] = useState();
    useEffect(() => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/orders/myorders",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setOrders(data.map(order => {
                let orderDate = new Date(order.purchasedOn).toLocaleDateString()
                return(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                            <ul>
                                {
                                    order.products.map(product => {
                                        return(
                                            <li key={product._id}>{product.name} - &#8369; {product.price}</li>
                                        )
                                    })
                                }
                            </ul>
                        </td>
                        <td>{order.totalAmount}</td>
                        <td>{orderDate}</td>
                    </tr>
                )
            }));
        })
    }, [orders])
    
    return (
        <Container className="text-center">
            <h1 className="mt-3">My Orders</h1>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Item(s) - Price</th>
                        <th>Total Amount (&#8369;)</th>
                        <th>Purchased On</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </Table>
        </Container>
    )
}

export default MyOrders;
