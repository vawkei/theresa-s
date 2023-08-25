import { Fragment, useEffect, useState } from "react";
import classes from "./ProductFilter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../store";


const ProductFilter = (props) => {
  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");

  const products = useSelector((state) => state.products.products);
  //console.log(products);
  //we get this products through redux that was sent from ShopNow component
  const dispatch = useDispatch();

  const brandChangeHandler = (e) => {
    setBrand(e.target.value);
  };

  const allCategories = [
    "ALL",
    ...new Set(
      products.map((product) => {
        return product.category;
      })
    ),
  ];
  //console.log(allCategories);

  const allBrands = [
    "ALL",
    ...new Set(
      products.map((product) => {
        return product.brand;
      })
    ),
  ];
  //console.log(allBrands);

  useEffect(() => {
    dispatch(filterActions.FILTERPRODUCT_BY_BRAND({products:products,brand:brand }));
  }, [dispatch,products,brand]);

  const categoryHandler = (cat) => {
    setCategory(cat);
    dispatch(filterActions.FILTERPRODUCT_BY_CATEGORY({products,category:cat }));
  };


  return (
    <Fragment>
      <div className={classes.filterComp}>
        <div className={classes.category} onClick={props.filterToggleHandler}>
          <h4>Categories</h4>
          {allCategories.map((cat, index) => {
            return (
              <p
                key={index}
                onClick={()=>categoryHandler(cat)}
                className={`${category}`===cat ? ` ${classes.active}` : ""}>
                {cat}
              </p>
            );
          })}
        </div>

        <div className={classes.brand}>
          <h4>Brands</h4>
          <select onChange={brandChangeHandler} value={brand}>
            {allBrands.map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className={classes.btn}>
            <button onClick={clearFilter} >Clear filter</button>
        </div> */}
      </div>
    </Fragment>
  );
};

export default ProductFilter;
