import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import LoginPage from "../pages/LoginPage";
import ProductViewPage from "../pages/ProductViewPage";
import SignUpPage from "../pages/SignUpPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
import ProductAdd from "../pages/ProductAdd";
import CheckoutPage from "../pages/CheckoutPage";
import AddressPage from "../pages/AddressPage";
import ProductsPage from "../pages/ProductsPage";
import AddressAddPage from "../pages/AddressAddPage";



function Router(){
    return(
        <Routes>
            <Route path="login" element={<Header/>}/>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/view" element={<ProductViewPage/>}/>
            <Route path="product/:id" element={<DetailPage/>}/>
            <Route path="signup" element={<SignUpPage/>}/>
            <Route path="cart" element={<CartPage/>}/>
            <Route path="dp" element={<ProductAdd/>}/>
            <Route path="checkout" element={<CheckoutPage/>}/>
            <Route path="address/:id" element={<AddressPage/>}/>
            <Route path="products" element={<ProductsPage/>}/>
            <Route path="address" element={<AddressAddPage/>}/>





        </Routes>
    )
}
export default Router;