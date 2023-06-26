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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
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
      </Routes>
    </Layout>
  );
}

export default App;
