import "./Orders.css";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/Config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    getOrders();
  }, []);


  const orderStatusHandler =(id)=>{
    navigate(`/admin/orders/${id}`)
  }

  const getOrders = () => {
    setIsLoading(true);

    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShot) => {
        //console.log(snapShot);
        const allOrders = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(allOrders);
        //console.log(allOrders);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

    //console.log(orders)
  return (
    <div className="table">
      <h2>Total Orders</h2>
      {isLoading ? (
        <p>Fetching Orders...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p>No Order Found in the Database</p>
          ) : (
            <table className="table-table">
              <thead className="table-thead">
                <tr className="table-tr">
                  <th>s/n</th>
                  <th>Date</th>
                  <th>User ID</th>
                  <th>F_Name</th>
                  <th>S_Name</th>
                  <th>OrderID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {orders.map((order, index) => {
                  const {orderedDate, cartItemAmount,userId, userFirstName,userSurname, orderStatus } = order;
                  return (
                    <tr key={order.id} onClick={()=>orderStatusHandler(order.id)}>
                      <td className="table-td">{index + 1}</td>
                      <td>{orderedDate}</td>
                      <td>{userId}</td>
                      <td>{userFirstName}</td>
                      <td>{userSurname}</td>
                      <td>{order.id}</td>
                      <td>{cartItemAmount}</td>
                      <td>{orderStatus}</td>
                    </tr>
                  );
                })} 
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
