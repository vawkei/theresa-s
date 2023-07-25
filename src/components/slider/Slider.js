import classes from "./Slider.module.css";
import { useState, useEffect, Fragment } from "react";
import { SliderData } from "./SliderData";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../ui/button/Button";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = SliderData.length;

  function nextSlide() {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }
  function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  let slideInterval;
  let timeInterval = 2000;

  function auto() {
    slideInterval = setInterval(nextSlide, timeInterval);
  }

  useEffect(() => {
    auto();
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide, slideInterval]);

  return (
    <div className={classes.slider}>
      <AiOutlineArrowLeft
        size={35}
        className={` ${classes.prev}  ${classes.arr}`}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        size={35}
        className={` ${classes.next}  ${classes.arr}`}
        onClick={nextSlide}
      />

      {SliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === currentSlide ? `${classes.slide}` : ""} >
            {index === currentSlide && (
              <div className={classes.slideFirstDiv}>
                <img src={slide.image} />
                <div>
                  <h1>{slide.heading}</h1>
                  <p>{slide.desc}</p>

                  <a href="/shop-now">
                    <Button className={classes.btn}>Shop Now</Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
