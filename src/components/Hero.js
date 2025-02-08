// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

// const Hero = () => {
//   return (
//     <div className='container-fluid bg-dark text-white d-flex justify-content-center align-items-center flex-column' 
//     style={{height: "32vh"}}>
//         <h1 style={{fontSize: "50px", color:"orange"}}>News Wave</h1>
//         <h5>Stay in the Know: Your Trusted Source for News.</h5>
//     </div>
//   )
// }

// export default Hero

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css'; 

const Hero = () => {
  return (
    <header className='hero-container'>
      <div className='hero-content'>
        <h1 className='hero-title'>News Wave</h1>
        <h5 className='hero-subtitle'>Stay in the Know: Your Trusted Source for News</h5>
      </div>
    </header>
  );
}

export default Hero;

