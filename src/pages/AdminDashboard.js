import { useEffect, useState, useContext, Fragment } from 'react';
import { Container, Button, Table, Modal, Form } from "react-bootstrap";
import { Redirect, Link, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

const AdminDashboard = () => {

    const {user} = useContext(UserContext);
    const [products, setProducts] = useState();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [mode, setMode] = useState();


    // const data = {
    //     headers: ["Name", "Description", "Price", "Available", "Actions"],
    //     data: products
    // }

    // Add product
    function sellProduct(e){
        e.preventDefault();
        // Save data thru API.
        fetch("https://ancient-temple-55465.herokuapp.com/api/products/sell", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: "Item Saved!",
                icon: "success",
                text: "This item will appear in the shop."
            });
            // Clear values and close modal
            handleClose();
            setMode("");
            setName("");
            setDescription("");
            setPrice("");
        });
    }

    // Update product
    function updateProduct(e){
        e.preventDefault();
        fetch(`https://ancient-temple-55465.herokuapp.com/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Swal.fire({
                title: "Update Successful!",
                icon: "success",
                text: "The updated values will be shown in the shop."
            });
            handleClose();
            setId("");
            setMode("");
            setName("");
            setDescription("");
            setPrice("");
        });
    }

    // Archive product
    function archiveProduct(productId, productName){
        // Get API data
        fetch(`https://ancient-temple-55465.herokuapp.com/api/products/${productId}/archive`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data === true){
                Swal.fire({
                    title: `${productName} Successfully Archived`,
                    icon: "success",
                    text: "The item will not be shown in the shop."
                });
            }
        })
    }

    // Resell (unarchive) product
    function resellProduct(productId, productName){
        fetch(`https://ancient-temple-55465.herokuapp.com/api/products/${productId}/unarchive`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data === true){
                Swal.fire({
                    title: `${productName} Successfully Resold`,
                    icon: "success",
                    text: "The item will be shown in the shop."
                });
            }
        })
    }

    useEffect(() => {
        if(user.isAdmin){
            fetch("https://ancient-temple-55465.herokuapp.com/api/products/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setProducts(data.map(product => {
                    return(
                        (product.isActive)
                        ?
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>&#8369; {product.price}</td>
                                <td>Yes</td>
                                <td>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => {
                                            handleShow();
                                            setMode("update");
                                            setId(product._id);
                                            setName(product.name);
                                            setDescription(product.description);
                                            setPrice(product.price);
                                        }}>
                                            Update</button>
                                    <button className="btn btn-danger" onClick={e => archiveProduct(product._id, product.name)}>Archive</button>
                                </td>
                            </tr>
                        :
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>&#8369; {product.price}</td>
                                <td>No</td>
                                <td>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={()=> {
                                            handleShow();
                                            setMode("update");
                                            setId(product._id);
                                            setName(product.name);
                                            setDescription(product.description);
                                            setPrice(product.price);
                                        }}>Update</button>
                                    <button className="btn btn-success" onClick={e => resellProduct(product._id, product.name)}>Resell</button>
                                </td>
                            </tr>
                    ); // return
                })); // .setProducts
            }) // then
        } // if()
    }, [user, products]); // useEffect()
    

    return (
        (user.isAdmin)
        ?
        <>
            <Container className="text-center">
                <h1 className="mt-3">Dashboard</h1>
                <Button 
                    onClick={() => {
                        handleShow();
                        setMode("add");
                        }
                    }>Sell New Product</Button>
                <Button as={Link} to="/admin/orders" className="btn-success ml-3">View All User Orders</Button>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Available?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </Table>
            </Container>
            {/* MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {(mode === "add")
                    ?
                    <Modal.Title>Sell New Product</Modal.Title>
                    :
                    <Modal.Title>Update Product</Modal.Title>
                    }
                </Modal.Header>
                <Form onSubmit={(e) => {
                    if(mode==="add"){
                        sellProduct(e);
                    }
                    else{
                        updateProduct(e);
                    }
                }}>
                    <Modal.Body>
                        {
                            (mode==="update")
                            ?
                            <Form.Control 
                                type="text"
                                value={id}
                                onChange={e => setId(e.target.value)}
                                hidden
                            />
                            :
                            <></>
                        }
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="e.g. Apple MacBook"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                placeholder="e.g. This is a sturdy item."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productPrice">
                            <Form.Label>Price (&#8369;)</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="e.g. &#8369; 100,000.00"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>Close</Button>
                        <Button type="submit" className="submitBtn">
                            {
                                (mode==="add")
                                ?
                                "Sell New Product"
                                :
                                "Update Product"
                            }

                            </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
        :
        <Redirect to="/shop"/>
    )
}

export default AdminDashboard;
