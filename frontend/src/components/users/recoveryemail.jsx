import React from "react";
import { useState } from "react";
import Preloader from "../../preloader";
import axios from "axios";
import Cookie from "js-cookie";
function Validaterecoveryemail() {
  const [recoveryemail, setRecovery] = useState("");
  const [loading, setLoading] = useState(false);

  const [scsmsg, setScsmsg] = useState("");

  async function fetchrecoveryEmail(e) {
    setLoading(true);

    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7000/validate/email",
        {
          Email: recoveryemail,
        }
      );
      if (response.data.message === "Password reset link sent") {
        setLoading(false);
        const token = response.data.data;
        Cookie.set("reset cookie", token);
        setScsmsg("reset link sent");
      } else if (response.data.message === "Email does Not exist") {
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
        <strong>Recover Password through Email</strong>

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

            <button>Recover</button>
            <p className="msg">{scsmsg}</p>
          </form>
        )}
      </div>
    </div>
  );
}
export default Validaterecoveryemail;
