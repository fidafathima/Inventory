import { useNavigate, useParams } from "react-router-dom";
import "../Header/Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Address() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      user: user.id,
      name: "",
      address: "",
      district: "",
      state: "",
      mobile: "",
      landmark: "",
      pincode: "",
      place: "",
      status: "0",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(20, "name is too long")
        .required("name is required"),
      address: yup.string().required("Address required"),
      district: yup.string("district is required"),
      state: yup.string("state is required"),
      mobile: yup.number("mobile number is required"),
      landmark: yup.string("landmark is required"),
      place: yup.string("place is required"),
      pincode: yup.number("pincode is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.put(
          `http://127.0.0.1:8000/ChangeAddress/${id}/`,
          values, {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          }
        );
        console.log(data);
        formik.resetForm();
        navigate("/checkout");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  return (
    <section class="checkout_area section_gap">
      <div class="container">
        <div class="billing_details">
          <form onSubmit={formik.handleSubmit}>
            <div class="row">
              <div class="col-lg-8">
                <h3>Billing Details</h3>
                <div class="col-md-6 form-group p_star">
                  <input
                    type="text"
                    class="form-control"
                    value={formik.values.name}
                    name="name"
                    onChange={formik.handleChange}
                  />
                  <span
                    class="placeholder"
                    data-placeholder="First name"
                  ></span>
                </div>

                <div class="col-md-6 form-group p_star">
                  <input
                    type="number"
                    class="form-control"
                    value={formik.values.mobile}
                    name="mobile"
                    onChange={formik.handleChange}
                  />
                  <span
                    class="placeholder"
                    data-placeholder="Phone number"
                  ></span>
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    class="form-control"
                    value={formik.values.landmark}
                    name="landmark"
                    onChange={formik.handleChange}
                    placeholder="Landmark"
                  />
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    class="form-control"
                    value={formik.values.district}
                    name="district"
                    onChange={formik.handleChange}
                    placeholder="District"
                  />
                </div>
                <div class="col-md-12 form-group p_star">
                  <input
                    type="text"
                    class="form-control"
                    value={formik.values.address}
                    name="address"
                    onChange={formik.handleChange}
                  />
                  <span
                    class="placeholder"
                    data-placeholder="Address line 01"
                  ></span>
                </div>

                <div class="col-md-12 form-group p_star">
                  <input
                    type="text"
                    class="form-control"
                    value={formik.values.place}
                    name="place"
                    onChange={formik.handleChange}
                  />
                  <span class="placeholder" data-placeholder="Town/City"></span>
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    class="form-control"
                    value={formik.values.state}
                    name="state"
                    onChange={formik.handleChange}
                    placeholder="State"
                  />
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="number"
                    class="form-control"
                    value={formik.values.pincode}
                    name="pincode"
                    onChange={formik.handleChange}
                    placeholder="Postcode/ZIP"
                  />
                </div>
                <div>                  
                  <input type="hidden" name="user" value={formik.values.user} />
                </div>
              </div>
              <div class="col-lg-4">
                <div class="order_box">
                  <h2>Your Order</h2>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>,k</td>
                        <td>gn</td>
                      </tr>
                      <tr>
                        <td>SUBTOTAL</td>
                        <td>gn</td>
                      </tr>
                      <tr>
                        <td>SHIPPING</td>
                        <td>gn</td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>gn</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="payment_item">
                    <div class="radion_btn">
                      <input type="radio" id="f-option5" name="selector" />
                      <label for="f-option5">Check payments</label>
                      <div class="check"></div>
                    </div>
                    <p>
                      Please send a check to Store Name, Store Street, Store
                      Town, Store State / County, Store Postcode.
                    </p>
                  </div>
                  <div class="payment_item active">
                    <div class="radion_btn">
                      <input type="radio" id="f-option6" name="selector" />
                      <label for="f-option6">Paypal </label>
                      <img src="img/product/single-product/card.jpg" alt="" />
                      <div class="check"></div>
                    </div>
                    <p>
                      Please send a check to Store Name, Store Street, Store
                      Town, Store State / County, Store Postcode.
                    </p>
                  </div>
                  <div class="creat_account">
                    <input type="checkbox" id="f-option4" name="selector" />
                    <label for="f-option4">I’ve read and accept the </label>
                    <a href="#">terms & conditions*</a>
                  </div>
                  <button class="main_btn" type="submit">
                    Proceed to Paypal
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Address;
