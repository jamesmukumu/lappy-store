import React from "react";
import { useState } from "react";

import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Preloader from "../../preloader";
function LoginAdminwithpasskey() {
  const [passkey, setPasskey] = useState("");
  const [loading,setLoading] = useState(false)
  const [scsmsg,setScsmsg] = useState("")
  let navigate = useNavigate();


 
  async function postLogin(e) {
    setLoading(true);

   
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/login/with/otp", {
        recoveryOTP:passkey,
        
      });
      if (response.data.message === "otp valid") {
        setLoading(false);
        const token = response.data.data;
        Cookie.set("admin cookie", token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response.data.message === "invalid login otp") {
        setLoading(false);
        setScsmsg("invalid passkey");
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
        <strong>Login  Admin PJ with Passkey</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={postLogin}>
            <div className="reginfo">
              <input
                type="text"
                placeholder="Enter Your passkey"
                onChange={(e) => setPasskey(e.target.value)}
                required
              />
            </div>

           

            <button>Login</button>
            <p className="msg">{scsmsg}</p>
          
            <Link to="/register/client" className="link">
              <stron>Dont have an account?</stron>
            </Link>
            <div>
              <Link to="/validate/recovery/email" className="link">
                <stron>Forgot Password?</stron>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default LoginAdminwithpasskey;
