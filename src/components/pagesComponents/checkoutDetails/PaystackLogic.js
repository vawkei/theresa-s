import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import PaystackPop from "@paystack/inline-js";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import CheckoutDetails from "./CheckoutDetails";

const PayStackLogic = () => {
  

  const userID = useSelector((state) => state.auth.userID);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);

  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();

  const dispatch = useDispatch();

  const saveOrderToFirestore = async (enteredData) => {
    const {
      enteredFirstName,
      enteredSurname,
      enteredPhoneNumber,
      enteredResidentialAddress,
      enteredTown,
      enteredState,
    } = enteredData;
    try {
      await addDoc(collection(db, "orders"), {
        userId: userID,
        orderedDate: date,
        orderedTime: time,
        userFirstName: enteredFirstName,
        userSurname: enteredSurname,
        userPhoneNo: enteredPhoneNumber,
        userEmail: userEmail,
        userAddress: enteredResidentialAddress,
        userTown: enteredTown,
        userState: enteredState,
        cartItems: cartItems,
        cartItemAmount: cartTotalAmnt,
        orderStatus: "orderPlaced...",
        createdAt: Timestamp.now().toDate(),
      });
      console.log("order saved");
    } catch (error) {
      console.log("Error saving order:", error.message);
    }
  };

  const paystackSubmitHandler = (enteredData) => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: cartTotalAmnt * 100,

      onSuccess(transaction) {
        alert(`Payment successful, Reference: ${transaction.reference}`);
        saveOrderToFirestore(enteredData);
        
        dispatch(cartActions.CLEAR_CART());
        console.log("Lisa Ann is still the hawtest");
      
      },
      onClose() {
        alert("Transfer failed");
      },
      onCancel() {
        alert("Transaction terminated");
      },
    });
  };

  return (
    <div>
      <CheckoutDetails onPayStackSubmitHandler={paystackSubmitHandler} />
    </div>
  );
};

export default PayStackLogic;

//FIRST CODE
// import { useSelector,useDispatch } from "react-redux";
// import { cartActions } from "../../../store";
// import PaystackPop from '@paystack/inline-js';
// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import { db } from "../../../firebase/Config";
// import CheckoutDetails from "./CheckoutDetails";

// const PayStackLogic = () => {

//     const firstName = useSelector((state)=>state.checkout.firstName);
//     console.log(firstName);
//     const surname = useSelector((state)=>state.checkout.surname);
//     const residentialAddress = useSelector((state)=>state.checkout.residentialAddress);
//     const town = useSelector((state)=>state.checkout.town);
//     const userState = useSelector((state)=>state.checkout.userState);
//     const phoneNumber= useSelector((state)=>state.checkout.phoneNumber);

//     const userID = useSelector((state)=>state.auth.userID);
//     const userEmail = useSelector((state)=>state.auth.userEmail);

//     const cartItems = useSelector((state)=>state.cart.cartItems);
//     const cartTotalAmnt = useSelector((state)=>state.cart.cartTotalAmnt);

//     const today = new Date();
//     const date = today.toDateString();
//     const time =today.toLocaleTimeString();

//     const dispatch = useDispatch();

//     const saveOrderToFirestore =async ()=>{
//         try{
//         await addDoc(collection(db,'orders'),{
//         userId:userID,
//         orderedDate:date,
//         orderedTime:time,
//         userFirstName:firstName,
//         userSurname:surname,
//         userPhoneNo:phoneNumber,
//         userEmail: userEmail,
//         userAddress:residentialAddress,
//         userTown:town,
//         userState:userState,
//         cartItems:cartItems,
//         cartItemAmount:cartTotalAmnt,
//         orderStatus: "orderPlaced...",
//         createdAt:Timestamp.now().toDate(),
//        })
//        console.log('order saved')
//     }catch(error){
//         console.log("Error saving order:" ,error.message)
//     };
//     };

//     const paystackSubmitHandler = ()=>{
//         const paystack = new PaystackPop();
//         paystack.newTransaction({
//             key:process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
//             email:userEmail,
//             amount:cartTotalAmnt *100,

//             onSuccess(transaction){
//                 alert(`Payment successful, Reference: ${transaction.reference}`);
//                 saveOrderToFirestore();
//                 dispatch(cartActions.CLEAR_CART());
//                 console.log('Lisa Ann is still the hawtest')
//             },
//             onClose(){
//                 alert('Transfer failed')
//             },
//             onCancel(){
//                 alert('Transaction terminated')
//             },
//         })

//     }

//     return (
//         <div>
//             <CheckoutDetails onPayStackSubmitHandler={paystackSubmitHandler} />
//         </div>
//      );
// }

// export default PayStackLogic;
