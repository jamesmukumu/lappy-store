import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Preloader from "../../preloader";
function Resetpassword() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordlength, setPasswordlenght] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [scsmsg, setScsmsg] = useState("");
  const [passwordisVisible, setPasswordvisible] = useState(false);

  const token = Cookie.get("access cookie");

  function hideandshowPassword() {
    setPasswordvisible(!passwordisVisible);
  }

  async function postnewPassword(e) {
    setLoading(true);
    if (confirmpassword !== password) {
      setLoading(false);
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
      const response = await axios.put(
        "http://localhost:7000/change/password",
        { headers: { Authorization: token } },
        {
          Password: password,
        },
        { params: { Email: email } }
      );
      if (response.data.message === "No matching Email") {
        setLoading(false);

        setScsmsg("No matching email");
      } else if (response.data.message === "Unauthorized no token") {
        navigate("/login/client");
      } else if (
        response.data.message === "Email  found and password  updated"
      ) {
        setLoading(false);
        setScsmsg("Password updated");
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
        <strong>Update Password</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={postnewPassword}>
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

            <button>Reset Password</button>
            <p className="msg">{scsmsg}</p>
            <p className="msg">{passwordlength}</p>
          </form>
        )}
      </div>
    </div>
  );
}
export default Resetpassword;
