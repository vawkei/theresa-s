//0RIGINAL
import classes from "./ProductList.module.css";
import Search from "../../ui/search/Search";
import ProductItem from "../productItem/ProductItem";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../../../store";

const ProductList = (props) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");
  const dispatch = useDispatch();

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const sortChangeHandler = (e) => {
    setSort(e.target.value);
  };

  const products = props.products;
  //console.log(products.imageUrl)
  // products here is coming live from the db since we are using props.Remember we set our setProducts to allProducts in the ShopNow component.


  useEffect(() => {
    dispatch(
      filterActions.SORT_PRODUCTS({
        products: products.map((product) => ({
          ...product,
          createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
          editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        })),
        sort: sort
      })
    
    );
  }, [dispatch,products,sort,search]);

  useEffect(() => {
    dispatch(
      filterActions.FILTERPRODUCT_BY_SEARCH({
        products: products.map((product) => ({
          ...product,
          createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
          editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        })),
     search:search })
    );
  }, [dispatch,products,search]);


  return (
    <div>
      <div className={classes.top}>
        <div className={classes.search}>
          <Search
            value={search}
            onChange={searchChangeHandler}
            placeholder={"Search products, brands and categories"}
          />
        </div>
        <div className={classes.sort}>
          <label htmlFor="">Sort:</label>
          <select name="" value={sort} onChange={sortChangeHandler}>
            <option value="Latest">Latest</option>
            <option value="Highest Price">Highest Price</option>
            <option value="Lowest Price">Lowest Price</option>
          </select>
        </div>
      </div>

      <ProductItem products={products} />
    </div>
  );
};

export default ProductList;































