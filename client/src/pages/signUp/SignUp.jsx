import React, { useContext, useState } from "react";
import "./signUp.scss";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    console.log(username, email, password, "this is credentials");
    try {
      const res = await axios.post("/api/signUp", {
        username,
        email,
        password,
      });
      console.log(res.data, "this is fdata");
      Swal.fire(
        "Welcome !",
        "You can login with your credentials. Your account is being verified by the admin. Please wait for verification.",
        "success"
      ).then(() => {
        navigate("/login");
      });
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
            <h1>Inventory</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis eveniet quas recusandae iure amet nulla. Sint at
              quisquam voluptate aliquid illum consequatur facere libero officia
              suscipit, animi iusto iure nemo.
            </p>
            <p>Already have an account ?</p>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <span className="error">{error}</span>

            <input type="text" placeholder="Username" required minLength={3} />
            <input type="email" placeholder="Email" required />
            <input
              type="password"
              placeholder="Password"
              required
              minLength={8}
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
