import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Preloader from "../../preloader";
function Registerclient() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [passwordlength, setPasswordlenght] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [scsmsg, setScsmsg] = useState("");
  const [passwordisVisible, setPasswordvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();

  function hideandshowPassword() {
    setPasswordvisible(!passwordisVisible);
  }

  async function postRegisration(e) {
    setLoading(true);
    if (confirmpassword !== password) {
      setLoading(false)
      setScsmsg("Passwords not matching");
      return setScsmsg;
    }

    if (password.length < 7) {
      setLoading(false);
      setPasswordlenght("Password Must Be At least 8 charachters long");
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pj-laptops-store.onrender.com/post/user",
        {
          username: Username,
          Password: password,
          Email: email,
          phoneNumber: phonenumber,
        }
      );
      if (response.data.message === "Saved and email sent") {
        const token = response.data.data;
        Cookie.set("access cookie", token);
        navigate("/");
      } else if (response.data.message === "Email already exists") {
        setLoading(false);
        setScsmsg("Email or Phone number already in use");
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
        <strong>Register with the PJ Laptops</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={postRegisration}>
            <div className="reginfo">
              <input
                type="text"
                placeholder="Enter Your Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="reginfo">
              <input
                type="number"
                placeholder="Enter Your phonenumber"
                onChange={(e) => setPhonenumber(e.target.value)}
                required
              />
            </div>

            <div className="reginfo">
              <input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="reginfo">
              <input
                type={passwordisVisible ? "text" : "password"}
                placeholder="Enter Your desired Password"
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="reginfo">
              <input
                type={passwordisVisible ? "text" : "password"}
                placeholder="Confirm your password"
                onChange={(e) => setConfirmpassword(e.target.value)}
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

            <button>Sign Up</button>
            <p className="msg">{scsmsg}</p>
            <p className="msg">{passwordlength}</p>
            <Link to="/login/client" className="link">
              <stron>Already have an account?</stron>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
export default Registerclient;
