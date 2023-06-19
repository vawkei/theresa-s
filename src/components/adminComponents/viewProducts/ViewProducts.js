import classes from "./ViewProducts.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../ui/search/Search";
import { db, storage } from "../../../firebase/Config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { productsActions } from "../../../store/index";
import { useDispatch } from "react-redux";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";
import { deleteObject, ref } from "firebase/storage";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const showDeleteNotifierTrue = (id, imageUrl) => {
    setShowDeleteNotifier({ id, imageUrl });
  };
  const showDeleteNotifierFalse = () => {
    setShowDeleteNotifier(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  //GET PRODUCTS FROM FIRESTORE DATABASE STARTS HERE
  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        //console.log(snapshot.docs)
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
        //console.log(allProducts);
        setProducts(allProducts);

        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //DELETE PRODUCT FROM FIREBASE FUNCTION HERE

  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      console.log("item successfully deleted");
      setShowDeleteNotifier(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={classes.container}>
          <div className={classes.table}>
            <section>
              <h2>ViewProducts</h2>
              <p><b>{products.length} products found</b></p>
              <div className={classes.search}>
                <Search
                  value={search}
                  onChange={searchChangeHandler}
                  placeholder={"search product by name here"}
                />
              </div>
            </section>

            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          style={{ width: "6rem" }}
                        />{" "}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>
                        {/* <Link to={`/admin/add-product/${product.id}`}> */}
                        <Link to={`/admin/edit-product/${product.id}`}>
                          <AiFillEdit size={25} />
                        </Link>{" "}
                        &nbsp;
                        <RiDeleteBin2Line
                          size={25}
                          color="red"
                          onClick={() =>
                            showDeleteNotifierTrue(product.id, product.imageUrl)
                          }
                        />
                      </td>
                      {showDeleteNotifier && (
                        <DeleteNotifier
                          title={"Delete Product"}
                          message={"You are about to delete this product"}
                          onConfirm={() => {
                            deleteProduct(
                              showDeleteNotifier.id,
                              showDeleteNotifier.imageUrl
                            );
                          }}
                          onCancel={showDeleteNotifierFalse}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProducts;
