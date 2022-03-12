import React from 'react';




const Landing = ({ imageSrc, phrase }: any) => {
  return (
    <div className='landing'>
      <img src={imageSrc} alt="pantry" className='landing-image' />
      <h1 className='landing-title'>{phrase}</h1>
    </div>
  )
}

export default Landing;

