import React from "react";
import { useState } from "react";
import Preloader from "../../preloader";
import axios from "axios";

function Requestotpbcnd() {
  const [recoveryemail, setRecovery] = useState("");
  const [loading, setLoading] = useState(false);

  const [scsmsg, setScsmsg] = useState("");

  async function fetchrecoveryEmail(e) {
    setLoading(true);
//
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:7000/request/otp",
       {
        params:{Email:recoveryemail}
       }
      );
      if (
        response.data.message === "Email found reset and otp sent"
      ) {
        setLoading(false);
       
       
        setScsmsg("otp sent check your email inbox");
      } else if (response.data.message === "No matching email") {
        setLoading(false);
        setScsmsg("Email does not exist");
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
        <strong>Get your otp through email</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={fetchrecoveryEmail}>
            <div className="reginfo">
              <input
                type="email"
                placeholder="Enter Your email"
                onChange={(e) => setRecovery(e.target.value)}
                required
              />
            </div>

            <button>Request otp</button>
            <p className="msg">{scsmsg}</p>
          </form>
        )}
      </div>
    </div>
  );
}
export default Requestotpbcnd
