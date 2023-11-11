import React from "react";
import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import Preloader from "../../../preloader";
import { useNavigate } from "react-router-dom";

function Updateaavailabity() {
  const [Availabilitychange, setAvailabilitychange] = useState("");
  const [Nameoflappy, setNameoflappy] = useState("");
  const [updatemsg, setUpdatemsg] = useState("");
  const [loading, setLoading] = useState(false);

  var navigate = useNavigate();

  async function updateavailabilityoflaptop() {
    setLoading(true);
    try {
      const token = Cookie.get("admin cookie");
      const response = await axios.put(
        "http://localhost:7000/update/availability",
        {
          params: { nameoflaptop: Nameoflappy },
        },
        {
          headers: { Authorization: token },
        },
        { availability: Availabilitychange }
      );

      if (response.data.message === "Updated") {
        setLoading(false);
        setUpdatemsg("Availability of laptop updated");
      } else if (response.data.error === "No laptop updated") {
        setLoading(false);
        setUpdatemsg("No laptop found to be updated");
      } else if (response.data.message === "Unauthorized no token") {
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
        <strong>update laptop availability</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={updateavailabilityoflaptop}>
            <div className="reginfo">
              <textarea
                onChange={(e) => setNameoflappy(e.target.value)}
                placeholder="Enter laptop name"
              ></textarea>
            </div>

            <div className="reginfo">
              <textarea
                onChange={(e) => setAvailabilitychange(e.target.value)}
                placeholder="update laptop availability"
              ></textarea>
            </div>

            <button>Update Availablity</button>
            <p className="msg">{updatemsg}</p>
          </form>
        )}
      </div>
    </div>
  );
}
export default Updateaavailabity;
