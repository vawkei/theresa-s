import { Fragment, useEffect, useState } from "react";
import classes from "./ReviewProduct.module.css";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/Config";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import Card from "../../ui/card/Card";
import StarsRating from "react-star-rate";
import Button from "../../ui/button/Button";
import { useSelector } from "react-redux";
import Notifier from "../../ui/notifier/Notifier";

const ReviewProduct = () => {
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rate, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();

  const userID = useSelector((state) => state.auth.userID);
  const userName = useSelector((state) => state.auth.userName);
  const [notifier, setNotifier] = useState("");

  useEffect(() => {
    getSingleProduct();
  }, []);

  let timeDuration = 5000;
  let notifierClearer;

  useEffect(() => {
    if (notifier) {
      notifierClearer = setInterval(function () {
        setNotifier("");
      }, timeDuration);
    }
    return () => {
      clearInterval(notifierClearer);
    };
  }, [notifier]);

  const getSingleProduct = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        console.log(obj);
        setProduct(obj);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("No Document Found");
      setIsLoading(false);
    }
  };

  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();

  function submitReview(e) {
    setIsLoading(true);
    e.preventDefault();
    // console.log({
    //     userID:userID,
    //     userName:userName,
    //     productID:id,
    //     rate:rate,
    //     review:review,
    //     reviewDate:date,
    //     reviewTime: time,
    // })
    setIsLoading(false);
    try {
      addDoc(collection(db, "reviews"), {
        userID: userID,
        userName: userName,
        productID: id,
        rate: rate,
        review: review,
        reviewDate: date,
        reviewTime: time,
        createdAt: Timestamp.now().toDate(),
      });
      setRating(0);
      setReview("");
      setIsLoading(false);
      setNotifier({
        title: "Success",
        message: "Review sent...",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.review}>
      {notifier && (
        <Notifier title={notifier.title} message={notifier.message} />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <h1>Review Product</h1>
          <form action="" onSubmit={submitReview}>
            <Card className={classes.cardClass}>
              <div className={classes.image}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "15rem" }}
                />
              </div>

              <div className={classes.right}>
                <h4>{product.name}</h4>
                <p>Rating:</p>
                <div className={classes.ratingContainer}>
                  <StarsRating                    
                    value={rate}
                    onChange={(rate) => setRating(rate)}
                  />
                </div>

                <label htmlFor="">Review</label>
                <textarea
                  rows="5"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}></textarea>
                <div className={classes.action}>
                  <Button className={classes.btn}>Submit</Button>
                </div>
              </div>
            </Card>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default ReviewProduct;
