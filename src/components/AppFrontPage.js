import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 

const AppCarouselPage = () => {
    return (
        <Carousel>
            <Carousel.Item className="frontPageItem">
                <img
                className="d-block w-100"
                src="img/carousel-1.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h1 className="mb-5">NO BUDGET FOR COMPUTERS?</h1>
                <h4 className="mb-5">Shop now here for reasonable prices.</h4>
                <Button className="ctaBtn mb-5" as={Link} to="/shop">SHOP NOW</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="frontPageItem">
                <img
                className="d-block w-100"
                src="img/carousel-2.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h1 className="mb-5">NO BUDGET FOR GADGETS?</h1>
                <h4 className="mb-5">All of our second-hand items are of high-quality, just as like you have bought it brand new.</h4>
                <Button className="ctaBtn mb-5" as={Link} to="/shop">SHOP NOW</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="frontPageItem">
                <img
                className="d-block w-100"
                src="img/carousel-3.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h1 className="mb-5">GUARANTEE?</h1>
                <h4 className="mb-5">Don't worry, we have warranty here.</h4>
                <Button className="ctaBtn mb-5" as={Link} to="/shop">SHOP NOW</Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default AppCarouselPage;
