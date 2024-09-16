import React, { useState, useEffect, useRef } from 'react';
import styles from './Slideshow.module.scss';
import slide1 from '../../assets/images/Slideshow/slide-1.jpg';
import slide2 from '../../assets/images/Slideshow/slide-2.jpg';
import slide3 from '../../assets/images/Slideshow/slide-3.jpg';
import slide4 from '../../assets/images/Slideshow/slide-4.jpg';
import slide5 from '../../assets/images/Slideshow/slide-5.jpg';
import slide6 from '../../assets/images/Slideshow/slide-6.jpg';
import arrow from '../../assets/images/Slideshow/Vector.png';


export const Slideshow = () => {
    const slides = [slide1, slide2, slide3, slide4, slide5, slide6];
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => 
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    const startSlideInterval = () => {
        slideInterval.current = setInterval(nextSlide, 5000);
    };
    
    const resetSlideInterval = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
        startSlideInterval();
    };

    
    useEffect(() => {
        startSlideInterval();

        return () => clearInterval(slideInterval.current);
    }, []);

    return (
        <>
        <div className={styles.Slideshow}>
            <div className={styles.SlideshowWrapper}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`${styles.Slide} ${index === currentSlide ? styles.SlideActive : ''}`}
                        style={{ backgroundImage: `url(${slide})` }}
                    />
                ))}
                
            </div>
            
        </div>
        <img
                    src={arrow}
                    alt="Previous"
                    className={styles.ArrowLeft}
                    onClick={() => { prevSlide(); resetSlideInterval(); }}
                />
                <img
                    src={arrow}
                    alt="Next"
                    className={styles.ArrowRight}
                    onClick={() => { nextSlide(); resetSlideInterval(); }}
                />
        </>
    );
};