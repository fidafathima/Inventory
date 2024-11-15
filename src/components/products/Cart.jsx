import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./product.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [amount, setAmount] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const onUpdate = (item) => {
    setCart((items) =>
      items.map((task) => (task.id === item.id ? item : task))
    );
  };
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
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const handleQuantity = async (values) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/ChangeQuantity/${values.id}/`,
        {
          quantity0: values.quantity0,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token})}`,
        //   },
        // }
      );
      console.log(response.data);
      onUpdate(response.data);
      toast.success(" updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Item Out of stock");
    }
  };
  const RemoveQuantity = async (values) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/Remove/${values.id}/`,
        {
          quantity0: values.quantity0,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token})}`,
        //   },
        // }
      );
      console.log(response.data);
      onUpdate(response.data);
      toast.success(" updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update .");
    }
  };
  const RemoveItem = async (values) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/RemoveItem/${values.id}/`,
        {
          status: values.status,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token})}`,
        //   },
        // }
      );
      console.log(response.data);
      onUpdate(response.data);
      toast.success(" updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update .");
    }
  };

  useEffect(() => {
    let total = 0;

    // Calculate total using a for loop
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if(item.status==="0")
      total += item.quantity0 * item.item.ProductCode; // Assuming `id` is the price or cost
    
    }
    // Calculate total using reduce
    // const total = cart.reduce((sum, item) => {
    //     return sum + item.quantity0 * item.id;
    // }, 0);
   
    // Update total amount once after calculation
    setAmount(total); 
  }, [cart]);

  console.log(cart);
  console.log(amount);
  return (
    <div class="cart_area"> 
      {cart.length === 0 ? (
        <h3>No items added to cart</h3>
      ) : (
        <div>
          <section class="cart_area">
            <div class="container">
              <div class="cart_inner">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(
                        (product) =>
                          product.status === "0" && (
                            <tr key={product.id}>
                              <td>
                                <div class="media">
                                  <div class="d-flex">
                                    <img
                                      className="image1"
                                      src={`http://127.0.0.1:8000/${product.item.ProductImage}`}
                                      alt=""
                                    />
                                  </div>
                                  <div class="media-body">
                                    <p>
                                    {product.item.ProductName}                                    
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <h5>{product.item.ProductCode}</h5>
                              </td>
                              <td>
                                <div class="product_count">
                                  <input
                                    type="number"
                                    value={product.quantity0}
                                    class="input-text qty"
                                  />
                                  <button class="increase items-count">
                                    <i
                                      class="lnr lnr-chevron-up"
                                      onClick={() => handleQuantity(product)}
                                    ></i>
                                  </button>
                                  <button class="reduced items-count">
                                    <i
                                      class="lnr lnr-chevron-down"
                                      onClick={() => RemoveQuantity(product)}
                                    ></i>
                                  </button>
                                </div>
                              </td>
                              <td>
                                <h5>{(product.quantity0)*(product.item.ProductCode)}</h5>
                              </td>
                              <td>
                                <button class="gray_btn">
                                  <i onClick={() => RemoveItem(product)}>
                                    Remove
                                  </i>
                                </button>
                              </td>
                            </tr>
                          )
                      )}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>{amount}</h5>
                        </td>
                      </tr>
                      <tr class="shipping_area">
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Shipping</h5>
                        </td>
                        <td>
                          <h5>50</h5>
                        </td>
                      </tr>
                      <tr class="shipping_area">
                        <td></td>
                        <td></td>
                        <td>
                          <h5>Total</h5>
                        </td>
                        <td>
                          <h5>{amount + 50}</h5>
                        </td>
                      </tr>
                      <tr class="out_button_area">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div class="checkout_btn_inner">
                            <a class="gray_btn">Continue Shopping</a>
                            <a class="main_btn" onClick={()=>navigate("/checkout")}>Proceed to checkout</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
export default Cart;
