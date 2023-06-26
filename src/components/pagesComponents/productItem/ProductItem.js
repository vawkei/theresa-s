import { useSelector } from "react-redux";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import classes from "./ProductItem.module.css";
import { Fragment,  } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";

const ProductItem = (props) => {
  

  var nairaSymbol = '\u20A6';
  //console.log(nairaSymbol);

  const dispatch = useDispatch();

  const products = props.products;
  //console.log(products.imageUrl)

  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );
  //console.log(filteredProducts)

  const addToCartCartHandler = (product) => {
    dispatch(
      cartActions.ADDPRODUCT_TO_STORE(product)
    );
  };

  return (
    <Fragment>
      {/* {products.length === 0 ? <p>No products found</p> :( */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <Fragment>
          {filteredProducts.length} <span>products found </span>
          <div className={classes.products}>
            {/* {products.map((product) => { */}
            {filteredProducts.map((product) => {
              return (
                <Card className={classes.cardClass} key={product.id}>
                  {/* <Link to={`/product-detail/${product.id}`}> */}
                  <Link to={`/shop-now/${product.id}`}>
                    <div className={classes.image}>
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                  </Link>
                  <div className={classes.content}>
                    <p>{nairaSymbol}{product.price.toLocaleString()}</p>
                    <h4>{product.name}</h4>
                  </div>
                  <Button
                    className={classes.btn}
                    // onClick={()=>addToCartCartHandler(product)}this delays it from running immediately the when the page loads>
                    onClick={()=>addToCartCartHandler(product)}>
                    Add to cart
                  </Button>
                </Card>
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductItem;
