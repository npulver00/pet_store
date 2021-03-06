import React, { Component } from 'react';
import Slider from 'react-slick';
import picture1 from "../Image/DogsImage1.jpg";
import picture2 from "../Image/DachshundImage.jpeg";
import picture3 from "../Image/DogToy.jpeg";
import picture4 from "../Image/BostonToy.jpeg";
import picture5 from "../Image/DogDuck.jpeg"
import picture6 from "../Image/boston-terrier-puppy-balls.jpeg";
import picture7 from "../Image/cat-playing-with-toy-mouse.jpeg";
import picture8 from "../Image/catstoy.jpeg";
import picture9 from "../Image/catblack.jpeg";

import './Slick.css';

class Slick extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slideToShow: 3,
            slideToScroll: 3,
            autoplay: true,
            fade: true,

        }
        return (
            <Slider {...settings}>

                <div className="picimage"><img src={picture2} alt="" /> <img src={picture1} alt="" /><img src={picture3} alt="" /></div>
                <div className="picimage"><img src={picture4} alt="" /><img src={picture6} alt="" /><img src={picture5} alt="" /></div>
                <div className="picimage"><img src={picture7} alt="" /><img src={picture8} alt="" /><img src={picture9} alt="" /></div>




            </Slider >
        );
    }
}

export default Slick;