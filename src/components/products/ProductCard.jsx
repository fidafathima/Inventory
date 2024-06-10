
import "./product.css";

function ProductCard({ product }) {
  console.log(product);
  return (
    <div className="grid2" >
      <img className="image" src={`http://127.0.0.1:8000/${product.ProductImage}`} />

      <h2>{product.ProductCode}</h2>
      <p className="text">{product.ProductName}</p>
      <h2>{product.size.size}</h2>
      <h2>{product.product_color}</h2>
    </div>
  );
}
export default ProductCard;
