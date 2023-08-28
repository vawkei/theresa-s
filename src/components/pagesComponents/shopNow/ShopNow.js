import { useEffect, useState } from "react";
import classes from "./ShopNow.module.css";
import ProductFilter from "../productFilter/ProductFilter";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import ProductList from "../productList/ProductList";
import { productsActions } from "../../../store/index";
import { useDispatch } from "react-redux";

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  // const [backdrop,setBackdrop] = useState(false);

  const dispatch = useDispatch();

  const filterToggleHandler = () => {
    setToggleState((prevState) => !prevState);
    // setBackdrop((prevState) => !prevState);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShots) => {
        const allProducts = snapShots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        //console.log(allProducts);
        setIsLoading(false);

        dispatch(
          productsActions.ADD_PRODUCTS_TO_STORE({
            reduxProducts: allProducts.map((product) => ({
              ...product,
              createdAt: new Date(
                product.createdAt.seconds * 1000
              ).toDateString(),
              editedAt: new Date(
                product.createdAt.seconds * 1000
              ).toDateString(),
            })),
          })
        );
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p style={{ marginLeft: "5rem" }}>Fetching Products...</p>
      ) : (
        <div className={classes.shop}>
          <div
            className={toggleState ? classes.backdrop : ""}
            onClick={filterToggleHandler}></div>

          <aside
            className={
              toggleState
                ? ` ${classes.filter} ${classes.showFilter} `
                : ` ${classes.filter}`
            }>
            <ProductFilter filterToggleHandler={filterToggleHandler} />
          </aside>

          <div className={classes.productList}>
            <ProductList
              products={products}
              filterToggleHandler={filterToggleHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopNow;
