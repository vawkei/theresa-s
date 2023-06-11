import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Search from "../ui/Search";
import { useState } from "react";
import DrawerToggleButton from "../ui/DrawerToggleButton";

const MainNavigation = () => {
  const [search, setSearch] = useState("");
  const [showNav, setShowNav] = useState(false);

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
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
        <p>0</p>
      </Link>
    </div>
  );

  return (
    <div className={classes.header}>
      <header>{logo}</header>
      <span className={classes.search}>
        <Search
          value={search}
          onChange={searchChangeHandler}
          placeholder={"Search products, brands and categories"}
        />
      </span>

      <a href="">Hi Lipps!</a>

      <nav
        className={
          showNav?`${classes['show-navigation']}` : `${classes['hide-navigation']}`
        }>
  
        <div
          className={
            showNav
              ? `${classes["nav-backdrop"]} ${classes["show-nav-backdrop"]}`
              : ''
          }
          onClick={hideNavHandler}></div>

        <ul onClick={hideNavHandler}>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link href={"/orders"}>Orders</Link>
          </li>
          <li>
            <a href="">Logout</a>
          </li>
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
