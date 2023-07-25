//0RIGINAL

// import classes from "./AddProduct.module.css";
// import Card from "../../ui/card/Card";
// import Button from "../../ui/button/Button";
// import { useState } from "react";
// import { db, storage } from "../../../firebase/Config";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import Loader from "../../ui/loader/Loader";
// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import {useNavigate} from 'react-router-dom'


// const category = [
//   { id: "1", name: "Electronics" },
//   { id: "2", name: "Game" },
//   { id: "3", name: "Fashion" },
//   { id: "4", name: "Phone" },
// ];


// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     imageUrl: "",
//     price: 0,
//     category: "",
//     brand: "",
//     desc: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const navigate = useNavigate();

//   const handleInputHandler = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };


//   //SENDING IMAGE TO FIREBASE STORAGE BUCKET CODE STARTS HERE:
//   const handleImageHandler = (e) => {
//     setIsLoading(true);

//     const file = e.target.files[0];
//     const storageRef = ref(storage, `theresas/${Date.now()} ${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setProduct({ ...product, imageUrl: downloadURL });
//           console.log("upload Successful");
//           setIsLoading(false);
//         });
//       }
//     );
    
//   };

//   const submitFormHandler = (e)=>{
//     e.preventDefault();
//     setIsLoading(true);

//     const docRef = addDoc(collection(db,'products'),{
//     name: product.name,
//     imageUrl: product.imageUrl,
//     price: +(product.price),
//     category: product.category,
//     brand: product.brand,
//     desc: product.desc,
//     createdAt: Timestamp.now().toDate()
//     })
//     setIsLoading(false);
//     console.log('Product added');
//     setUploadProgress(0);
//     setProduct({
//       name: '',
//       imageUrl: '',
//       price: '',
//       category: '',
//       brand: '',
//       desc: '',
//     })
//     navigate('/admin/view-products')
//   }

//   return (
    
//     <div>
//       {isLoading && <Loader />}
//       <h2>Add Product</h2>
//       <Card className={classes.card}>
//         <form action="" onSubmit={submitFormHandler} className={classes.form}>
//           <div className={classes.control}>
//             <label htmlFor="">Product name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter product name"
//               value={product.name}
//               required
//               onChange={handleInputHandler}
//             />
//           </div>
//           <div className={classes.control}>
//             <Card>
//               <label htmlFor="">Product image</label>
//               {uploadProgress === 0 ? null : (
//                 <div className={classes.progress}>
//                   <div className={classes["progress-bar"]}>
//                     {uploadProgress < 100
//                       ? `uploading ${uploadProgress}`
//                       : `upload complete  ${uploadProgress}%`}
//                   </div>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 onChange={handleImageHandler}
//                 accept="image/all"
//                 name="image"
//                 file={product.imageUrl}
//                 placeholder="product image"
//               />
//               {product.imageUrl ? <input
//                 type="text"
//                 value={product.imageUrl}
//                 name="imageUrl"
//                 disabled  
//                 placeholder="product image"
//               />: null}
              
//             </Card>
//           </div>
//           <div className={classes.control}>
//             <label>Product price</label>
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               placeholder="Enter product price"
//               required
//               onChange={handleInputHandler}
//             />
//           </div>
//           <div className={classes.control}>
//             <label htmlFor="">Product category</label>
//             <select
//               name="category"
//               onChange={handleInputHandler}
//               value={product.category}
//               required>
//               <option value="" disabled>
//                 Choose a category
//               </option>
//               {category.map((cat) => {
//                 return <option key={cat.id}>{cat.name}</option>;
//               })}
//             </select>
//           </div>
//           <div className={classes.control}>
//             <label>Product brand/company</label>
//             <input
//               type="text"
//               name="brand"
//               required
//               placeholder="Enter product brand"
//               value={product.brand}
//               onChange={handleInputHandler}
//             />
//           </div>
//           <div className={classes.control}>
//             <label>Product description</label>
//             <textarea
//               name="desc"
//               required
//               value={product.desc}
//               onChange={handleInputHandler}
//               rows="5"></textarea>
//           </div>
//           <div className={classes.btn}>
//             <Button>Add Product</Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddProduct;















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
    imageUrl_2:"",
    imageUrl_3:"",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgress_2, setUploadProgress_2] = useState(0);
  const [uploadProgress_3, setUploadProgress_3] = useState(0);

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


  //IMAGE_CHAGE_HANDLER FOR IMAGE SECOND IMAGE
  const handleImageHandler_2 = (e) => {
    setIsLoading(true);

    const file = e.target.files[0];
    const storageRef = ref(storage, `theresas/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress_2(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl_2: downloadURL });
          console.log("upload Successful");
          setIsLoading(false);
        });
      }
    );
    
  };
  //IMAGE_CHAGE_HANDLER FOR IMAGE THIRD IMAGE
  const handleImageHandler_3 = (e) => {
    setIsLoading(true);

    const file = e.target.files[0];
    const storageRef = ref(storage, `theresas/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress_3(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl_3: downloadURL });
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
    imageUrl_2:product.imageUrl_2,
    imageUrl_3:product.imageUrl_3,
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
    
    <div style={{ width: "100%", maxWidth: "50rem", margin: "2rem auto" }}>
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


          {/* SECOND IMAGE */}
          <div className={classes.control}>
            <Card>
              <label htmlFor="">Second Product image</label>
              {uploadProgress_2 === 0 ? null : (
                <div className={classes.progress}>
                  <div className={classes["progress-bar"]}>
                    {uploadProgress_2 < 100
                      ? `uploading ${uploadProgress_2}`
                      : `upload complete  ${uploadProgress_2}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageHandler_2}
                accept="image/all"
                name="image"
                file={product.imageUrl_2}
                placeholder="product image"
              />
              {product.imageUrl_2 ? <input
                type="text"
                value={product.imageUrl_2}
                name="imageUrl_2"
                disabled  
                placeholder="product image"
              />: null}
              
            </Card>
          </div>


          {/* THIRD IMAGE */}
          <div className={classes.control}>
            <Card>
              <label htmlFor="">Third Product image</label>
              {uploadProgress_3 === 0 ? null : (
                <div className={classes.progress}>
                  <div className={classes["progress-bar"]}>
                    {uploadProgress_3 < 100
                      ? `uploading ${uploadProgress_3}`
                      : `upload complete  ${uploadProgress_3}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageHandler_3}
                accept="image/all"
                name="image"
                file={product.imageUrl_3}
                placeholder="product image"
              />
              {product.imageUrl_3 ? <input
                type="text"
                value={product.imageUrl_3}
                name="imageUrl_3"
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
