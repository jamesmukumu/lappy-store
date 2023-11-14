import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

import Preloader from "../../preloader";

function Validateunlockprase() {
  const [Unlockphrase, setUnlockphrase] = useState("");
 
  let navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [scsmsg, setScsmsg] = useState("");
  const [passwordisVisible, setPasswordvisible] = useState(false);

  function hideandshowPassword() {
    setPasswordvisible(!passwordisVisible);
  }

  async function postunlockprhase(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/post/unlock/phrase",
        {
         unlockphrase:Unlockphrase
        }
      );
      if (response.data.message === "unlock phrase matches") {
        setLoading(false);
        const token = response.data.data;
        Cookie.set("unlock cookie", token);
        setTimeout(() => {
          navigate("/register/admin");
        }, 2000);
      } else if (response.data.message === "wrong unlock passphrase") {
        setLoading(false);
        setScsmsg("Unlock passphrase wrong...try again");
      } 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="reg">
        <div className="intro">
          <img
            src="https://res.cloudinary.com/dasrniwpk/image/upload/v1699294841/LogoSample_ByTailorBrands_2_dbv399.png"
            alt=""
          />
        </div>
        <strong>Confirm unlock phrase</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={postunlockprhase}>
            

            <div className="reginfo">
              <input
                type={passwordisVisible ? "text" : "password"}
                placeholder="Enter Your unlock phrase"
                onChange={(e) => setUnlockphrase(e.target.value)}
                required
              />
              <i onClick={hideandshowPassword}>
                {passwordisVisible ? (
                  <i>
                    <BsFillEyeFill />
                  </i>
                ) : (
                  <i>
                    <BsFillEyeSlashFill />
                  </i>
                )}
              </i>
            </div>

            <button>Check</button>
            <p className="msg">{scsmsg}</p>
   
          
            <div>
            
             
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default Validateunlockprase;
