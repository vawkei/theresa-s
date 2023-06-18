import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import Button from "../ui/button/Button";

const AdminOnlyRoute = (props) => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.userEmail);

  const navigateHandler = ()=>{
    navigate('/')
  };

  if (userEmail === "vawkei@gmail.com") {
    return props.children;
  } else {
    return(
      <div
      style={{
        margin: "6rem auto",
        padding: "2rem",
        borderRadius: "6px",
        backgroundColor: "green",
        textAlign: "center",
      }}>
      <p>You are not allowed to view the Admin Section</p>
      <button onClick={navigateHandler}>Click here to go back Home</button>
    </div>
    )
    
  }
};

export const AdminOnlyLink = (props)=>{
    const userEmail = useSelector((state) => state.auth.userEmail);

    if(userEmail === "vawkei@gmail.com"){
        return props.children
    }else{
        return null
    }
}

export default AdminOnlyRoute;
