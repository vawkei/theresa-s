import classes from "./AddProduct.module.css";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { useState } from "react";
import { db, storage } from "../../../firebase/Config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loader from "../../ui/loader/Loader";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'


const category = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Game" },
  { id: "3", name: "Fashion" },
  { id: "4", name: "Phone" },
];


const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const handleInputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  //SENDING IMAGE TO FIREBASE STORAGE BUCKET CODE STARTS HERE:
  const handleImageHandler = (e) => {
    setIsLoading(true);

    const file = e.target.files[0];
    const storageRef = ref(storage, `theresas/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          console.log("upload Successful");
          setIsLoading(false);
        });
      }
    );
    
  };

  const submitFormHandler = (e)=>{
    e.preventDefault();
    setIsLoading(true);

    const docRef = addDoc(collection(db,'products'),{
    name: product.name,
    imageUrl: product.imageUrl,
    price: +(product.price),
    category: product.category,
    brand: product.brand,
    desc: product.desc,
    createdAt: Timestamp.now().toDate()
    })
    setIsLoading(false);
    console.log('Product added');
    setUploadProgress(0);
    setProduct({
      name: '',
      imageUrl: '',
      price: '',
      category: '',
      brand: '',
      desc: '',
    })
    navigate('/admin/view-products')
  }

  return (
    
    <div>
      {isLoading && <Loader />}
      <h2>Add Product</h2>
      <Card className={classes.card}>
        <form action="" onSubmit={submitFormHandler} className={classes.form}>
          <div className={classes.control}>
            <label htmlFor="">Product name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              required
              onChange={handleInputHandler}
            />
          </div>
          <div className={classes.control}>
            <Card>
              <label htmlFor="">Product image</label>
              {uploadProgress === 0 ? null : (
                <div className={classes.progress}>
                  <div className={classes["progress-bar"]}>
                    {uploadProgress < 100
                      ? `uploading ${uploadProgress}`
                      : `upload complete  ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageHandler}
                accept="image/all"
                name="image"
                file={product.imageUrl}
                placeholder="product image"
              />
              {product.imageUrl ? <input
                type="text"
                value={product.imageUrl}
                name="imageUrl"
                disabled  
                placeholder="product image"
              />: null}
              
            </Card>
          </div>
          <div className={classes.control}>
            <label>Product price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="Enter product price"
              required
              onChange={handleInputHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">Product category</label>
            <select
              name="category"
              onChange={handleInputHandler}
              value={product.category}
              required>
              <option value="" disabled>
                Choose a category
              </option>
              {category.map((cat) => {
                return <option key={cat.id}>{cat.name}</option>;
              })}
            </select>
          </div>
          <div className={classes.control}>
            <label>Product brand/company</label>
            <input
              type="text"
              name="brand"
              required
              placeholder="Enter product brand"
              value={product.brand}
              onChange={handleInputHandler}
            />
          </div>
          <div className={classes.control}>
            <label>Product description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={handleInputHandler}
              rows="5"></textarea>
          </div>
          <div className={classes.btn}>
            <Button>Add Product</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;

// <Card className={classes.group}>
// <label htmlFor="">Product image</label>
//   {uploadProgress === 0 ? null : (
//     <div className={classes.progress}>
//       <div
//         className={classes["progress-bar"]}
//         style={{ width: `${uploadProgress}%` }}>
//         {uploadProgress < 100
//           ? `uploading ${uploadProgress}%`
//           : `upload complete${uploadProgress}% `}
//       </div>
//     </div>
//   )}
//   <input
//     type="file"
//     files={product.imageUrl}
//     accept="image/all"
//     name="image"
//     onChange={handleImageHandler}
//     placeholder="product image"
//   />
//   {product.imageUrl ? (
//     <input
//       type="text"
//       value={product.imageUrl}
//       placeholder="imageUrl"
//       disabled
//       name="imageUrl"
//     />
//   ) : null}
// </Card>
