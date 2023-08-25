import { Fragment, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import { useDispatch, useSelector } from "react-redux";
import { ordersAction } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  var nairaSymbol = "\u20A6";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state) => state.auth.userID);

  const orderDetailsHandler = (id) => {
    navigate(`/orders/${id}`);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = orders.filter((x) => x.userId === userID);
  //console.log(filteredOrders)

  //Getting our Orders from Firebase:

  const getOrders = async () => {
    setIsLoading(true);

    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShot) => {
        // console.log(snapShot);
        // console.log(snapShot.docs);
        const allOrders = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(allOrders);
        dispatch(
          ordersAction.ADDORDERS_TO_STORE({
            orders: allOrders.map((order) => ({
              ...order,
              createdAt: new Date(
                order.createdAt.seconds * 1000
              ).toDateString(),
              editedAt: new Date(order.createdAt.seconds * 1000).toDateString(),
            })),
          })
        );
        //console.log(allOrders);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.table}>
      <Link to={"/"}>
        <Button className={classes.btn}> &larr; Back home</Button>
      </Link>
      <h2>Your Order History</h2>
      {isLoading ? (
        <p style={{ marginLeft: "6rem" }}>Fetching Orders...</p>
      ) : (
        <>
          {/* {orders.length === 0 ? ( */}
          {filteredOrders.length === 0 ? (
            <p>You have no Orders</p>
          ) : (
            <Fragment>
              <div className={classes.lead}>
                <p>
                  {" "}
                  {/* <b> {orders.length}</b> orders found{" "} */}
                  <b> {filteredOrders.length}</b> orders found{" "}
                </p>
                <p>Click on an order to see the order in Detail</p>
                <p>
                  <b>
                    Also, don't forget to leave a Review by hitting the{" "}
                    <span>Review Button</span>
                  </b>
                </p>
              </div>

              <br />
              <table id="table">
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Order Date</th>
                    <th>orderId</th>
                    <th>Reference</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {orders.map((order, index) => { */}
                  {filteredOrders.map((order, index) => {
                    // const {date,orderid,orderAmount,orderStatus} =order;
                    return (
                      <tr
                        key={order.id}
                        onClick={() => orderDetailsHandler(order.id)}>
                        <td>{index + 1}</td>
                        <td>{`${order.orderedDate} at${order.orderedTime} `}</td>
                        <td>{order.id}</td>
                        <td>{order.transactionRef}</td>
                        <td>
                          {nairaSymbol}
                          {order.cartItemAmount.toLocaleString()}
                        </td>
                        <td>{order.orderStatus}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Fragment>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersHistory;
