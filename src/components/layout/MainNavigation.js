import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Search from "../ui/search/Search";
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
  // const [search, setSearch] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [notifier, setNotifier] = useState("");
  const [inputErrorModal, setInputErrorModal] = useState("");
  const cartTotalQty = useSelector((state)=>state.cart.cartTotalQty)


  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const searchChangeHandler = (e) => {
  //   setSearch(e.target.value);
  // };
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
      <Link to={"/cart"}>
        {" "}
        <p>Cart</p>
        <FaShoppingCart size={20} />
        <p>{cartTotalQty}</p>
      </Link>
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
      {/* <span className={classes.search}>
        <Search
          value={search}
          onChange={searchChangeHandler}
          placeholder={"Search products, brands and categories"}
        />
      </span> */}

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
              <Link to={'/admin/home'}>Admin</Link>
            </li>
          </AdminOnlyLink>

          <li className={classes['shop-now']}>
              <Link to={'/shop-now'}>Shop Now</Link>
            </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>

          <li>
            <Link to={"/register"}>Register</Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to={"/orders"}>Orders</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link href="/" onClick={LogOutUserHandler}>
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
