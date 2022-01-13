import { useEffect, useState, useContext } from 'react';
import { Container, Button, Table } from "react-bootstrap";
import UserContext from "../UserContext";

const AdminDashboard = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/products/all", {
            mode: "no-cors",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }, []);

    return (
        <Container>
            <h1 className="text-center mt-3">Dashboard</h1>
        </Container>
    )
}

export default AdminDashboard;
