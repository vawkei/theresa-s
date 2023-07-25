import { Bar } from "react-chartjs-2";
import Card from "../../ui/card/Card";
import classes from "./Bar.module.css";
import {
  Chart as Chartjs,
  LinearScale,
  Legend,
  Tooltip,
  BarElement,
  Title,
  CategoryScale,
} from "chart.js";


Chartjs.register(
  LinearScale,
  Legend,
  Tooltip,
  BarElement,
  Title,
  CategoryScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
  },
  title: {
    display: true,
    text: "Order Status Chart",
  },
  
};



const OrderStatusBarChart = (props) => {

 const delivered = props.delivered 
 const processing = props.processing
 const placed = props.placed  
 
    const data = {
      labels:["Delivered","Processing","Placed"],
      datasets:[
        {
          label:"Order Status Chart",
          data:[delivered,processing,placed],
          borderColor:"rgba(53,162,235)",
          backgroundColor:"rgba(53,162,235,0.4)",
        }
      ]        
    };


    return ( 
        <div className={classes.chart1}>
            <h2>Order Status BarChart</h2>
            <Card className={classes.cardClass2}>
                <Bar  data={data} options={options} />
            </Card>
        </div>
     );
}
 
export default OrderStatusBarChart;