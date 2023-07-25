import classes from "./OrderStatus.module.css";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/Config";

const OrderStatus = (props) => {

    const [status,setStatus] = useState("");
     const [isLoading,setIsLoading ] = useState(false);  
    
    const statusChangeHandler = (e)=>{
        setStatus(e.target.value)
      };

      const editOrderStatus = (e,id)=>{
        e.preventDefault();
        setIsLoading(true);

        try{
            setDoc(doc(db,"orders",id),{
                
                createdAt:props.order.createdAt,
                orderStatus: status,
                orderedDate: props.order.orderedDate,
                orderedTime: props.order.orderedTime,
                transactionRef: props.order.transactionRef,
                userAddress:props.order.userAddress,
                userEmail:props.order.userEmail,
                userFirstName:props.order.userFirstName,
                userId:props.order.userId,
                userPhoneNo:props.order.userPhoneNo,
                userState:props.order.userState,
                userSurname:props.order.userSurname,
                userTown:props.order.userTown,
                cartItemAmount:props.order.cartItemAmount,
                cartItems:props.order.cartItems
            });
            setIsLoading(false);
            console.log("OrderStatus Updated...")
        }catch(error){
            console.log(error)
        };
      }

    return ( 
        <div>
            {isLoading && <p>Sending...</p>}
            <div className={classes["status-card"]}>
                <Card>
                  <h2>Update Status</h2>
                  <form action="" onSubmit={(e)=>editOrderStatus(e,props.id)}>
                    
                    <select value={status} onChange={statusChangeHandler}>
                      <option disabled value="">Choose One...</option>
                      <option value="Order Placed...">Order Placed...</option>
                      <option value="Processing...">Processing</option>
                      <option value="Delivered...">Delivered</option>
                    </select>
                      <Button className={classes.btn}>Update Status</Button>
                    
                  </form>
                </Card>
              </div>
        </div>
     );
}
 
export default OrderStatus;