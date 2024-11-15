
import { useNavigate } from "react-router-dom";
import "./product.css";

function ProductCard({ product }) {
  const navigate=useNavigate();
  console.log(product);
  return (     
                <div class="col-lg-4 col-md-6">
                  <div class="single-product">
                    <div class="product-img">
                      <img
                        class="card-img"
                        src={`http://127.0.0.1:8000/${product.ProductImage}`} alt=""
                      />
                      <div class="p_icon">
                        <a href="">
                          <i className="ti-eye" onClick={()=>navigate(`/product/${product.id}`)}></i>
                        </a>
                        <a href="#">
                          <i class="ti-heart"></i>
                        </a>
                        <a href="#">
                          <i class="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                    <div class="product-btm">
                      <a href="#" class="d-block">
                        <h4>{product.ProductName}</h4>
                      </a>
                      <div class="mt-3">
                        <span class="mr-4">$25.00</span>
                        <del>$35.00</del>
                      </div>
                    </div>
                  </div>
                </div>
              

         
  );
}
export default ProductCard;
