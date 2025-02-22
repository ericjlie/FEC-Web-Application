import React, { useState, useEffect } from 'react';
import { Button, ButtonTwo } from '../../GlobalStyle';

export function CarouselItem ({ children, width }) {
  return (
    <div className="carousel-item" style={{ width }}>
      {children}
    </div>
  );
}

function Carousel({ children, photo }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 300000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)`}}>
        {React.Children.map(children, (child, index) => <div className="carouselContainer">
          <img src={child.key} style={{ width: '100%' }} className="img" />
          </div>) }
      </div>
      <div className="indicators">
        <ButtonTwo
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </ButtonTwo>
        {React.Children.map(children, (child, index) => (
          <ButtonTwo
            className={`${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              updateIndex(index);
            }}
          >
            {index + 1}
          </ButtonTwo>
        ))}
        <ButtonTwo
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </ButtonTwo>
      </div>
    </div>
  );
}

export default Carousel;