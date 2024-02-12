import MainPage from "./components/MainPages/MainPage";
import LogInPage from "./components/MainPages/LogInPage";
import SystemNavigation from "./components/SystemNavigation/SystemNavigation";
import OrdersPage from "./components/Orders/OrdersPage";
import ProductionPage from "./components/Production/ProductionPage";
import ProductsPage from "./components/Products/ProductsPage";
import ProductInfo from "./components/Products/ProductInfo";
import StockPage from "./components/Stocks/StockPage";
import TestingsPage from "./components/Testing/TestingsPage";
import QualityControlPage from "./components/Testing/QualityControlPage";
import AdminPage from "./components/Administration/AdminPage";
import AboutSystem from "./components/MainPages/AboutSystem";
import EmployeeInfo from "./components/Administration/EmployeeInfo";
import OrderInfo from "./components/Orders/OrderInfo";
import MaterialInfo from "./components/Orders/MaterialInfo";

const routes = [
    {
        path: "/",
        element: <MainPage/>,

    },
    {
        path: "/log_in",
        element: <LogInPage/>,

    },
    {
        path: "/navigation",
        element: <SystemNavigation/>,
    },
    {
        path: "/orders/:type",
        element: <OrdersPage/>,
    },
    {
        path: "/orders/products_to_product/new_order",
        element: <OrderInfo existing={false}/>
    },
    {
        path: "/orders/products_to_product/:orderId",
        element: <OrderInfo existing={true}/>
    },
    {
        path: "/orders/raw_materials/new_order_material",
        element: <MaterialInfo existing={false}/>,
    },
    {
        path: "/orders/raw_materials/:materialId",
        element: <MaterialInfo existing={true}/>,
    },
    {
        path: "/production",
        element: <ProductionPage/>,
    },
    {
        path: "/products",
        element: <ProductsPage/>,
    },
    {
        path: "/products/new_product",
        element: <ProductInfo existing={false}/>,
    },
    {
        path: "/products/edit/:productId",
        element: <ProductInfo existing={true}/>,
    },
    {
        path: "/stock/:type",
        element: <StockPage/>,
    },
    {
        path: "/testings/:laboratory",
        element: <TestingsPage/>,
    },
    {
        path: "/quality_control",
        element: <QualityControlPage/>,
    },
    {
        path: "/admin",
        element: <AdminPage/>,
    },
    {
        path: "/admin/new_employee",
        element: <EmployeeInfo existing={false}/>
    },
    {
        path: "/admin/edit/:employeeId",
        element: <EmployeeInfo existing={true}/>,
    },
    {
        path: "/about_system",
        element: <AboutSystem/>,
    }
];

export default routes
