import React from "react"
import { Col, Button, Carousel } from "react-bootstrap"
import imageSlider1 from '../../assets/anhbia1.jpg'
import imageSlider2 from '../../assets/anhbia2.jpg'
import imageSlider3 from '../../assets/anhbia3.jpg'
import imageSlider4 from '../../assets/anhbia4.jpg'

const SliderCoverImage = () => {
    return (
        <>
                <Carousel>
                    <Carousel.Item >
                        <img
                            className="d-block"
                            src={imageSlider1}
                            alt="First slide"
                            style={{ width: '100%', height: '450px' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block"
                            src={imageSlider2}
                            alt="First slide"
                            style={{ width: '100%', height: '450px' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block"
                            src={imageSlider3}
                            alt="First slide"
                            style={{ width: '100%', height: '450px' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block"
                            src={imageSlider4}
                            alt="First slide"
                            style={{ width: '100%', height: '450px' }}
                        />
                    </Carousel.Item>
                </Carousel>
        </>
    )
}

export default SliderCoverImage