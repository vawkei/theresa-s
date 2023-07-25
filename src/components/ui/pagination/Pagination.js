import classes from "./Pagination.module.css";
import { useState } from "react";

const Pagination = (props) => {
  //to determine the maximum no of pages to be shown in the pagination:
  const [pageNumberLimit] = useState(5);
  
  //max number value to show in the pagination:
  const [maxPageNumberLimit, setMaxPagNumberLimit] = useState(5);
 
  //min number value to show in the pagination:
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const array = [];
  for (
    let i = 1;
    i <= Math.ceil(props.filteredProducts.length / props.itemsPerPage);
    i++
    //by dividing props.filteredPdcts.length by itemsperpage, we set our pagination to have 4 pages, 23/6 = 3.8 approx 4pages.Meaning we need 4pages to display all the items.
  ) {
    array.push(i); 
  }
  const numbers = array;
  //console.log(numbers);

  //to configure the pagination buttons to be functional:
  const clickHandler = (numberId) => {
    window.scrollTo(0, 0);
    props.setCurrentPage(Number(numberId));
  };

  //to render the numbers:
  const renderPageNumbers = numbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          className={` ${
            props.currentPage === number ? `${classes.active}`  : ""
          }`}
          onClick={() => clickHandler(number)}>
          {number}
        </li>
      );
    }
  });
  //the next button functionality:
  const nextButtonHandler = () => {
    props.setCurrentPage(props.currentPage + 1);
    if (props.currentPage +1 > maxPageNumberLimit) {
      setMaxPagNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  //the prev button functionality:
  const prevButtonHandler = () => {
    props.setCurrentPage(props.currentPage - 1);
    if ((props.currentPage - 1) % pageNumberLimit === 0) {
      setMaxPagNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className={classes.pagination}>
      <ul>
        <button
          onClick={prevButtonHandler}
          className={`${
            props.currentPage === numbers[0] ? classes.hidden : ""
          }`}>
          Prev
        </button>
        {renderPageNumbers}
        <button
          onClick={nextButtonHandler}
          className={`${
            props.currentPage === numbers.length ? classes.hidden : ""
          }`}>
          Next
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
