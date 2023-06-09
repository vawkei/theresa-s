import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Search from "../ui/Search";
import { useState } from "react";

const MainNavigation = () => {

  const [search,setSearch] = useState('');

  const searchChangeHandler = (e)=>{
    setSearch(e.target.value)
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
      <Link to={'/cart'}>
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
        
        <Search value={search} onChange={searchChangeHandler} placeholder={"Search products, brands and categories"} />
       
        <a href="">Hi Lipps!</a>
      <nav>
        <ul>
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
        </ul>
        {cart}
      </nav>
    </div>
  );
};

export default MainNavigation;
