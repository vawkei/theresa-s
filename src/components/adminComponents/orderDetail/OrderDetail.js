import classes from "./OrderDetail.module.css";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/Config";
import { doc, getDoc } from "firebase/firestore";
import Card from "../../ui/card/Card";
import OrderStatus from "../orderStatus/OrderStatus";


const OrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  var nairaSymbol = "\u20A6";

  const backToOrdersHandler = () => {
    navigate("/admin/orders");
  };


  useEffect(() => {
    getSingleOrder();
  }, []);

  const getSingleOrder = async () => {
    setIsLoading(true);

    try {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        //console.log(obj);
        setOrder(obj);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  console.log(order);
  return (
    <div style={{ width: "100%", maxWidth: "50rem", margin: "2rem auto" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          {order.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <>
              <div className={classes.lead}>
                <h2>Order Status</h2>
                <button onClick={backToOrdersHandler}>
                  &larr; Back to Orders
                </button>

                <h4>
                  OrderId: <b> {order.id}</b>
                </h4>
                <h4>
                  Total Order Amount:{" "}
                  <b>
                    {nairaSymbol}
                    {order.cartItemAmount.toLocaleString()}
                  </b>
                </h4>
              </div>

              {order.cartItems.map((item) => {
                const { name, imageUrl, quantity, price, id } = item;
                const total = quantity * price;
                //word of note: the id here is different from orderId
                return (
                  <Card className={classes.cardClass} key={id}>
                    <div className={classes.image}>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                      <div className={classes.name}>{name}</div>
                    </div>

                    <div className={classes.right}>
                      <h2>
                        {nairaSymbol}
                        {price.toLocaleString()}
                      </h2>
                      <p>{`Qty: ${quantity}`}</p>
                      <p>
                        <b>Total Price:</b>
                        {nairaSymbol}
                        {total.toLocaleString()}
                      </p>
                    </div>
                  </Card>
                );
              })}
                <OrderStatus order={order} id={id} />
            </>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default OrderDetail;
