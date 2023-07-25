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


const Last7DaysBarChart = (props) => {
  //Get the date for  today and 4 days ago:

  const today = new Date();
  //console.log(today.toDateString())

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  //console.log(yesterday.toDateString());

  const day2 = new Date();
  day2.setDate(day2.getDate() - 2);
  //console.log(day2.toDateString());

  const day3 = new Date();
  day3.setDate(day3.getDate() - 3);
  //console.log(day3.toDateString())

  const day4 = new Date();
  day4.setDate(day4.getDate() - 4);
  //console.log(day4.toDateString())

  const day5 = new Date();
  day5.setDate(day5.getDate() - 5);
  //console.log(day5.toDateString())

  //Get orders:
  const orders = props.orders;

  const arr = [];
  const orderedDate = orders.map((order) => {
   return arr.push(order.orderedDate);
  });
  //console.log(arr);

  //Filtering the order dates:

  function getDateCount(arr,value){
   return arr.filter((n)=>n===value).length
  };

  const Today =  getDateCount(arr,today.toDateString());
  const Yesterday =  getDateCount(arr,yesterday.toDateString());
  const Day2 =  getDateCount(arr,day2.toDateString());
  const Day3 =  getDateCount(arr,day3.toDateString());
  const Day4 =  getDateCount(arr,day4.toDateString());
  const Day5 =  getDateCount(arr,day5.toDateString());
  console.log(Day3)



  const data = {
    labels:[today.toDateString(),yesterday.toDateString(),day2.toDateString(),day3.toDateString(),day4.toDateString(),day5.toDateString()],
    datasets:[
      {
        label:"Last 7 Days Chart",
        data:[Today,Yesterday,Day2,Day3,Day4,Day5],
        borderColor:"rgba(53,162,235)",
        backgroundColor:"rgba(53,162,235,0.4)",
      }
    ]        
  };



  return (
    <div className={classes.chart2}>
      <h2>Last 7 Days BarChart</h2>
      <Card className={classes.cardClass1}>
          <Bar className={classes.bar}  data={data} options={options}/>
      </Card>
    </div>
  );
};

export default Last7DaysBarChart;
