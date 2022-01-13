import { Link } from "react-router-dom";
import {Container, Button} from "react-bootstrap";

const Error = () => {
    return (
        <Container className="mt-5 text-center">
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Button as={Link} to="/" className="ctaBtn">Go back home</Button>
        </Container>
    )
}

export default Error;
