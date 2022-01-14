import { useState, useEffect, useContext } from "react";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { Container, Card, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Signup = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [isActive, setIsActive] = useState(false);

    async function registerUser(e){
        e.preventDefault();

        const checkEmailExists = await fetch("https://ancient-temple-55465.herokuapp.com/api/users/checkEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(res => res.json())
        .then(data => data);
        if(!checkEmailExists){
            fetch("https://ancient-temple-55465.herokuapp.com/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password2
                })
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: "Sign Up Successful!",
                    icon: "success",
                    text: "You can now login and shop items."
                });
                history.push("/login");
            });
        }
        else{
            Swal.fire({
                title: "Email Is Already Registered",
                icon: "error",
                text: "Please select another email."
            });
        }
    }

    useEffect(() => {
        if((email !== "" && password1 !== "" && password2 !== "") && (password1 === password2)){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }, [email, password1, password2]);

    return (
        ((user.id !== null) || (localStorage.getItem("token") !== null))
        ?
            (user.isAdmin)
            ?
            <Redirect to="/admin" />
            :
            <Redirect to="/shop" />
        :
        <Container>
            <div className="d-flex justify-content-center mt-5">
                <Card className="text-center center-block cardForm">
                    <Card.Header className="cardHeader">
                        <h3>Sign Up</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => registerUser(e)}>
                            <Form.Group className="mb-3" controlId="userEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="user@email.com" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required>
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="h@rDtÖGv3$$ password" 
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password2">
                                <Form.Label>Verify Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="h@rDtÖGv3$$ password" 
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    required></Form.Control>
                            </Form.Group>
                            {
                                isActive ?
                                <Button type="submit" className="submitBtn">Sign Up</Button>
                                :
                                <Button type="submit" className="submitBtn" disabled>Sign Up</Button>
                            }
                        </Form>
                    </Card.Body>
                    <Card.Body>
                        Already have an account? <Link to="/login">Log In Here</Link>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Signup;
