import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./product.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [amount, setAmount] = useState([]);
  const [payment, setPayment] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      user: user.id,
      delivery: address.id,
      payment: "",
      product: cart,
      amount: amount,
      customer_email: user.email,
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `http://127.0.0.1:8000/Checkout`,
          values,
          {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          }
        );
        console.log(data);
        formik.resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Error placing order. Please try again.");
      }
    },
  });
  useEffect(() => {
    if (!user || !user.token) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/CartView", {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        setLoading(false);
        setCart(data);
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          const item = cart[i];
          if (item.status === "0")
            total += item.quantity0 * item.item.ProductCode;

          if (address.length === 0) {
            navigate("/address");
          }
        }
        setAmount(total);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [user, navigate]);
  useEffect(() => {
    if (!user || !user.token) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
    (async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/address", {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        setLoading(false);
        setAddress(response.data.delivery);
        setPayment(response.data.payment);
        if (data.delivery && data.delivery.length === 0) {
          toast.info("Please add a delivery address.");
          navigate("/address");
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handlePaymentSelection = (pay) => {
    setSelectedPayment(pay.id);
    formik.setFieldValue("payment", pay.id);
  };

  const handleAddressSelection = (addr) => {
    setSelectedAddress(addr.id);
    formik.setFieldValue("delivery", addr.id);
  };
  // useEffect(() => {
  //   let total = 0;
  //   for (let i = 0; i < cart.length; i++) {
  //     const item = cart[i];
  //     if (item.status === "0") total += item.quantity0 * item.item.ProductCode;
      

  //     // if (address.length === 0) {
  //     //   navigate("/address");
  //     // }
  //   }
  //   setAmount(total);
  // }, [cart]);

  console.log(address);
  return (
    <section class="checkout_area section_gap">
      <div class="container">
        <div class="billing_details">
          <div class="row">
            <div class="col-lg-8">
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
                    {cart.map(
                      (item) =>
                        item.status === "0" && (
                          <tr key={item.id}>
                            <td>{item.item.ProductName}</td>
                            <td>{item.item.ProductCode * item.quantity0}</td>
                          </tr>
                        )
                    )}

                    <tr>
                      <td>SUBTOTAL</td>
                      <td>{amount}</td>
                    </tr>
                    <tr>
                      <td>SHIPPING</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td>TOTAL</td>
                      <td>{amount + 50}</td>
                    </tr>
                  </tbody>
                </table>
                {payment.map((pay) => (
                  <div key={pay.id}>
                    <div className="radion_btn">
                      <input
                        type="radio"
                        id={`payment-${pay.id}`}
                        name="payment"
                        onClick={() => handlePaymentSelection(pay)}
                        checked={selectedPayment === pay.id}
                        disabled={
                          selectedPayment !== null && selectedPayment !== pay.id
                        }
                      />
                      <label htmlFor={`payment-${pay.id}`}>
                        Card
                      </label>
                      <div className="check"></div>
                    </div>
                    <div class="payment_item active">
                      <div class="radion_btn">
                        <input
                          type="radio"
                          onClick={() => handlePayment(pay)}
                        />
                        <label for="f-option6"> Card </label>
                        <img src="img/product/single-product/card.jpg" alt="" />
                        <div class="check"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {address.map((address) => (
                  <div key={address.id}>
                    <input
                      type="radio"
                      id={`address-${address.id}`}
                      name="address"
                      onClick={() => handleAddressSelection(address)}
                      checked={selectedAddress === address.id}
                    />
                    <p>
                      {user.username},{address.mobile},{address.place},
                      {address.landmark},{address.pincode}
                    </p>

                    <i
                      class="main_btn"
                      onClick={() => navigate(`/address/${address.id}`)}
                    >
                      Change Address
                    </i>
                  </div>
                ))}

                <div class="creat_account">
                  <input type="checkbox" id="f-option4" name="selector" />
                  <label for="f-option4">I’ve read and accept the </label>
                  <a href="#">terms & conditions*</a>
                </div>
                <a class="main_btn" href="#">
                  Proceed to Paypal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Checkout;
