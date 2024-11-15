import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/ProductSlice";


function Products() {
  // const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/Product1");
        dispatch(
          setProducts(data)
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [dispatch]);
  // console.log(user);
  console.log(product);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
    <section class="cat_product_area section_gap">
      <div class="container">
      <div class="row flex-row-reverse">
      <div class="col-lg-12">
      <div class="product_top_bar">
              <div class="left_dorp">
                <select class="sorting">
                  <option value="1">Default sorting</option>
                  <option value="2">Default sorting 01</option>
                  <option value="4">Default sorting 02</option>
                </select>
                <select class="show">
                  <option value="1">Show 12</option>
                  <option value="2">Show 14</option>
                  <option value="4">Show 16</option>
                </select>
              </div>
            </div>
            
            <div class="latest_product_inner">
              <div class="row">
        {product.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        </div>
        </div>
        </div>
        </div>
      </div>
    </section>
    </>
  );
}
export default Products;
