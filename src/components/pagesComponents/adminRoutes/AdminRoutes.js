import classes from "./AdminRoutes.module.css";
import NavBar from "../../adminComponents/navBar/NavBar";
import AddProduct from "../../adminComponents/addProduct/AddProduct";
import Home from "../../adminComponents/home/Home";
import Orders from "../../adminComponents/orders/Orders";
import ViewProducts from "../../adminComponents/viewProducts/ViewProducts";
import EditProduct from '../../adminComponents/editProduct/EditProduct'
import { Routes, Route } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <div className={classes.routes}>
      <div className={classes.nav}>
        <NavBar />
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path={"/home"} element={<Home />} />
          <Route path={"/view-products"} element={<ViewProducts />} />
          <Route path={"/add-product"} element={<AddProduct />} />
          <Route path={"/orders"} element={<Orders />} />
          <Route path={"/edit-product/:id"} element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;

