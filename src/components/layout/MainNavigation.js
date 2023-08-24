import classes from "./MainNavigation.module.css";
import {NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import DrawerToggleButton from "../ui/drawerToggleButton/DrawerToggleButton";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authActions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase/Config";
import InputErrorModal from "../ui/inputErrorModal/InputErrorModal";
import Notifier from "../ui/notifier/Notifier";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";


const MainNavigation = () => {
  const [showNav, setShowNav] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [notifier, setNotifier] = useState("");
  const [inputErrorModal, setInputErrorModal] = useState("");
  const cartTotalQty = useSelector((state)=>state.cart.cartTotalQty)



  const navLinkHandler = (navLinkData)=>{
    return navLinkData.isActive ? classes.active : ""
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  
  const toggleHandler = () => {
    setShowNav((prev) => !prev);
  };
  const hideNavHandler = () => {
    setShowNav(false);
  };

  const logo = (
    <div className={classes.logo}>
      <h1>
        <Link to={"/"}>Theresa's</Link>
      </h1>
    </div>
  );

  const cart = (
    <div className={classes.cart}>
      <NavLink to={"/cart"} className={navLinkHandler}>
        {" "}
        <p>Cart</p>
        <FaShoppingCart size={20} />
        <p>{cartTotalQty}</p>
      </NavLink>
    </div>
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          let phase1 = user.email; //vawkei@gmail.com
          let phase2 = phase1.split("@"); //['vawkei', 'gmail.com']
          let phase3 = phase2[0]; // vawkei
          let phase4 = phase3.charAt(0).toUpperCase() + phase3.slice(1); //Vawkei

          // let name = 'voke'
          // let name2 = name.slice(1)
          // console.log(name2)//oke
          //console.log(phase4)

          setDisplayName(phase4);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          authActions.SET_ACTIVE_USER({
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
            userEmail: user.email,
          })
        );
      } else {
        // User is signed out
        setDisplayName("");
        dispatch(authActions.CLEAR_ACTIVE_USER());
      }
    });
  }, [displayName]);

  let timeInterval = 3000;
  let notifierClearer;

  useEffect(() => {
    if (notifier) {
      notifierClearer = setInterval(function () {
        setNotifier("");
      }, timeInterval);
      return () => {
        clearInterval(notifierClearer);
      };
    }
  }, [notifier]);

  const LogOutUserHandler = () => {
    signOut(auth)
      .then(() => {
        setNotifier({
          title: "LogOut",
          message: "LogOut Successful",
        });
        //console.log('Logout successful')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        let x = errorMessage.split(":");
        let x2 = x[1];
        setInputErrorModal({
          title: "Console Error",
          message: x2,
          //this shows connection error when we want to Logout from the app. We get it from our console.
        });
      });
  };

  return (
    <div className={classes.header}>
      {inputErrorModal && (
        <InputErrorModal
          title={inputErrorModal.title}
          message={inputErrorModal.message}
        />
      )}
      {notifier && (
        <Notifier title={notifier.title} message={notifier.message} />
      )}

      <header>{logo}</header>

      <a href="">{displayName}</a>

      <nav
        className={
          showNav
            ? `${classes["show-navigation"]}`
            : `${classes["hide-navigation"]}`
        }>
        <div
          className={
            showNav
              ? `${classes["nav-backdrop"]} ${classes["show-nav-backdrop"]}`
              : ""
          }
          onClick={hideNavHandler}></div>

        <ul onClick={hideNavHandler}>
          
          <AdminOnlyLink>
            <li className={classes.admin}>
              <NavLink to={'/admin/home'} className={navLinkHandler}>Admin</NavLink>
            </li>
          </AdminOnlyLink>

          <li className={classes['shop-now']}>
              <NavLink to={'/shop-now'} className={navLinkHandler}>Shop Now</NavLink>
            </li>
          <li>
            <NavLink to={"/contact"} className={navLinkHandler}>Contact</NavLink>
          </li>

          {!isLoggedIn &&<li>
            <NavLink to={"/register"} className={navLinkHandler}>Register</NavLink>
          </li>}

          {isLoggedIn && (
            <li>
              <NavLink to={"/profile"} className={navLinkHandler}>Profile</NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink to={"/orders"} className={navLinkHandler}>Orders</NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/" onClick={LogOutUserHandler}>
                Logout
              </Link>
            </li>
          )}

          <span className={classes.spanCart}>{cart}</span>
        </ul>
      </nav>
      <div className={classes["mobile-icon"]}>
        {cart}
        <DrawerToggleButton toggleHandler={toggleHandler} />
      </div>
    </div>
  );
};

export default MainNavigation;
