import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 

const AppCarouselPage = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="img/carousel-1.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>NO BUDGET FOR COMPUTERS?</h3>
                <p>Shop now here for reasonable prices.</p>
                <Button className="ctaBtn" as={Link} to="/shop">SHOP NOW</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="img/carousel-2.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>NO BUDGET FOR GADGETS?</h3>
                <p>All of our second-hand items are of high-quality, just as like you have bought it brand new.</p>
                <Button className="ctaBtn" as={Link} to="/shop">SHOP NOW</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="img/carousel-3.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>GUARANTEE?</h3>
                <p>Don't worry, we have warranty here.</p>
                <Button className="ctaBtn" as={Link} to="/shop">SHOP NOW</Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default AppCarouselPage;
