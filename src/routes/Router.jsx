import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import ProductViewPage from "../pages/ProductViewPage";

function Router(){
    return(
        <Routes>
            <Route path="login" element={<Header/>}/>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="p" element={<ProductPage/>}/>
            <Route path="/view" element={<ProductViewPage/>}/>
        </Routes>
    )
}
export default Router;