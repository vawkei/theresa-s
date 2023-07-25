import Button from "../../ui/button/Button";
import classes from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/orders");
  };

  return (
    <div
      className={classes.checkout}>
        
      <div className={classes.content}>
        <h1>Checkout Successful</h1>
        <p>Thanks for your patronage</p>
      </div>
      <div className={classes.action}>
        <Button className={classes.btn} onClick={navigateHandler}>
          View OrderStatus
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
