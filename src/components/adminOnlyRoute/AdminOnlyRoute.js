import classes from "./AdminOnlyRoute.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../ui/button/Button";

const AdminOnlyRoute = (props) => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.userEmail);

  const navigateHandler = () => {
    navigate("/");
  };

  const userPassword = process.env.REACT_APP_USER_PASSWORD;

  if (
    userEmail === process.env.REACT_APP_USER_EMAIL_ADDRESS &&
    userPassword === process.env.REACT_APP_USER_PASSWORD
  ) {
    return props.children;
  } else {
    return (
      <div className={classes.disclaimer}>
        {/* style={{
          margin: "10rem auto",
          padding: "2rem",
          borderRadius: "6px",
          backgroundColor: "green",
          textAlign: "center",
        }} */}
        <p>You are not allowed to view the Admin Section</p>
        <div className={classes.action}>
          <Button onClick={navigateHandler} className={classes.btn}>Click here to go back Home</Button>
        </div>
      </div>
    );
  }
};

export const AdminOnlyLink = (props) => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userPassword = process.env.REACT_APP_USER_PASSWORD;

  if (
    userEmail === process.env.REACT_APP_USER_EMAIL_ADDRESS &&
    userPassword === process.env.REACT_APP_USER_PASSWORD
  ) {
    return props.children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
