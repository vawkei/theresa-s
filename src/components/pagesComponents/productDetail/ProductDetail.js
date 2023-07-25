import { Fragment, useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import classes from "./ProductDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/Config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store";
import StarsRating from "react-star-rate";

const ProductDetail = () => {
  const { id } = useParams();
  //  console.log(id);
  const { id2 } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [reviews, setReviews] = useState([]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  //console.log(cartItems)
  const cartProduct = cartItems.find((item) => item.id === id);
  //console.log(cartProduct)
  const isInCart = cartItems.findIndex((item) => item.id === id);
  // console.log(isInCart);
  const dispatch = useDispatch();

  var nairaSymbol = "\u20A6";
  //console.log(nairaSymbol);

  const addToCartHandler = (product) => {
    dispatch(
      cartActions.ADDPRODUCT_TO_STORE({
        ...product,
        createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        // we assume that the ADDPRODUCT_TO_STORE action expects a single product object rather than an array. Therefore, we directly pass the modified product object to the action. so we dont use Map.
      })
    );
  };
  const decreaseCartHandler = (product) => {
    dispatch(
      cartActions.DECREASEPRODUCT_FROM_CART({
        ...product,
        createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        // we assume that the ADDPRODUCT_TO_STORE action expects a single product object rather than an array. Therefore, we directly pass the modified product object to the action. so we dont use Map.
      })
    );
  };

  // useEffect(() => {
  //   getSingleProduct();
  //   getSingleReview()
  // }, []);

  const getSingleProduct = async () => {
    setIsLoading(true);

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      // console.log("document:", docSnap.data());
      setProduct(obj);
      setIsLoading(false);
    } else {
      console.log("Product does not exist in our database");
      setIsLoading(false);
    }
  };

  const getReviews = async () => {
    try {
      const reviewRef = collection(db, "reviews");
      const q = query(reviewRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShot) => {
        console.log(snapShot);
        const allReviews = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log(allReviews);
        setReviews(allReviews);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredReview = reviews.filter((review) => review.productID === id);
  console.log(filteredReview);

  useEffect(() => {
    getSingleProduct();
    getReviews();
  }, []);
  return (
    <div
      className={classes.detail}
      style={{ width: "100%", maxWidth: "60rem", margin: "10rem auto" }}>
      <h2>Product detail</h2>
      {isLoading && <p>Loading...</p>}
      <Link to={"/shop-now"}>
        <Button className={classes.btn}> &larr; Back to Products</Button>
      </Link>

      <Card className={classes.cardClass}>
        <div className={classes.images}>
          <div className={classes["main-image"]}>
            <img src={product.imageUrl} alt="" />
          </div>

          <div className={classes.otherImages}>
            <img src={product.imageUrl_2} style={{ width: "10rem" }} />
            <img src={product.imageUrl_3} style={{ width: "10rem" }} />
          </div>

          <div className={classes.review}>
            <Card className={classes.reviewCardClass}>
              <h2>Product Review</h2>
              <hr />
              {filteredReview.length > 0 ? (
                <Fragment>
                  {filteredReview.map((rev) => {
                    const {
                      userId,
                      userName,
                      rate,
                      review,
                      reviewDate,
                      reviewTime,
                    } = rev;

                    return (
                      <div className={classes.rev} key={userId}>
                        <StarsRating value={rate} />
                        <p>{review}</p>
                        <p>{reviewDate}</p>
                        <p>{reviewTime}</p>
                        <p>
                          <b>{userName}</b>
                        </p>
                      </div>
                    );
                  })}
                </Fragment>
              ) : (
                <p>No Reviews for this product yet</p>
              )}
            </Card>
          </div>
        </div>

        <div className={classes.content}>
          <div>
            <h2>{product.name}</h2>
          </div>
          <div className={classes.brand}>
            <h4>Brand :</h4>
            <b>{product.brand}</b>
          </div>
          <div>
            <h2>
              {" "}
              {nairaSymbol}
              {product.price ? product.price.toLocaleString() : ""}
            </h2>
            {/* <p>{product.price.toFixed(2)}</p> */}
          </div>

          <div className={classes.descriptionTitle}>
            <h2>Product Description</h2>
          </div>
          <Card className={classes.cardClass2}>
            <div className={classes.descriptionContent}>
              <p>{product.desc}</p>
            </div>
            <div>
              {isInCart < 0 ? null : (
                <div className={classes.counter}>
                  <Button
                    className={classes.btn}
                    onClick={() => decreaseCartHandler(product)}>
                    -
                  </Button>
                  <p>{cartProduct.quantity}</p>
                  <Button
                    className={classes.btn}
                    onClick={() => addToCartHandler(product)}>
                    +
                  </Button>
                </div>
              )}

              <Button
                className={classes.cartBtn}
                onClick={() => addToCartHandler(product)}>
                <FaShoppingCart size={20} />
                Add to cart
              </Button>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
