import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .max(20, "username is too long")
        .required("username is required"),
      password: yup
        .string()
        .required("password required")
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/,
          "password must contain atleast one uppercase,lowercase,special charector"
        ),
      password2: yup
        .string()
        .oneOf([yup.ref("password"), "paassword must be same"]),
      email: yup
        .string("email is required")
        .matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "It is not a valid email"),
    }),
    onSubmit: async (user) => {
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/customer",
          user
        );
        console.log(data);
        formik.resetForm();
        navigate("/view");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  return (
    <div className="main">
      <form onSubmit={formik.handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={formik.values.username}
            name="username"
            onChange={formik.handleChange}
            placeholder="Enter your username"
          />
          <p>{formik.errors.username}</p>
        </label>
        <label>
          <p>Password</p>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <p>{formik.errors.password}</p>
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            value={formik.values.password2}
            onChange={formik.handleChange}
            type="password"
            name="password2"
            placeholder="Enter your password"
          />
          <p>{formik.errors.password2}</p>
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            placeholder="Enter your email"
          />
          <p>{formik.errors.email}</p>
        </label>
        <br></br>
        <button className="b1" type="submit">
          Sign in
        </button>
      </form>
      <br></br>
      <div className="span">
        <span>Already have an account?</span>
        <span onClick={() => navigate("/login")} className="t1">
          Sign up
        </span>
      </div>
    </div>
  );
}
export default SignUp;
