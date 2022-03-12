import { Button } from '@mui/material';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Slider = ({ imageSrc, title, subtitle, flipped } : any) => {

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.4,
  });


  const renderContent = () => {
    if(!flipped) {
      return (
      <>
      <img src={imageSrc} alt={title} className='slider-image' />
      <div className='slider-content'>
        <h1 className='slider-title'>{title}</h1>
        <p>{subtitle}</p>
      </div>
      </>
      );
    } else {
      return (
      <>
       <div className='slider-content'>
        <h1 className='slider-title'>{title}</h1>
        <p>{subtitle}</p>
        <Button color='inherit' size='small'>
          <Link to={'/google'} style={{ textDecoration: 'none'}} />
          Sign-In with Google
          </Button>
        </div>
        <img src={imageSrc} alt={title} className='slider-image' />
      </>
      );
    }
  };

  return (
    <div className={inView ? 'slider slider--zoom' : 'slider'} ref={ref}>
      {renderContent()}
    </div>
  )
}

export default Slider;
