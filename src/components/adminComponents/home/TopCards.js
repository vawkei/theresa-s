import classes from "./TopCards.module.css";
import Card from "../../ui/card/Card";
import OrderStatusBarChart from "./OrderStatusBarChart";
import Last7DaysBarChart from "./Last7DaysBarChart";

const TopCards = (props) => {
  var nairaSymbol = "\u20A6";

  const orders = props.orders;

  const orderStatus = orders.map((order) => {
    return order.orderStatus;
  });

  //console.log(orderStatus)
  const getOrderStatusCount = (hotassHollywood, value) => {
    return hotassHollywood.filter((hhw) => hhw === value).length;
  };

  const Processing = getOrderStatusCount(orderStatus, "Processing...");
  const Placed = getOrderStatusCount(orderStatus, "orderPlaced...");
  const Delivered = getOrderStatusCount(orderStatus, "Delivered...");
  //console.log(Processing, Placed, Delivered);

  return (
    <div>
      <div className={classes.topClass}>
        <Card className={classes.cardClass}>
          <div>
            <h2>Total Amount</h2>
            <p>
              {nairaSymbol}
              {props.totalOrderAmount.toLocaleString()}
            </p>
          </div>
        </Card>
        <Card className={classes.cardClass}>
          <div>
            <h2>Total Products</h2>
            <p>{props.products.length}</p>
          </div>
        </Card>
        <Card className={classes.cardClass}>
          <div>
            <h2>Total Daily Order</h2>
            <p>{props.dailyOrderAmount.length}</p>
          </div>
        </Card>
        <Card className={classes.cardClass}>
          <div>
            <h2>Total Orders</h2>
            <p>{orders.length}</p>
          </div>
        </Card>
      </div>
      <div className={classes.BarCharts}>
        <OrderStatusBarChart
          processing={Processing}
          delivered={Delivered}
          placed={Placed}
        />
        <Last7DaysBarChart orders={orders} />
      </div>
    </div>
  );
};

export default TopCards;
