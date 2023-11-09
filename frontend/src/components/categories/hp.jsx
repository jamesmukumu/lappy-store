import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { VscThreeBars } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import Preloader from "../../preloader";
function HPlaptops() {
  const [applelaptopsdata, setApplelaptopsdata] = useState([]);
  let navigate = useNavigate();
  const token = Cookie.get("access cookie");
  const [isVisible, setIsvisible] = useState(false);
  const [Noofapplelaptops, setNoofapplelaptops] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchApplelaptops() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pj-laptops-store.onrender.com/filter/hp",
          {
            headers: { Authorization: token },
          }
        );
        if (response.data.message === "hp laptops found") {
          setLoading(false);
          setApplelaptopsdata(response.data.data);
          console.log("setlaptops", applelaptopsdata);
        } else if (response.data.message === "No apple laptops") {
          setApplelaptopsdata([]);
        } else if (response.data.message === "Unauthorized no token") {
          navigate("/login/client");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchApplelaptops();
  }, []);

  //functin toogle nav
  function toggleCategories() {
    setIsvisible(!isVisible);
  }

  useEffect(() => {
    async function Numberofapplelaptops() {
      try {
        const response = await axios.get(
          "https://pj-laptops-store.onrender.com/count/hp"
        );
        if (response.data.message === "hp laptops counted") {
          setNoofapplelaptops(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    Numberofapplelaptops();
  }, []);

  return (
    <div className="nav">
      <div className="intro">
        <img
          src="https://res.cloudinary.com/dasrniwpk/image/upload/v1699294841/LogoSample_ByTailorBrands_2_dbv399.png"
          alt=""
        />
      </div>
      <div className="categories">
        <i onClick={toggleCategories}>
          <VscThreeBars />
        </i>
        <ul style={{ display: isVisible ? "block" : "none" }}>
          <li>HP Laptops ({Noofapplelaptops})</li>
        </ul>
      </div>

      {loading ? (
        <Preloader />
      ) : (
        <>
          {applelaptopsdata.map((item) => (
            <div
              className="alllaptopsdata"
              onClick={() => {
                navigate(`${item.feRoute}`);
              }}
            >
              <div className="laptops-card">
                <strong>
                  <strong>{item.nameoflaptop}</strong>
                </strong>
                <p>
                  Brand:<strong>{item.brand}</strong>
                </p>
                <img src={item.laptopImageone} alt="" />
                <p>
                  cpuprocessor:<span>{item.cpuprocessor}</span>
                </p>
                <p>
                  Condition:<span>{item.condition}</span>
                </p>
                <p>
                  RAM Size:<span>{item.RAMSize}</span>
                </p>
                <p>
                  Graphic processor:<span>{item.Graphicsprocessor}</span>
                </p>
                <p>
                  Storage Capacity:<span>{item.StorageCapacity}</span>
                </p>
                <p>
                  Hard Drive Type:<span>{item.HardDriveType}</span>
                </p>
                <p>
                  Availability:<span>{item.availability}</span>
                </p>
                <h1>
                  Price:<strong> KSH {item.Price}.00</strong>
                </h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default HPlaptops;
