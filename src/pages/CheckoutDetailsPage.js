import PayStackLogic from "../components/pagesComponents/checkoutDetails/PaystackLogic";


const CheckoutSummaryPage = () => {
    return ( 
        <div>
             {/* style={{ width: "100%", maxWidth: "60rem", margin: "10rem auto" }} */}
            <PayStackLogic />
            {/* <CheckoutDetails /> No need  for this here,it now resides in PayStackLogic*/}
        </div>
     );
}
 
export default CheckoutSummaryPage;