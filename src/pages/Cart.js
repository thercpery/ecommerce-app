import { useState, useEffect, useContext } from 'react'
import { Container, Button, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserContext from "../UserContext";

const Cart = () => {
    return (
        <Container className="text-center">
            <h1 className="mt-3">Cart</h1>
        </Container>
    )
}

export default Cart;
