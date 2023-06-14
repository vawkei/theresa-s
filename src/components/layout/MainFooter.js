import classes from './MainFooter.module.css';

const MainFooter = () => {
  const yearInFull = new Date();
  const month = yearInFull.getMonth();
  const year = yearInFull.getFullYear();

  // console.log(yearInFull);
  // console.log(month,year)

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
      <h2>{dateInFull}</h2>
    </div>
  );
};

export default MainFooter;
