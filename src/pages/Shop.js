import { Fragment, useEffect, useState, useContext } from 'react';
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ProductsCards from "../components/ProductsCards";
import UserContext from "../UserContext";

const Shop = () => {
    const {user} = useContext(UserContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://ancient-temple-55465.herokuapp.com/api/products")
        .then(res => res.json())
        .then(data => {
            setProducts(data.map(product => {
                return (
                    <ProductsCards
                        key={product._id}
                        productProp={product}
                    />
                )
            }));
        });
    }, []);

    return (
        (user.isAdmin)
        ?
        <Redirect to="/admin/dashboard" />
        :
        <Container>
            <h1 className="text-center mt-3 mb-3">Shop</h1>
            <Fragment>
                {products}
            </Fragment>
        </Container>
    )
}

export default Shop;
