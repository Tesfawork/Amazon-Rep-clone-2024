/** @format */
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import style from "./Auth/module.css";
import { auth } from "../../Utility/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider.jsx";
import { BeatLoader } from "react-spinners";
import { Type } from "../../Utility/action.type.jsx";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === "signin") {
      // Fixed comparison to "signin"
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((useInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: useInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message); // Display the actual error message
          setLoading({ ...loading, signIn: false });
        });
    } else {
      // For sign up
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((useInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: useInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={style.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://en.wikichip.org/w/images/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      {/* form */}
      <div className={style.login_container}>
        <h1>Sign-In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={style.login_signInButton}
          >
            {loading.signIn ? <BeatLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in, you agree to our Terms of Service and Privacy Policy.
          You consent to the collection and use of your data as outlined in our
          policies. You confirm that all information provided is accurate to the
          best of your knowledge.
        </p>
        {/* create account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={style.login_registerButton}
        >
          {loading.signUp ? (
            <BeatLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
