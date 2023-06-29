import classes from "./Cart.module.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  var nairaSymbol = "\u20A6";

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(()=>{
    dispatch(cartActions.CART_TOTALQUANTITY());
    dispatch(cartActions.CART_TOTALAMOUNT());
    // In this case, the actions don't require any additional data from the JSX or component state. If they did require data, you would pass it as an argument within the parentheses when calling the action creator function, like dispatch(cartAction.someAction(payload)). But in this particular code snippet, it seems that the necessary data for calculations is already available within the Redux store, so the actions don't require any additional parameters.
  },[])

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
  };


  const url = window.location.href

  const checkoutHandler=()=>{
    if(isLoggedIn){
      navigate('/checkout-detail')
    }else{
      dispatch(cartActions.SAVE_URL(url))
      navigate('/register')
    }
  }

  return (
    <div className={classes["table-container"]}>
      {cartItems.length === 0 ? (
        <p>Cart is Freaken Empty</p>
      ) : (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "6rem" }}
                      />
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td>{product.price.toLocaleString()}</td>
                  <td>
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
                  </td>
                  <td>
                    {nairaSymbol}
                    {(product.price * product.quantity).toLocaleString()}
                  </td>
                  <td>
                    <RiDeleteBin2Line
                      size={25}
                      color="red"
                      onClick={() => removeProductHandler(product)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 ? (
        <div className={classes["clearcart-checkout"]}>
          <Button onClick={clearCart} className={classes.btn}>
            Clear Cart
          </Button>

          <Card className={classes.checkoutSummary}>
            <h2>Cart Summary</h2>
            <hr />
            <div className={classes.subtotal}>
              <h5>Subtotal:</h5>
              <p>
                <b> {nairaSymbol}
                {cartTotalAmnt.toLocaleString()}</b>
              </p>
            </div>

            <p>Delivery fees not included yet.</p>
            <Button className={classes.btn} onClick={checkoutHandler}>
              Checkout ({nairaSymbol}
              {cartTotalAmnt.toLocaleString()})
            </Button>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
