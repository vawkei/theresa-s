import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { GrOverview } from "react-icons/gr";


const NavBar = () => {
  
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div className={classes.navbar}>
      <div className={classes.user}>
        <h3>Hello {userName}</h3>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to={"/admin/home"}>
              <FaHome size={30} />
            </Link>
          </li>
          <li>
            <Link to={"/admin/view-products"}>
              <GrOverview size={30} />
            </Link>
          </li>
          <li>
            <Link to={"/admin/add-product"}>
              <IoIosAdd size={30} />
            </Link>
          </li>
          <li>
            <Link to={"/admin/orders"}>
              <TbFileInvoice size={30} />
            </Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

// import { Link } from 'react-router-dom';
// import classes from './NavBar.module.css';
// import { useSelector } from 'react-redux';

// const NavBar = () => {

//     const userName = useSelector((state)=>state.auth.userName);

//     return (
//         <div className={classes.navbar}>
//             <div className={classes.user}>
//                 <h2>{userName}</h2>
//             </div>
//             <nav className={classes.nav}>
//                 <ul>
//                     <li><Link to={'/admin/home'}>Home</Link></li>
//                     <li><Link to={'/admin/view-products'}>View Products</Link></li>
//                     <li><Link to={'/admin/add-product'}>Add Product</Link></li>
//                     <li><Link to={'/admin/orders'}>Orders</Link></li>
//                 </ul>
//             </nav>
//         </div>
//      );
// }

// export default NavBar;
