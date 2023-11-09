import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscThreeBars } from "react-icons/vsc";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Preloader from "../../../preloader";
function Macbookprom2() {
  const [Macbookairdata, setMacbookairdata] = useState([]);
  const [isVisible, setIsvisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [laptopPrice, setLaptopprice] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [checkoutUrl, setCheckouturl] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const token = Cookie.get("access cookie");
  useEffect(() => {
    async function fetchMacbookairdata() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pj-laptops-store.onrender.com/apple/macbookprom2"
        );
        if (response.data.message === "apple found") {
          setLoading(false);
          setMacbookairdata(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMacbookairdata();
  }, []);

  function toggleCategories() {
    setIsvisible(!isVisible);
  }

  function handleImageClick(image) {
    setSelectedImage(image);
  }

  // Fetch laptop price and calculate subtotal
  useEffect(() => {
    async function fetchMacbookairdataprice() {
      try {
        const response = await axios.get(
          "https://pj-laptops-store.onrender.com/apple/macbookprom2/price",
          {
            headers: { Authorization: token },
          }
        );
        if (response.data.message === "Prices fetched") {
          setLaptopprice(response.data.data);
          const totalPrice = laptopPrice * quantity;
          setSubTotal(totalPrice);
        } else if (response.data.message === "Unauthorized no token") {
          navigate("/login/client");
        } else {
          setLaptopprice([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMacbookairdataprice();
  }, [laptopPrice, quantity]);

  // Function to increase quantity
  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  // Function to decrease quantity (ensure quantity doesn't go below 1)
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  async function buyMacbookairgold() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://pj-laptops-store.onrender.com/buy/applemacbookprom2",
        { headers: { Authorization: token } },
        {
          Totals: subTotal,
        }
      );

      if (response.data.message === "url fetched") {
        setLoading(false);
        setCheckouturl(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="macbooksair">
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
          <li>All Laptops</li>
          <li>HP Laptops</li>
          <li>Apple Laptops</li>
        </ul>
      </div>

      {loading ? (
        <Preloader />
      ) : (
        <div className="results-laptop">
          <div className="laptops-card">
            <strong>{Macbookairdata.nameoflaptop}</strong>
            <p>
              Brand:<span>{Macbookairdata.brand}</span>
            </p>
            <img src={selectedImage || Macbookairdata.laptopImageone} alt="" />
            <div>
              <img
                src={Macbookairdata.laptopImageone}
                alt=""
                onClick={() => handleImageClick(Macbookairdata.laptopImageone)}
                style={{ width: "100px", height: "100px" }}
              />
              <img
                src={Macbookairdata.laptopImagetwo}
                alt=""
                onClick={() => handleImageClick(Macbookairdata.laptopImagetwo)}
                style={{ width: "100px", height: "100px" }}
              />
              <img
                src={Macbookairdata.laptopImagethree}
                alt=""
                onClick={() =>
                  handleImageClick(Macbookairdata.laptopImagethree)
                }
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <p>
              cpuprocessor:<span>{Macbookairdata.cpuprocessor}</span>
            </p>
            <p>
              Condition:<span>{Macbookairdata.condition}</span>
            </p>
            <p>
              RAM Size:<span>{Macbookairdata.RAMSize}</span>
            </p>
            <p>
              Graphic processor:<span>{Macbookairdata.Graphicsprocessor}</span>
            </p>
            <p>
              Storage Capacity:<span>{Macbookairdata.StorageCapacity}</span>
            </p>
            <p>
              Hard Drive Type:<span>{Macbookairdata.HardDriveType}</span>
            </p>
            <p>
              Availability:<span>{Macbookairdata.availability}</span>
            </p>
            <h1>
              Price:<strong> KSH {Macbookairdata.Price}</strong>
            </h1>
          </div>
          <div className="laptopdescription">
            <h1 style={{ fontFamily: "'Asap', sans-serif" }}>
              Customize your 13-inch MacBook Air - Gold
            </h1>
            <p>
              Apple M1 chip with 8‑core CPU, 7‑core GPU, 16‑core Neural Engine
            </p>
            <p>8GB unified memory</p>
            <p>256GB SSD storage</p>
            <p>13-inch Retina display with True Tone</p>
            <p>Two Thunderbolt / USB 4 ports</p>
            <p>30W USB-C Power Adapter</p>
            <p>Backlit Magic Keyboard with Touch ID - US English</p>
          </div>
          <div className="checkout">
            <h1 style={{ fontFamily: "'Asap', sans-serif" }}>
              Purchase {Macbookairdata.nameoflaptop}
            </h1>
            <p>
              initial Price:<strike>ksh:175,000.00</strike>
            </p>
            <strong>
              New Price:<span>{laptopPrice}(Inclusive of Vat)</span>
            </strong>
            <div>
              <i>
                <HiPlus onClick={increaseQuantity} />
              </i>
              {quantity}
              <i onClick={decreaseQuantity}>
                <FaMinus />
              </i>
            </div>
            <h2>
              Sub Total: <span>{subTotal}</span>
            </h2>
            <button onClick={buyMacbookairgold}>Buy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Macbookprom2;
