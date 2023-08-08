import React, { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await login({
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      console.log(error);

      setError(error.response.data);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="image-container">
          {/* <img
            src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' // Replace with your image URL
            alt="Background"
          /> */}
          <div className="content">
            <h1>Welcome Back !</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis eveniet quas recusandae iure amet nulla. Sint at
              quisquam voluptate aliquid illum consequatur facere libero officia
              suscipit, animi iusto iure nemo.
            </p>
            <p>Don't have an account ?</p>
            <Link to="/signUp">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <span className="error">{error}</span>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
