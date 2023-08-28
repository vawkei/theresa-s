import classes from "./orderDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { db } from "../../../firebase/Config";
import { doc, getDoc } from "firebase/firestore";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  var nairaSymbol = "\u20A6";
  const { id } = useParams();
  // console.log(id)
  const navigate = useNavigate();

  const reviewProductHandler = (id) => {
    navigate(`/order-detail/${id}`);
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
          id: docSnap.id,
          ...docSnap.data(),
        };
        console.log(obj);
        setOrder(obj);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className={classes.order}>
      {/* <h2>Order Detail</h2> */}
      {isLoading && <p style={{ marginLeft: "6rem" }}>Fetching Order...</p>}
      {order === "" ? (
        <p style={{ marginLeft: "6rem" }}>No Order Yet...</p>
      ) : (
        <Fragment>
          <Link to={"/orders"}>
            <Button className={classes.backBtn}> &larr; Back to Orders</Button>
          </Link>
          <h2> Order ID: {order.id}</h2>
          {order.cartItems.map((item) => {
            const { name, imageUrl, quantity, price, id } = item;
            //word of note: the id here is different from orderId
            return (
              <Card className={classes.cardClass} key={id}>
                <div className={classes.image}>
                  <img src={imageUrl} alt={name} style={{ width: "100px" }} />
                  {/* <div className={classes.name}>{ shortenText ({name},15) }</div> */}
                  <div className={classes.name}>{name}</div>
                </div>

                <div className={classes.right}>
                  <h2>
                    {nairaSymbol}
                    {price.toLocaleString()}
                  </h2>
                  <p>{`Qty: ${quantity}`}</p>
                  <div className={classes.action}>
                    <Button
                      className={classes.btn}
                      onClick={() => reviewProductHandler(id)}>
                      Review Product
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

export default OrderDetail;
