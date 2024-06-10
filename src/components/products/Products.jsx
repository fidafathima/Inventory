import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./product.css";

function Products() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
             "http://127.0.0.1:8000/Product1");
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  console.log(products);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default Products;
