import classes from './MainFooter.module.css';
import {useNavigate} from "react-router-dom"

const MainFooter = () => {
  const yearInFull = new Date();
  const month = yearInFull.getMonth();
  const year = yearInFull.getFullYear();

  // console.log(yearInFull);
  // console.log(month,year)

  const navigate = useNavigate();


  const navigateHandler = ()=>{
    window.scrollTo(0,0)
    navigate("/")
  };


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateInFull = `${months[month]}, ${year}`;
  console.log(dateInFull);
  return (
    <div className={classes.footer}>
      <h2 onClick={navigateHandler}>{`<HowZ /> ${dateInFull}`}</h2>
    </div>
  );
};

export default MainFooter;
