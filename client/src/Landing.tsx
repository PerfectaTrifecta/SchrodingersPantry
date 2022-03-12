import React from 'react';




const Landing = ({ imageSrc }: any) => {
  return (
    <div className='landing'>
      <img src={imageSrc} alt="pantry" className='landing-image' />
      <h1 className='landing-title'>Your Favorite Meals at Your Fingertips</h1>
    </div>
  )
}

export default Landing;

