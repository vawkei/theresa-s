//0RIGINAL
//USED FOR THE TEST MODE OF PAYSTACK
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import PaystackPop from "@paystack/inline-js";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import CheckoutDetails from "./CheckoutDetails";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const PayStackLogic = () => {
  
  const userID = useSelector((state) => state.auth.userID);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);



  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const saveOrderToFirestore = async (enteredData,transaction) => {
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
        transactionRef:transaction,
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
      reference: "TRANSREF"+Math.floor((Math.random()*1000000000000000)+1),

      onSuccess(transaction) {
        alert(`Payment successful, Reference: ${transaction.reference}`);
        saveOrderToFirestore(enteredData,transaction.reference);
        
        dispatch(cartActions.CLEAR_CART());
        console.log("Lisa Ann is still the hawtest");
        navigate("/checkout", { replace: true });
      },
      onClose() {
        alert("Transfer failed");
        navigate('/cart')
      },
      onCancel() {
        alert("Transaction terminated");
        navigate('/cart')
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





//U$£D THIS 4 PAYSTACK LIVE MODE, issue with it is that there are only two banks in the paystack "pay with bank" mode as at the time of coding this:


// import { useSelector, useDispatch } from "react-redux";
// import { cartActions } from "../../../store";
// import PaystackPop from "@paystack/inline-js";
// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import { db } from "../../../firebase/Config";
// import CheckoutDetails from "./CheckoutDetails";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";


// const PayStackLogic = () => {
  
//   const userID = useSelector((state) => state.auth.userID);
//   const userEmail = useSelector((state) => state.auth.userEmail);

//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmnt);



//   const today = new Date();
//   const date = today.toDateString();
//   const time = today.toLocaleTimeString();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const saveOrderToFirestore = async (enteredData,transaction) => {
//     const {
//       enteredFirstName,
//       enteredSurname,
//       enteredPhoneNumber,
//       enteredResidentialAddress,
//       enteredTown,
//       enteredState,
//     } = enteredData;
//     try {
//       await addDoc(collection(db, "orders"), {
//         userId: userID,
//         orderedDate: date,
//         orderedTime: time,
//         userFirstName: enteredFirstName,
//         userSurname: enteredSurname,
//         userPhoneNo: enteredPhoneNumber,
//         userEmail: userEmail,
//         userAddress: enteredResidentialAddress,
//         userTown: enteredTown,
//         userState: enteredState,
//         cartItems: cartItems,
//         transactionRef:transaction,
//         cartItemAmount: cartTotalAmnt,
//         orderStatus: "orderPlaced...",
//         createdAt: Timestamp.now().toDate(),
//       });
//       console.log("order saved");
//     } catch (error) {
//       console.log("Error saving order:", error.message);
//     }
//   };



//   const [supportedBanks, setSupportedBanks] = useState([]);


//   const getSupportedBanks = async () => {
//     try {
//       const url = "https://api.paystack.co/bank";
//       const secretKey = process.env.REACT_APP_LIVE_SECRET_KEY
//       const authorization = "Bearer " + secretKey;

//        const filteredUrl = `${url}?pay_with_bank=true`;


//       const response = await fetch(filteredUrl, {
//         headers: {
//           Authorization: authorization,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch supported banks");
//       }

//       const data = await response.json();
//       if (data.data) {
//         console.log(supportedBanks);
//         return data.data;
//       } else {
//         throw new Error("Invalid response from server");
//       }
//     } catch (error) {
//       console.error("Error fetching supported banks:", error.message);
//       return [];
//     }
//   };

//   // Function to fetch supported banks and store them in state
//   const fetchSupportedBanks = async () => {
//     try {
//       const banks = await getSupportedBanks();
//       setSupportedBanks(banks);
//     } catch (error) {
//       console.error("Error fetching supported banks:", error.message);
//       setSupportedBanks([]);
//     }
//   };

  
//   useEffect(() => {
//     fetchSupportedBanks(); // Fetch supported banks on component mount
//   }, [])
  

//   const paystackSubmitHandler = async (enteredData) => {
//     try {
//       // Fetch the list of supported banks
//       const supportedBanks = await getSupportedBanks();
//       const bankCodes = supportedBanks.map((bank) => bank.code);
  
//       const paystack = new PaystackPop();
//       paystack.newTransaction({
//         key: process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY,
//         email: userEmail,
//         amount: cartTotalAmnt * 100,
//         reference: "TRANSREF" + Math.floor(Math.random() * 1000000000000000 + 1),
//         banks: bankCodes, // Pass the list of supported bank codes to Paystack
  
//         onSuccess(transaction) {
//           alert(`Payment successful, Reference: ${transaction.reference}`);
//           saveOrderToFirestore(enteredData, transaction.reference);
  
//           dispatch(cartActions.CLEAR_CART());
//           console.log("Lisa Ann is still the hawtest");
//           navigate("/checkout", { replace: true });
//         },
//         onClose() {
//           alert("Transfer failed");
//           navigate("/cart");
//         },
//         onCancel() {
//           alert("Transaction terminated");
//           navigate("/cart");
//         },
//       });
//     } catch (error) {
//       console.error("Error getting supported banks:", error.message);
//     }
//   };


//   // const paystackSubmitHandler = (enteredData) => {
    

//   //   const paystack = new PaystackPop();
//   //   paystack.newTransaction({
//   //     key: process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY,
//   //     email: userEmail,
//   //     amount: cartTotalAmnt * 100,
//   //     reference: "TRANSREF"+Math.floor((Math.random()*1000000000000000)+1),

//   //     onSuccess(transaction) {
//   //       alert(`Payment successful, Reference: ${transaction.reference}`);
//   //       saveOrderToFirestore(enteredData,transaction.reference);
        
//   //       dispatch(cartActions.CLEAR_CART());
//   //       console.log("Lisa Ann is still the hawtest");
//   //       navigate("/checkout", { replace: true });
//   //     },
//   //     onClose() {
//   //       alert("Transfer failed");
//   //       navigate('/cart')
//   //     },
//   //     onCancel() {
//   //       alert("Transaction terminated");
//   //       navigate('/cart')
//   //     },
//   //   });
//   // };

//   return (
//     <div>
//       <CheckoutDetails onPayStackSubmitHandler={paystackSubmitHandler} />
//     </div>
//   );
// };

// export default PayStackLogic;
