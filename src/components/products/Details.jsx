import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Details() {
  const { id } = useParams();
  const [products, setProduct] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      user: user?.id,
      item: products.id,
      quantity0: 1,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!user || !user.token) {
        toast.error("You need to be logged in to add items to the cart.");
        return;
      }
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/AddToCart/${id}/`,
          values,
          {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          }
        );
        console.log(response);
        console.log(response.data.detail);
        toast.success("Item added to cart");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.success("item can't add to cart");
      }
    },
  });
  console.log(user);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/PDetail/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div class="product_image_area">
      <div class="container">
        <div class="row s_product_inner">
          <div class="col-lg-6">
            <div class="s_product_img">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    class="active"
                  >
                    <img
                    class="d-block w-100"
                      src={`http://127.0.0.1:8000/${products.ProductImage}`}
                      alt=""
                    />
                  </li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  >
                    <img
                    class="d-block w-100"
                      src={`http://127.0.0.1:8000/${products.ProductImage}`}
                      alt=""
                    />
                  </li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  >
                    <img
                    class="d-block w-100"
                      src={`http://127.0.0.1:8000/${products.ProductImage}`}
                      alt=""
                    />
                  </li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      class="d-block w-100"
                      src={`http://127.0.0.1:8000/${products.ProductImage}`}
                      alt="First slide"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={`http://127.0.0.1:8000/${products.ProductImage}`}
                      alt="Second slide"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={`http://127.0.0.1:8000/${products.ProductImage}`}
                      alt="Third slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1">
            <div class="s_product_text">
              <h3>{products.ProductName}</h3>
              <h2>$149.99</h2>
              <ul class="list">
                <li>
                  <a class="active" href="#">
                    <span>Category</span> : Household
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Availibility</span> : In Stock
                  </a>
                </li>
              </ul>
              <p>
                Mill Oil is an innovative oil filled radiator with the most
                modern technology. If you are looking for something that can
                make your interior look awesome, and at the same time give you
                the pleasant warm feeling during the winter.
              </p>
              <div class="card_area">
                <form onSubmit={formik.handleSubmit}>
                  <input type="hidden" name="item" value={formik.values.item} />
                  <input type="hidden" name="user" value={formik.values.user} />
                  <input
                    type="hidden"
                    name="quantity0"
                    min="1"
                    value={formik.values.quantity0}
                    onChange={formik.handleChange}
                  />
                  <button type="submit" class="main_btn">Add to Cart</button>
                </form>
                <a class="icon_btn" href="#">
                  <i class="lnr lnr lnr-diamond"></i>
                </a>
                <a class="icon_btn" href="#">
                  <i class="lnr lnr lnr-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
