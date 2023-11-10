import React, { useState } from "react";


import { VscThreeBars } from "react-icons/vsc";

import { Link } from "react-router-dom";

function Navigationmenuadmin() {
  const [isVisible,setIsvisible] = useState(false)
    //functin toogle nav
  function toggleCategories() {
    setIsvisible(!isVisible);
  }

 
  return (
    <div className="nav">
      <div className="intro">
        <img
          src="https://res.cloudinary.com/dasrniwpk/image/upload/v1699294841/LogoSample_ByTailorBrands_2_dbv399.png"
          alt=""
        />
      </div>
      <h1>ADMINS SECTION</h1>
      <div className="categories">
        <i onClick={toggleCategories}>
          <VscThreeBars />
        </i>
        <ul style={{ display: isVisible ? "block" : "none" }}>
          
          <Link to="/update/price" className="link">
            <li>update laptop price</li>
          </Link>


          <Link to="/update/availability" className="link">
            <li>update laptop availability</li>
          </Link>

          <Link to="/delete/laptop" className="link">
            <li>delete laptop</li>
          </Link>

          <Link to="/post/laptop" className="link">
            <li>Add laptop</li>
          </Link>
          <Link to="/login/admin" className="link">
            <li>Login</li>
          </Link>


          


          
        </ul>
      </div>

    
    </div>
  );
}

export default Navigationmenuadmin;
