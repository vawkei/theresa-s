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
import { filterActions, productsActions } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";
import { deleteObject, ref } from "firebase/storage";
import Pagination from "../../ui/pagination/Pagination";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);
  var nairaSymbol = "\u20A6";

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

  useEffect(() => {
    dispatch(
      filterActions.FILTERPRODUCT_BY_SEARCH({
        products: products.map((product) => ({
          ...product,
          createdAt: new Date(product.createdAt.seconds * 1000).toDateString(),
          editedAt: new Date(product.createdAt.seconds * 1000).toDateString(),
        })),
        search: search,
      })
    );
  }, [dispatch, products, search]);

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

  //Getting the filtered Products:
  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );
  //console.log(filteredProducts);

  //pagination stuff:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexLastItem = currentPage * itemsPerPage
  const indexFirstItem = indexLastItem - itemsPerPage
  const currentItem = filteredProducts.slice(indexFirstItem,indexLastItem)  

  // style={{width: "100%", maxWidth: "60rem", margin: "10rem auto"}}
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          className={classes.container}
          style={{ width: "100%", maxWidth: "50rem", margin: "2rem auto" }}>
          <div className={classes.table}>
            <section>
              <h2>ViewProducts</h2>
              <p>
                {/* <b>{products.length} products found</b> */}
                <b>{filteredProducts.length} products found</b>
              </p>
              <div className={classes.search}>
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage = {setCurrentPage}
                  filteredProducts={filteredProducts}
                />
                <Search
                  value={search}
                  onChange={searchChangeHandler}
                  placeholder={"search product by name here"}
                />
              </div>
            </section>

            <table
              style={{
                padding: "1rem",
                width: "100%",
                fontSize: "1.4rem",
                borderCollapse: "collapse",
                width: "100%",
              }}>
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
                {currentItem.map((product, index) => {
                // {filteredProducts.map((product, index) => {
                  // {products.map((product, index) => {
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
                      <td>
                        {nairaSymbol}
                        {product.price.toLocaleString()}
                      </td>
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
