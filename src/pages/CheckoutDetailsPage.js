import PayStackLogic from "../components/pagesComponents/checkoutDetails/PaystackLogic";


const CheckoutSummaryPage = () => {
    return ( 
        <div>
            <PayStackLogic />
            {/* <CheckoutDetails /> No need  for this here,it now resides in PayStackLogic*/}
        </div>
     );
}
 
export default CheckoutSummaryPage;