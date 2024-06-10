import { useNavigate } from "react-router-dom";
import "./product.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import ProductContext from "../../contexts/ProductContext";
import convertToBase64 from "../../utils/imageConverter";
import { toast } from "react-toastify";

function Adding() {
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const { setProduct } = useContext(ProductContext);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      ProductID: "",
      ProductName: "",
      ProductCode: "",
      CreatedUser: user?.id,
      ProductImage: "",
      size: "",
      product_color:"",
      TotalStock: "",
      UpdatedDate: "",
      IsFavourite: false,
      Active: false,
      HSNCode: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ProductID: yup.string().max(20).required("id is required"),
      ProductName: yup.string().required("Name is required"),
      ProductCode: yup.string().required("Code is required"),
      // ProductImage: yup.string(),
      size: yup.string().required("select size"),
      product_color: yup.string().required("select size"),
      TotalStock: yup.string().required(" Add stock"),
      UpdatedDate: yup.string().required("add date"),
      IsFavourite: yup.string().required(),
      Active: yup.string().required(),
      HSNCode: yup.string()
    }),
    onSubmit: async (product) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/product",
          product
        );
        console.log(response);

        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const convert = async (file) => {
    try {
      const image64 = await convertToBase64(file);
      setImage(image64);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get("http://127.0.0.1:8000/size");
        setSize(data);
        const response = await axios.get("http://127.0.0.1:8000/color");
        setColor(response.data);
        console.log(response);
        // setLoading(false);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  console.log(formik.values);
  console.log(formik.errors);
  return (
    
    <div className="main">
      <button className="b11" onClick={() => navigate("/view")}>
          All products
        </button>
      <form onSubmit={formik.handleSubmit}>
        <label>
          <p>ProductID</p>
          <input
            placeholder="Enter your ProductID"
            type="text"
            value={formik.values.ProductID}
            name="ProductID"
            onChange={formik.handleChange}
          />
        </label>
        <label>
          <p>ProductName</p>
          <input
            placeholder="Enter your password"
            value={formik.values.ProductName}
            onChange={formik.handleChange}
            type="text"
            name="ProductName"
          />
        </label>
        <label>
          <p>ProductCode</p>
          <input
            placeholder="Enter your password"
            value={formik.values.ProductCode}
            onChange={formik.handleChange}
            type="text"
            name="ProductCode"
          />
        </label>
        <label>
          <p>size</p>
          <select  value={formik.values.size} onChange={formik.handleChange} name="size" >
            <option selected>Select a size</option>
            {size.map((ele) => (
              <option value={ele.id}>
                {ele.size}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>size</p>
          <select name="product_color" onChange={formik.handleChange} value={formik.values.product_color}>
            <option selected>Select a Color</option>
            {color.map((ele) => (
              <option value={ele.id} >
                {ele.color}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>TotalStock</p>
          <input
           
            value={formik.values.TotalStock}
            onChange={formik.handleChange}
            type="text"
            name="TotalStock"
          />
        </label>
        <label>
          <p>UpdatedDate</p>
          <input
      
            value={formik.values.UpdatedDate}
            onChange={formik.handleChange}
            type="date"
            name="UpdatedDate"
          />
        </label>
        <label>
          <p>IsFavorite</p>
          <input
            
            value={formik.values.IsFavorite}
            onChange={formik.handleChange}
            type="Checkbox"
            name="IsFavorite"
          />
        </label>
        <label>
          <p>Active</p>
          <input
            
            value={formik.values.Active}
            onChange={formik.handleChange}
            type="Checkbox"
            name="Active"
          />
        </label>
        <label>
          <p>HCN</p>
          <input
        
            value={formik.values.HSNCode}
            onChange={formik.handleChange}
            type="text"
            name="HSNCode"
          />
        </label>

        <label>
          <p>Image</p>
          <input
            placeholder="Enter your password"
            onChange={(e) =>
              formik.setFieldValue("ProductImage", `${e.target.files}`)
            }
            type="file"
            name="ProductImage"
          />
        </label>
        <br></br>
        <button className="b1" type="submit">
          Save
        </button>
      </form>
      <br></br>
    </div>
  );
}
export default Adding;
