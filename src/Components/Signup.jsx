import React, { useState } from "react";

import "../Styles/login.css";
import GoogleButton from "react-google-button";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

import { googleAuthProvider, auth } from "../Components/firebase";
import { useNavigate, Link } from "react-router-dom";

import Swal from "sweetalert2";

const Signup = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signgoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);

      Swal.fire({
        icon: "success",
        title: "Successfully Login!",
        text: "You are authorized !",
      }).then(() => {
        navigate("/Home");
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const signuphandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userdata) => {
        console.log(userdata);
        Swal.fire({
          icon: "success",
          title: "Created !",
          text: "Account Created Successfully!",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        let { message } = err;
        console.log(message);
        Swal.fire({
          icon: "error",
          title: `${message}`,
          text: "You are not authorized !",
        });
      });
  };

  return (
    <>
      <div>
        <div className="container bg-body-secondary px-5 pb-3">
          <h1 className=" display-5 fw-bold mb-5 pt-3 text-capitalize text-center">
            Sign up Here
          </h1>
          <form onSubmit={signuphandler}>
            <div className="mb-3">
              <div className="form-floating">
                <input
                  id="text1"
                  type="text"
                  className=" form-control "
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="text1" className=" opacity-75">
                  Enter Email
                </label>
              </div>
              <div id="emailHelp pwd" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <div className="form-floating">
                <input
                  id="pwd1"
                  type="password"
                  className=" form-control "
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="pwd1" className=" opacity-75">
                  Enter Password
                </label>
              </div>
            </div>

            
            <button type="submit" className="btn w-100 btn-primary">
              Create Account
            </button>
            

            <p className="my-4 social-text text-center">Or signup with : </p>

            <GoogleButton onClick={signgoogle} className=" mx-auto" />

            <div className="my-4 signup text-center">
              <p>
                Already have an account? <Link to={"/"}>login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
