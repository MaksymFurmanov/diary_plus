import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPages/MainPage";
import LogInPage from "./components/MainPages/LogInPage";
import SystemNavigation from "./components/SystemNavigation/SystemNavigation";
import OrdersPage from "./components/Orders/OrdersPage";
import ProductionPage from "./components/Production/ProductionPage";
import ProductsPage from "./components/Products/ProductsPage";
import StockPage from "./components/Stocks/StockPage";
import AdminPage from "./components/Administration/AdminPage";
import TestingsPage from "./components/Testing/TestingsPage";
import QualityControlPage from "./components/QualityControl/QualityControlPage";
import AboutSystem from "./components/MainPages/AboutSystem";
import ProductInfo from "./components/Products/ProductInfo";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path={"/"}
                           element={<MainPage/>}/>
                    <Route path={"/log_in"}
                           element={<LogInPage/>}/>
                    <Route path={"/navigation"}
                           element={<SystemNavigation/>}/>
                    <Route path={"/orders/products_to_product"}
                           element={<OrdersPage/>}/>
                    <Route path={"/production"}
                           element={<ProductionPage/>}/>
                    <Route path={"/orders/raw_material"}
                           element={<OrdersPage/>}/>
                    <Route path={"/products"}
                           element={<ProductsPage/>}/>
                    <Route path={"/products/new_product"}
                           element={<ProductInfo existing={false}/>}/>
                    <Route path={"/products/edit/:productId"}
                           element={<ProductInfo existing={true}/>}/>
                    <Route path={"/stock/input"}
                           element={<StockPage/>}/>
                    <Route path={"/stock/output"}
                           element={<StockPage/>}/>
                    <Route path={"/testings/laboratory1"}
                           element={<TestingsPage/>}/>
                    <Route path={"/testings/laboratory2"}
                           element={<TestingsPage/>}/>
                    <Route path={"/quality_control"}
                           element={<QualityControlPage/>}/>
                    <Route path={"/admin"}
                           element={<AdminPage/>}/>
                    <Route path={"/about_system"}
                           element={<AboutSystem/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
