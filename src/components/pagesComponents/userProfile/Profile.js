import classes from "./Profile.module.css";
import { useState,useEffect } from "react";
import InputErrorModal from "../../ui/inputErrorModal/InputErrorModal";
import Button from "../../ui/button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../../../firebase/Config";
import { useSelector } from "react-redux";
import Notifier  from "../../ui/notifier/Notifier";

const Profile = () => {
  const [enterNewPassword, setEnterNewPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const [notifier, setNotifier] = useState("");
  //const auth = getAuth();

  const userEmail = useSelector((state) => state.auth.userEmail);

  const enterNewPasswordInputChangeHandler = (e) => {
    setEnterNewPassword(e.target.value);
  };

  const inputErrorHandler = () => {
    setInputError(null);
  };

  const [showPassword, setShowPassword] = useState(false);
  function showPasswordHandler() {
    setShowPassword((prevState) => !prevState);
  };


  let timeDuration = 5000;
  let notifierClearer;


  useEffect(()=>{
    if(notifier){
      notifierClearer = setTimeout(function(){
        setNotifier("");
      },timeDuration);
      return ()=>{
        clearTimeout(notifierClearer)
      };
    };
  },[notifier])


  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (enterNewPassword.trim().length === 0 || !enterNewPassword) {
      setInputError({
        title: "Invalid Input",
        message: "Input shouldn't be EMPTY",
      });
      return;
    }
    if (enterNewPassword.trim().length < 6) {
      setInputError({
        title: "Invalid Input",
        message: "Characters should be 6 or more",
      });
      return;
    }
    //console.log({ yourNewPassword: enterNewPassword });
    

    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        
        console.log("Password reset email sent!");
        setNotifier({
          title: "Success",
          message: "Password reset email sent!",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log("Something went wrong");
        setNotifier({
          title:"Sending Failed",
          message:errorMessage
        });
      });

    setEnterNewPassword("");
  };

  return (
    <div className={classes.resetPassword}>

      {notifier && <Notifier title={notifier.title} message={notifier.message} />}

      {inputError && (
        <InputErrorModal
          title={inputError.title}
          message={inputError.message}
          onConfirm={inputErrorHandler}
        />
      )}
      <h2>Reset Password</h2>
      
      <form action="" onSubmit={onSubmitHandler}>
        <h3>Enter new password</h3>
        <div className={classes.control}>
          <input
            type={showPassword ? "text" : "password"}
            value={enterNewPassword}
            onChange={enterNewPasswordInputChangeHandler}
          />

          {!showPassword && (
            <AiFillEyeInvisible
              size={22}
              onClick={showPasswordHandler}
              className={classes.icon}
            />
          )}

          {showPassword && (
            <AiFillEye
              size={22}
              onClick={showPasswordHandler}
              className={classes.icon}
            />
          )}
        </div>
        <div className={classes.action}>
          <Button className={classes.btn}>Change password</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
