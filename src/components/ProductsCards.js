import PropTypes from 'prop-types';
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductsCards = ({ productProp }) => {
    const {_id, name, description, price} = productProp;
    return (
        <Card className="mb-2 text-center">
            <Card.Body>
                <Row>
                    <Col>
                        <img src="https://place-puppy.com/400x400" alt="Placeholder image" />
                    </Col>
                    <Col>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle>Description:</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Subtitle>Price</Card.Subtitle>
                        <Card.Text>&#8369; {price}</Card.Text>
                        <Link className="btn btn-success productBtn" to={`/product/${_id}`}>Details</Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ProductsCards;
