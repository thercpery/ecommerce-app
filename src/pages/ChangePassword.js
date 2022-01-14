import { useState, useEffect, useContext } from 'react'
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import Swal from "sweetalert2"

const ChangePassword = () => {

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();

    function changePassword(e){
        e.preventDefault();
        fetch("https://ancient-temple-55465.herokuapp.com/api/users/changepassword",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                password: password2
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Swal.fire({
                title: "Password Successfully Changed!",
                icon: "success",
                text: "Please login again with your new password."
            });
            // Redirects back to logout page to login with new password.
            history.push("/logout");
        })
    }

    useEffect(() => {
        if((password1 !== "" && password2 !== "") && (password1 === password2)){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }, [password1, password2]);

    return (
        <Container className="text-center mt-3">
            <div className="d-flex justify-content-center mt-5">
                <Card className="text-center center-block cardForm">
                    <Card.Header className="cardHeader">
                        <h3>Change Password</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => changePassword(e)}>          
                            <Form.Group className="mb-3" controlId="password1">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter your new password" 
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password2">
                                <Form.Label>Confirm your new password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Confirm your new password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)} 
                                    required>
                                </Form.Control>
                            </Form.Group>
                            {
                                isActive 
                                ? 
                                <Button type="submit" className="submitBtn">Change Password</Button>
                                :
                                <Button type="submit" className="submitBtn" disabled>Change Password</Button>
                            }
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default ChangePassword;
