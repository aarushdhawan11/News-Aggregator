

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css'; 
import logo from './logo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark " style={{ borderBottom: "3px solid gray" }}>
      <div className="container-fluid">
      <img src={logo} alt="Logo" className="navbar-logo" style={{height:"100px",width:"100px"}} /> 
        <Link className="navbar-brand fs-2" style={{marginLeft:"15px"}}  to="/">News <span>Wave</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item ">
              <Link className="nav-link" aria-current="page" to="/register">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/general">General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css'; 
// import logo from './logo.png'

// const Navbar = () => {
//   const location = useLocation();
//   const [pageTitle, setPageTitle] = useState('');

//   useEffect(() => {
//     // Extract category from pathname
//     const pathname = location.pathname;
//     const category = pathname.substring(1); // Remove leading "/"
//     setPageTitle(category.charAt(0).toUpperCase() + category.slice(1));
//   }, [location]);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark " style={{ borderBottom: "3px solid gray" }}>
//       <div className="container-fluid">
//       <img src={logo} alt="Logo" className="navbar-logo" style={{height:"100px",width:"100px"}} /> 
//         <Link className="navbar-brand fs-2" style={{marginLeft:"15px"}}  to="/">News <span>Wave</span></Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
//             <li className="nav-item ">
//               <Link className="nav-link" aria-current="page" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/general">General</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Business">Business</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Entertainment">Entertainment</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Health">Health</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Science">Science</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Sports">Sports</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/Technology">Technology</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

