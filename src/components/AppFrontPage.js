import { useState, useEffect } from "react";
import { Carousel, Button, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom"; 
// import CarouselItems from "./CarouselItems";

const AppCarouselPage = () => {
    const carouselItems = [
        {
            id: 1,
            img: {
                src: "img/carousel-1.jpg",
                alt: "First Slide"
            },
            captions: {
                title: "NO BUDGET FOR COMPUTERS?",
                text: "Shop now here for reasonable prices."
            }
        },
        {
            id: 2,
            img: {
                src: "img/carousel-2.jpg",
                alt: "Second Slide"
            },
            captions: {
                title: "NO BUDGET FOR GADGETS?",
                text: "Shop now here for reasonable prices."
            }
        },
        {
            id: 3,
            img: {
                src: "img/carousel-3.jpg",
                alt: "Third Slide"
            },
            captions: {
                title: "GUARANTEE?",
                text: "Don't worry, we have warranty here."
            }
        }
    ];

    return (
        <Carousel>
            {
                carouselItems.map(item => {
                    const {id, img, captions} = item;
                    return(
                        <Carousel.Item className="frontPageItem" key={id}>
                            <img 
                                className="d-block w-100"
                                src={img.src} 
                                alt={img.alt}
                            />
                            <Carousel.Caption>
                                <h1 className="mb-5">{captions.title}</h1>
                                <h4 className="mb-5">{captions.text}</h4>
                                <Button className="ctaBtn mb-5" as={Link} to="/shop">SHOP NOW</Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default AppCarouselPage;
