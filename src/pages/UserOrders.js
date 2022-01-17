import { useState, useEffect, useContext } from 'react';
import { Container, Table } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import UserContext from "../UserContext";

const MyOrders = () => {

    const {user} = useContext(UserContext);

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
                                            <li key={product._id}><Link to={`/product/${product.productId}`}>{product.name}</Link> - &#8369; {product.price} - {product.quantity} {(product.quantity > 1 ? "units" : "unit")}</li>
                                        )
                                    })
                                }
                            </ul>
                        </td>
                        <td>&#8369; {order.totalAmount}</td>
                        <td>{orderDate}</td>
                    </tr>
                )
            }));
        })
    }, [orders])
    
    return (
        ((user.id !== null) || (localStorage.getItem("token") !== null))
        ?
            (!user.isAdmin)
            ?
            <Container className="text-center">
                <h1 className="mt-3">My Orders</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Item(s) - Price - Quantity</th>
                            <th>Total Amount</th>
                            <th>Purchased On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>
            </Container>
            :
            <Redirect to="/admin/orders"/>
        :
        <Redirect to="/login" />
    )
}

export default MyOrders;
