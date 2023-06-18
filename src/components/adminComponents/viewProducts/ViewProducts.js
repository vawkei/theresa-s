import classes from "./ViewProducts.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../ui/search/Search";
import { db } from "../../../firebase/Config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading ? <p>Loading...</p> :(
        <div className={classes.table}>
      
      <section>
        <h2>ViewProducts</h2>
        <p>15 Products found</p>
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
                  <Link to={'/admin/add-product'}>
                    <AiFillEdit size={25} />
                  </Link> &nbsp;
                  <RiDeleteBin2Line size={25} color="red" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
)}
    
    </>
  );
};

export default ViewProducts;
