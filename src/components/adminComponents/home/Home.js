import classes from "./Home.module.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersAction } from "../../../store";
import TopCards from "./TopCards";
const Home = () => {
  const [products, setProducts] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState("");

  const dispatch = useDispatch();
  const totalOrderAmount = useSelector(
    (state) => state.orders.totalOrderAmount
  );
  const dailyOrderAmount = useSelector(
    (state) => state.orders.dailyOrderAmount
  );

  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShot) => {
        //console.log(snapShot)
        const allProducts = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        setIsLoading(false);
        //console.log(allProducts.length)
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShot) => {
        //console.log(snapShot)
        const allOrders = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(allOrders);
        //console.log(allProducts.length)
        dispatch(
          ordersAction.CALCULATE_TOTAL_ORDER_AMOUNT({
            orders: allOrders.map((order) => ({
              ...order,
              createdAt: new Date(
                order.createdAt.seconds * 1000
              ).toDateString(),
            })),
          })
        );
        dispatch(
          ordersAction.CALCULATE_DAILY_ORDER_AMOUNT({
            orders: allOrders.map((order) => ({
              ...order,
              createdAt: new Date(
                order.createdAt.seconds * 1000
              ).toDateString(),
            })),
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  


  return (
    <div>
      <h2>Admin HomePage Dashboard</h2>
      {isLoading && <p>Loading...</p>}
      <TopCards
        products={products}
        orders={orders}
        totalOrderAmount={totalOrderAmount}
        dailyOrderAmount={dailyOrderAmount}
      />
    </div>
  );
};

export default Home;
