import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/ProductSlice";
import { useNavigate } from "react-router-dom";


function Content() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product)|| [];
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/Product1");
        dispatch(setProducts(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [dispatch]);
  console.log(product)
  return (
    <div>
      {/* <!--================Home Banner Area =================--> */}
      <section class="home_banner_area mb-40">
        <div class="banner_inner d-flex align-items-center">
          <div class="container">
            <div class="banner_content row">
              <div class="col-lg-12">
                <p class="sub text-uppercase">men Collection</p>
                <h3>
                  <span>Show</span> Your <br />
                  Personal <span>Style</span>
                </h3>
                <h4>Fowl saw dry which a above together place.</h4>
                <a class="main_btn mt-40" onClick={()=>navigate("/products")}>
                  View Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--================End Home Banner Area =================--> */}

      {/* <!-- Start feature Area --> */}
      <section class="feature-area section_gap_bottom_custom">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <a href="#" class="title">
                  <i class="flaticon-money"></i>
                  <h3>Money back gurantee</h3>
                </a>
                <p>Shall open divide a one</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <a href="#" class="title">
                  <i class="flaticon-truck"></i>
                  <h3>Free Delivery</h3>
                </a>
                <p>Shall open divide a one</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <a href="#" class="title">
                  <i class="flaticon-support"></i>
                  <h3>Alway support</h3>
                </a>
                <p>Shall open divide a one</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <a href="#" class="title">
                  <i class="flaticon-blockchain"></i>
                  <h3>Secure payment</h3>
                </a>
                <p>Shall open divide a one</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="feature_product_area section_gap_bottom_custom">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="main_title">
                <h2>
                  <span>Featured product</span>
                </h2>
                <p>Bring called seed first of third give itself now ment</p>
              </div>
            </div>
          </div>

          <div className="row">
            {product.map((product) => (
              <div class="col-lg-4 col-md-6" key={product.id}>
                <div class="single-product">
                  <div class="product-img">
                    <img
                      class="img-fluid w-100"
                      src={`http://127.0.0.1:8000/${product.ProductImage}`}
                      alt=""
                    />
                    <div class="p_icon">
                      <a>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Content;
