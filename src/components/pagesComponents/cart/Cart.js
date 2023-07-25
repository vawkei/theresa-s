import classes from "./Cart.module.css";
import { Fragment } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  var nairaSymbol = "\u20A6";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartActions.CART_TOTALQUANTITY());
    dispatch(cartActions.CART_TOTALAMOUNT());
    // In this case, the actions don't require any additional data from the JSX or component state. If they did require data, you would pass it as an argument within the parentheses when calling the action creator function, like dispatch(cartAction.someAction(payload)). But in this particular code snippet, it seems that the necessary data for calculations is already available within the Redux store, so the actions don't require any additional parameters.
  }, []);

  function increaseProduct(product) {
    dispatch(cartActions.ADDPRODUCT_TO_STORE(product));
  }
  function decreaseProduct(product) {
    dispatch(cartActions.DECREASEPRODUCT_FROM_CART(product));
  }

  const removeProductHandler = (product) => {
    dispatch(cartActions.REMOVEPRODUCT_FROM_CART(product));
  };
  function clearCart() {
    dispatch(cartActions.CLEAR_CART());
  }

  const url = window.location.href;

  const checkoutHandler = () => {
    if (isLoggedIn) {
      navigate("/checkout-detail");
    } else {
      dispatch(cartActions.SAVE_URL(url));
      navigate("/register");
    }
  };


function shortenText(text,n){
  if(text.length >15){
    const shortenedText = text.substring(0,15).concat("...");
    return shortenedText;
  };
  return text
};
 // const shortenText = (text, n) => {
  //   if (text.length > 15) {
  //     const shortenedText = text.substring(0, 15).concat("...");
  //     return shortenedText;
  //   }
  //   return text;
  // };


  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <p>Cart is Freaken Empty</p>
      ) : (
        <div className={classes.container}>
          <p>
            <b>{cartItems.length}</b> item(s) in cart.
          </p>
          {cartItems.map((product) => {
            return (
              <Card key={product.id} className={classes.product}>
                
                  <div className={classes.left}>
                    <div className={classes.image}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "10rem" }}
                      />
                    </div>
                    <div className={classes.content}>
                      <p>{shortenText(product.name,15)}</p>
                      <p>
                        <b>Price: </b> {nairaSymbol}
                        {product.price.toLocaleString()}
                      </p>

                      <p>
                        <b>Total: </b>
                        {nairaSymbol}
                        {(product.price * product.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Card className={classes.right}>
                    <div>
                      <RiDeleteBin2Line
                        size={25}
                        color="red"
                        onClick={() => removeProductHandler(product)}
                      />
                    </div>

                    <div className={classes.counter}>
                      <Button
                        className={classes.btn}
                        onClick={() => decreaseProduct(product)}>
                        -
                      </Button>
                      <p>{product.quantity}</p>
                      <Button
                        className={classes.btn}
                        onClick={() => increaseProduct(product)}>
                        +
                      </Button>
                    </div>
                  </Card>
                </Card>
              
            );
          })}
          <>
            {cartItems.length > 0 ? (
              <div className={classes["clearcart-checkout"]}>
                <Card className={classes.checkoutSummary}>
                  <h2>Cart Summary</h2>
                  <hr />
                  <div className={classes.subtotal}>
                    <h5>Subtotal:</h5>
                    <p>
                      <b>
                        {nairaSymbol}
                        {cartTotalAmnt.toLocaleString()}
                      </b>
                    </p>
                  </div>

                  <p>Delivery fees not included yet.</p>
                  <div className={classes.action}>
                    <Button onClick={clearCart} className={classes.btn1}>
                      Clear Cart
                    </Button>
                    <Button className={classes.btn2} onClick={checkoutHandler}>
                      Checkout ({nairaSymbol}
                      {cartTotalAmnt.toLocaleString()})
                    </Button>
                  </div>
                </Card>
              </div>
            ) : null}
          </>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
