import { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import UserContext from '../UserContext';

const AdminOrders = () => {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState();

    useEffect(() => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/orders/", {
            headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data.map(order => {
                let orderDate = new Date(order.purchasedOn).toLocaleDateString();
                return(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                            <ul>
                                {
                                    order.products.map(product => {
                                        return(
                                            <li key={product._id}>{product.name} - &#8369; {product.price} - {product.quantity} {(product.quantity === 1 ? "unit" : "units")}</li>
                                        )
                                    })
                                }
                            </ul>
                        </td>
                        <td>&#8369; {order.totalAmount}</td>
                        <td>{order.orderedBy.email}</td>
                        <td>{orderDate}</td>
                    </tr>
                )
            }));
        });
    }, [orders]);
    return (
        ((user.id !== null) || (localStorage.getItem("token") !== null))
        ?
            (user.isAdmin)
            ?
            <Container className="text-center">
                <h1 className="mt-3">All User Orders</h1>
                <Table bordered striped hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Items - Unit Price - Quantity</th>
                            <th>Total Amount</th>
                            <th>Purchased By</th>
                            <th>Purchased On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>
            </Container>
            :
            <Redirect to="/"/>
        :
        <Redirect to="/login"/>
    )
}

export default AdminOrders;
