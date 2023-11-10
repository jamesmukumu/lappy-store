import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Preloader from "../../preloader";
function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [passwordlength, setPasswordlenght] = useState("");
  const [loading, setLoading] = useState(false);
  const [scsmsg, setScsmsg] = useState("");
  const [passwordisVisible, setPasswordvisible] = useState(false);

  function hideandshowPassword() {
    setPasswordvisible(!passwordisVisible);
  }

  async function postLogin(e) {
    setLoading(true);

    if (password.length < 7) {
      setPasswordlenght("Password Must Be At least 8 charachters long");
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:70000/login/admin/password",
        {
          Email: email,
          password: password,
        }
      );
      if (response.data.message === "logged in") {
        setLoading(false);
        const token = response.data.data;
        Cookie.set("admin cookie", token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response.data.message === "Email not found") {
        setLoading(false);
        setScsmsg("Admin does not have an account");
      } else if (response.data.message === "Password does not match") {
        setLoading(false);
        setScsmsg("invalid credentials");
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
        <strong>Login Admin PJ Laptops</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={postLogin}>
            <div className="reginfo">
              <input
                type="text"
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

            <button>Login</button>
            <p className="msg">{scsmsg}</p>
            <p className="msg">{passwordlength}</p>
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
export default LoginAdmin;
