import { useState, useEffect, useContext } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Container, Card, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    function loginUser(e){
        e.preventDefault();

        fetch("https://ancient-temple-55465.herokuapp.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(typeof data.accessToken !== "undefined"){
                localStorage.setItem("token", data.accessToken);
                retrieveUserDetails(data.accessToken);
                Swal.fire({
                    title: "Login Successful!",
                    icon: "success",
                    text: "You can now shop online."
                });
                if(user.isAdmin){
                    history.push("/admin");
                }
                else{
                    history.push("/shop");
                }
            }
            else{
                Swal.fire({
                    title: "Wrong Email Or Password!",
                    icon: "error",
                    text: "Please enter your correct email or password.",
                })
            }
        });
    }

    const retrieveUserDetails = (token) => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/users/details", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id:data._id,
                isAdmin:data.isAdmin
            });
        });
    }

    useEffect(() => {
        if((email !== "" && password !== "")){
            setIsActive(true);
        }
        else{
            setIsActive(false);         
        }
    }, [email, password]);

    return (
        ((user.id !== null) || (localStorage.getItem("token") !== null))
        ?
            (user.isAdmin)
            ?
            <Redirect to="/admin"/>
            :
            <Redirect to="/shop" />
        :

        <Container>
            <div className="d-flex justify-content-center mt-5">
                <Card className="text-center center-block cardForm">
                    <Card.Header className="cardHeader">
                        <h3>Log In</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => loginUser(e)}>          
                            <Form.Group className="mb-3" controlId="userEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="user@email.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>
                            {
                                isActive 
                                ? 
                                <Button type="submit" className="submitBtn">Log In</Button>
                                :
                                <Button type="submit" className="submitBtn" disabled>Log In</Button>
                            }
                        </Form>
                    </Card.Body>
                    <Card.Body>
                        Don't have an account? <Link to="/signup">Sign Up Here</Link>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Login;
