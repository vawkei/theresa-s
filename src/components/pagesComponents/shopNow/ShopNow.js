import { Fragment, useEffect, useState } from "react";
import classes from "./ShopNow.module.css";
import ProductFilter from "../productFilter/ProductFilter";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/Config";
import ProductList from "../productList/ProductList";
import {productsActions} from '../../../store/index'
import { useDispatch } from "react-redux";

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

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
        setIsLoading(false)

        dispatch(productsActions.ADD_PRODUCTS_TO_STORE({
          reduxProducts : allProducts.map((product)=>({
            ...product,
            createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
            editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
          })) 
        }))
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
        {isLoading ? <p>Fetching Products...</p> : (
          <div className={classes.shop}>
          <aside>
            <ProductFilter />
          </aside>
          <div>
            <ProductList products={products} />
          </div>
        </div>
        )}
      
    </Fragment>
  );
};

export default ShopNow;
