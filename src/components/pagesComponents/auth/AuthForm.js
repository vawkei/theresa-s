import classes from "./AuthForm.module.css";
import Loader from "../../ui/loader/Loader";
import registerImage from "../../../assets/veeshopregister.jpg";
import signInImage from "../../../assets/veeshopsignin.jpg";
import { useState, useEffect } from "react";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../../firebase/Config";
import InputErrorModal from "../../ui/inputErrorModal/InputErrorModal";
import { useNavigate } from "react-router-dom";
import Notifier from "../../ui/notifier/Notifier";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

import { useSelector } from "react-redux";


const AuthForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmEnteredPassword, setConfirmEnteredPassword] = useState("");
  const [notifier, setNotifier] = useState("");
  const [inputErrorModal, setInputErrorModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [toRegister, setToRegister] = useState(true);
  const navigate = useNavigate();
  const storedUrl =useSelector(state=>state.cart.prevUrl);

  


  const authToggle = () => {
    setToRegister((prevState) => !prevState);
  };
  function passwordTypeToggle() {
    setShowPassword((prevState) => !prevState);
  }

  const enteredEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const enteredPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const confirmEnteredPasswordChangeHandler = (e) => {
    setConfirmEnteredPassword(e.target.value);
  };

  const inputErrorModalHandler = () => {
    setInputErrorModal(null);
  };

  let timeDuration = 5000;
  let notifierClearer;

  useEffect(() => {
    if (notifier) {
      notifierClearer = setTimeout(function () {
        setNotifier("");
      }, timeDuration);
      return () => {
        clearInterval(notifierClearer);
      };
    }
  }, [notifier]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //CODE TO REGISTER STARTS HERE
    if (toRegister) {
      if (
        !enteredEmail ||
        enteredEmail.length === 0 ||
        !enteredPassword ||
        enteredPassword.length === 0
      ) {
        setInputErrorModal({
          title: "Invalid Input",
          message: "Inputs must not be EMPTY",
        });
        setIsLoading(false);
        return;
      }
      if (enteredPassword !== confirmEnteredPassword) {
        setInputErrorModal({
          title: "Invalid Password",
          message: "Passwords do not Match,Try again!",
        });
        setIsLoading(false);
        return;
      }

      // const auth = getAuth() already initialized in firebase Config.js;
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setNotifier({
            title: "Success",
            message: "Registration Successful, You are Now LoggedIn",
          });
          setIsLoading(false);
          setEnteredEmail("");
          setEnteredPassword("");
          setConfirmEnteredPassword("");
        })
        .catch((error) => {
          const errorMessage = error.message;
          //console.log(errorMessage);
          let x = errorMessage.split(":");
          let x2 = x[1];
          setInputErrorModal({
            title: "Console Error",
            message: x2,
            //this shows connection error and weak password xracters from the console.Instead of just console.logging it.
          });
          setIsLoading(false);
        });
    } else {
      //CODE TO SIGNIN STARTS HERE
      if (
        !enteredEmail ||
        enteredEmail.length === 0 ||
        !enteredPassword ||
        enteredPassword.length === 0
      ) {
        setInputErrorModal({
          title: "Invalid Input",
          message: "Inputs must not be EMPTY",
        });
        setIsLoading(false);
        return;
      }

      // const auth = getAuth();
      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          
          if(storedUrl.includes('cart')){
            navigate('/cart')
          }else{
            navigate("/", { replace: true });
          };        
          
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          let x = errorMessage.split(":");
          let x2 = x[1];
          setInputErrorModal({
            title: "Console Error",
            message: x2,
            //this shows connection error and wrong Password from the console.log Instead of just console.logging it.
          });
          setIsLoading(false);
        });
    }
  };

  //SIGNIN WITH GOOGLE LOGIC:

  const provider = new GoogleAuthProvider();

  const signInWithGoogleHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setIsLoading(false);
        navigate('/',{replace:true})
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {notifier && (
        <Notifier title={notifier.title} message={notifier.message} />
      )}
      {isLoading && <Loader />}
      {inputErrorModal && (
        <InputErrorModal
          title={inputErrorModal.title}
          message={inputErrorModal.message}
          onConfirm={inputErrorModalHandler}
        />
      )}

      <h1>{toRegister ? "Register" : "SignIn"}</h1>
      <section className={classes.auth}>
        {toRegister ? (
          <div className={classes.image}>
            <img src={registerImage} alt="" width={400} height={300} />
          </div>
        ) : (
          <div className={classes.image}>
            <img src={signInImage} alt="" width={400} height={300} />
          </div>
        )}

        <div className={classes.cardDiv}>
          <Card className={classes.cardClass}>
            <form action="" className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="">Your Email</label>
                <input
                  type="email"
                  value={enteredEmail}
                  onChange={enteredEmailChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="">Your Password</label>

                {toRegister ? (
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={enteredPasswordChangeHandler}
                  />
                ) : (
                  <input
                    type={showPassword ? "text" : "password"}
                    value={enteredPassword}
                    onChange={enteredPasswordChangeHandler}
                  />
                )}

                {toRegister ? null : showPassword ? (
                  <AiOutlineEye
                    size={24}
                    onClick={passwordTypeToggle}
                    className={classes.passwordToggle}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={24}
                    onClick={passwordTypeToggle}
                    className={classes.passwordToggle}
                  />
                )}
              </div>

              {toRegister ? (
                <div className={classes.control}>
                  <label htmlFor="">Confirm Your Password</label>
                  <input
                    type="password"
                    value={confirmEnteredPassword}
                    onChange={confirmEnteredPasswordChangeHandler}
                  />
                </div>
              ) : null}

              <div className={classes.action}>
                {toRegister ? (
                  <Button>Register</Button>
                ) : (
                  <Button>SignIn</Button>
                )}
              </div>
              {!toRegister && (
                <button
                  className={classes.google}
                  onClick={signInWithGoogleHandler}>
                  <FcGoogle size={18} /> Login with <span>Google</span>{" "}
                </button>
              )}

              <div>
                <p onClick={authToggle} className={classes.toggle}>
                  {toRegister
                    ? "Login with existing account"
                    : "Create new account"}
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
