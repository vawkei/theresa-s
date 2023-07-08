import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import AdminPage from "./pages/AdminPage";
import ShopNowPage from "./pages/ShopNowPage";
import ProductDetail from "./components/pagesComponents/productDetail/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutDetailsPage from "./pages/CheckoutDetailsPage";

 import CheckoutPage from "./pages/CheckoutPage";
import OrderDetail from "./components/pagesComponents/orderDetail/orderDetail";
import ReviewProduct from "./components/pagesComponents/review-product/ReviewProduct";

import { useSelector } from "react-redux";



function App() {

  const isLoggedIn  = useSelector(state=>state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        {isLoggedIn &&<Route path="/orders" element={<OrdersPage />} />}
        {isLoggedIn &&<Route path="/orders/:id/" element={<OrderDetail />} />}
        {isLoggedIn &&<Route path="/order-detail/:id" element={<ReviewProduct />} />}
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <AdminPage />
            </AdminOnlyRoute>
          }
        />
        {/* <Route path="/shop-now/*" element={<ShopNowPage />} /> */}
        <Route path="/shop-now" element={<ShopNowPage />} />
        <Route path="/shop-now/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
         {isLoggedIn&&<Route path="/checkout-detail" element={<CheckoutDetailsPage />} />}
         {isLoggedIn &&<Route path="/checkout" element={<CheckoutPage />} /> }
      </Routes>
    </Layout>
  );
}

export default App;
