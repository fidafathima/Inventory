import { useNavigate } from "react-router-dom";
import "./product.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import ProductContext from "../../contexts/ProductContext";
import { toast } from "react-toastify";

function Adding() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      ProductID: "",
      ProductName: "",
      ProductCode: "",
      ProductImage: null,
      TotalStock: "",
      UpdatedDate: "",
      IsFavourite: false,
      Active: false,
      
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ProductID: yup.string().max(20).required("id is required"),
      ProductName: yup.string().required("Name is required"),
      ProductCode: yup.string().required("Code is required"),
      ProductImage: yup.mixed(),
      TotalStock: yup.string().required(" Add stock"),
      UpdatedDate: yup.string().required("add date"),
      IsFavourite: yup.string().required(),
      Active: yup.string().required(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('ProductID', values.ProductID);
      formData.append('ProductName', values.ProductName);
      formData.append('ProductCode', values.ProductCode);
      formData.append('TotalStock', values.TotalStock);
      formData.append('UpdatedDate', values.UpdatedDate);
      formData.append('IsFavourite', values.IsFavourite);
      formData.append('Active', values.Active);
      if (values.ProductImage) {
        formData.append('ProductImage', values.ProductImage);
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/product",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log(response);

        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
    },
  });
  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    // }
  }, [user]);
  console.log(formik.values);
  console.log(formik.errors);
  return (
    
    <div className="main">
      <button className="b11" onClick={() => navigate("/view")}>
          All products
        </button>
      <form onSubmit={formik.handleSubmit} >
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
            
            value={formik.values.IsFavourite}
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
          <p>Image</p>
          <input
            onChange={(e) =>
              formik.setFieldValue("ProductImage", e.target.files[0])
            }
            type="file"
            name="ProductImage"
            accept="image/*"
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
