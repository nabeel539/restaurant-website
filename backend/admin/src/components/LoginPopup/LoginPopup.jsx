import { useState } from "react";
import { Toaster } from "react-hot-toast";

const LoginPopup = () => {
  const [showLogin, setShowLogin] = useState("false");
  const handleSubmit = () => {};
  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>Login Here</h2>
          <img
            onClick={() => setShowLogin(false)}
            // src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          {/* {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={handleSubmit}
            //   value={}
              type="text"
              placeholder="Your name"
              required
            />
          )} */}
          <input
            name="email"
            onChange={onsubmit}
            // value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            // onChange={onChangeHandler}
            // value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {/* {currState === "Sign Up" ? "Create account" : "Login"} */}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agreed to the terms of use & privacy policy.</p>
        </div>
        {/* {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )} */}
      </form>
      <Toaster />
    </div>
  );
};

export default LoginPopup;
