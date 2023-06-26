//0RIGINAL

//A little note: Here I first got my productEdit from the redux store on line29. It works fine, but when you try to refresh it throws an error. because its from  the redux store.

// import classes from "./EditProduct.module.css";
// import Card from "../../ui/card/Card";
// import Button from "../../ui/button/Button";
// import { useEffect, useState } from "react";
// import { db, storage } from "../../../firebase/Config";
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import Loader from "../../ui/loader/Loader";
// import {
//   Timestamp,
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
// import { useParams } from "react-router-dom";
// //import {useSelector} from 'react-redux';

// const category = [
//   { id: "1", name: "Electronics" },
//   { id: "2", name: "Game" },
//   { id: "3", name: "Fashion" },
//   { id: "4", name: "Phone" },
// ];

// const EditProduct = () => {
//   const { id } = useParams();

//   const [product, setProduct] = useState({
//     name: "",
//     imageUrl: "",
//     price: "",
//     category: "",
//     brand: "",
//     desc: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleInputHandler = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   //   const reduxProducts = useSelector((state)=>state.products.products);

//   //   const productEdit = reduxProducts.find((item)=>{
//   //       return item.id === id
//   //     });

//   // const productEdit = reduxProducts.find((item) => item.id === id);
//   //its not wise calling product from our redux store because when you reload the page you get an error like Cannot read properties of undefined (reading 'name'), hence we call it from our database
//   //console.log(productEdit);

//   const getSingleProduct = async () => {
//     setIsLoading(true);
//     const docRef = doc(db, "products", id);

//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const obj = {
//         id: id,
//         ...docSnap.data(),
//       };
//       setProduct(obj);
//       console.log("Document data:", docSnap.data());
//     } else {
//       console.log("No such document!");
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getSingleProduct();
//   }, []);

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
//           console.log("Image editted Successful");
//           setIsLoading(false);
//         });
//       }
//     );
//   };

//   const getProductFromDatabase = async (productId) => {
//   const productRef = doc(db, "products", productId);
//   const productSnapshot = await getDoc(productRef);
//   if (productSnapshot.exists()) {
//     const productData = productSnapshot.data();
//     return productData.imageUrl;
//   }
//   return null; // Handle the case where the product doesn't exist in the database
// };

//   const submitFormHandler = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);
//   // Get the original imageUrl from the database
//   const previousImageUrl = await getProductFromDatabase(id);

//   // Check if the imageUrl exists in the storage
//   if (product.imageUrl && product.imageUrl !== previousImageUrl) {
//     const storageRef = ref(storage, previousImageUrl);
//     try {
//       await deleteObject(storageRef);
//       console.log("Previous image deleted");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// //   the getProductFromDatabase function is introduced to retrieve the product document from the database based on the id of the product. It accesses the imageUrl field from the retrieved data and returns it. This allows you to compare product.imageUrl with the original value from the database (previousImageUrl) to determine if the image has changed.
// //   The code creates a storage reference storageRef using ref(storage, previousImageUrl) to point to the previous image URL stored in the Firebase Storage.
// // The deleteObject(storageRef) function is called to delete the previous image associated with the previousImageUrl from the storage.
// // If the deletion is successful, a message is logged to the console indicating that the previous image has been deleted.

//     try {
//       setDoc(doc(db, "products", id), {
//         name: product.name,
//         imageUrl: product.imageUrl,
//         price: +product.price,
//         category: product.category,
//         brand: product.brand,
//         desc: product.desc,
//         createdAt: Timestamp.now().toDate(),
//         editedAt: Timestamp.now().toDate(),
//       });
//       setIsLoading(false);
//       console.log(`Product edited ${product.id}`);
//       setUploadProgress(0);
//       setProduct({
//         name: "",
//         imageUrl: "",
//         price: "",
//         category: "",
//         brand: "",
//         desc: "",
//       });
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {isLoading && <Loader />}
//       <h2>Edit Product</h2>
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
//               {product.imageUrl ? (
//                 <input
//                   type="text"
//                   value={product.imageUrl}
//                   name="imageUrl"
//                   disabled
//                   placeholder="product image"
//                 />
//               ) : null}
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
//             <Button>Submit Edit</Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default EditProduct;

import classes from "./EditProduct.module.css";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { useEffect, useState } from "react";
import { db, storage } from "../../../firebase/Config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "../../ui/loader/Loader";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
//import {useSelector} from 'react-redux';

const category = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Game" },
  { id: "3", name: "Fashion" },
  { id: "4", name: "Phone" },
];

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    imageUrl_2: "",
    imageUrl_3: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgress_2, setUploadProgress_2] = useState(0);
  const [uploadProgress_3, setUploadProgress_3] = useState(0);

  const handleInputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //   const reduxProducts = useSelector((state)=>state.products.products);

  //   const productEdit = reduxProducts.find((item)=>{
  //       return item.id === id
  //     });

  // const productEdit = reduxProducts.find((item) => item.id === id);
  //its not wise calling product from our redux store because when you reload the page you get an error like Cannot read properties of undefined (reading 'name'), hence we call it from our database
  //console.log(productEdit);

  const getSingleProduct = async () => {
    setIsLoading(true);
    const docRef = doc(db, "products", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

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
          console.log("Image editted Successful");
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

  const getProductFromDatabase = async (productId) => {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      return (
        productData.imageUrl, productData.imageUrl_2, productData.imageUrl_3
      );
    }
    return null; // Handle the case where the product doesn't exist in the database
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Get the original imageUrl from the database
    const previousImageUrl = await getProductFromDatabase(id);
    const previousImageUrl_2 = await getProductFromDatabase(id);
    const previousImageUrl_3 = await getProductFromDatabase(id);

    // Check if the imageUrl exists in the storage
    if (
      (product.imageUrl && product.imageUrl !== previousImageUrl) ||
      (previousImageUrl_2 && product.imageUrl_2 !== previousImageUrl_2) ||
      (previousImageUrl_3 && product.imageUrl_3 !== previousImageUrl_3)
    ) {
      const storageRef = ref(
        storage,
        previousImageUrl,
        previousImageUrl_2,
        previousImageUrl_3
      );
      try {
        await deleteObject(storageRef);
        console.log("Previous image deleted");
      } catch (error) {
        console.log(error);
      }
    }
    //   the getProductFromDatabase function is introduced to retrieve the product document from the database based on the id of the product. It accesses the imageUrl field from the retrieved data and returns it. This allows you to compare product.imageUrl with the original value from the database (previousImageUrl) to determine if the image has changed.
    //   The code creates a storage reference storageRef using ref(storage, previousImageUrl) to point to the previous image URL stored in the Firebase Storage.
    // The deleteObject(storageRef) function is called to delete the previous image associated with the previousImageUrl from the storage.
    // If the deletion is successful, a message is logged to the console indicating that the previous image has been deleted.

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageUrl: product.imageUrl,
        imageUrl_2: product.imageUrl_2,
        imageUrl_3: product.imageUrl_3,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      console.log(`Product edited ${product.id}`);
      setUploadProgress(0);
      setProduct({
        name: "",
        imageUrl: "",
        imageUrl_2: "",
        imageUrl_3: "",
        price: "",
        category: "",
        brand: "",
        desc: "",
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Edit Product</h2>
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

export default EditProduct;
