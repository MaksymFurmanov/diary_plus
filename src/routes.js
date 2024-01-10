import MainPage from "./components/MainPages/MainPage";
import UserProvider from "./providers/UserProvider";
import LogInPage from "./components/MainPages/LogInPage";
import SystemNavigation from "./components/SystemNavigation/SystemNavigation";
import OrdersPage from "./components/Orders/OrdersPage";
import ProductionPage from "./components/Production/ProductionPage";
import ProductsPage from "./components/Products/ProductsPage";
import ProductInfo from "./components/Products/ProductInfo";
import StockPage from "./components/Stocks/StockPage";
import TestingsPage from "./components/Testing/TestingsPage";
import QualityControlPage from "./components/QualityControl/QualityControlPage";
import AdminPage from "./components/Administration/AdminPage";
import AboutSystem from "./components/MainPages/AboutSystem";
import OutputStockProvider from "./providers/OutputStockProvider";
import EnteryStockProvider from "./providers/EnteryStockProvider";

const routes = [
    {
        path: "/",
        element: <MainPage />,
        providers: []
    },
    {
        path: "/log_in",
        element: <LogInPage />,
        providers: [UserProvider]
    },
    {
        path: "/navigation",
        element: <SystemNavigation />,
        providers: [UserProvider]
    },
    {
        path: "/orders/products_to_product",
        element: <OrdersPage />,
        providers: []
    },
    {
        path: "/production",
        element: <ProductionPage />,
        providers: [UserProvider]
    },
    {
        path: "/orders/raw_material",
        element: <OrdersPage />,
        providers: []
    },
    {
        path: "/products",
        element: <ProductsPage />,
        providers: []
    },
    {
        path: "/products/new_product",
        element: <ProductInfo existing={false} />,
        providers: []
    },
    {
        path: "/products/edit/:productId",
        element: <ProductInfo existing={true} />,
        providers: []
    },
    {
        path: "/stock/:type",
        element: <StockPage />,
        providers: [OutputStockProvider,
            EnteryStockProvider]
    },
    {
        path: "/testings/laboratory1",
        element: <TestingsPage />,
        providers: []
    },
    {
        path: "/testings/laboratory2",
        element: <TestingsPage />,
        providers: []
    },
    {
        path: "/quality_control",
        element: <QualityControlPage />,
        providers: []
    },
    {
        path: "/admin",
        element: <AdminPage />,
        providers: []
    },
    {
        path: "/about_system",
        element: <AboutSystem />,
        providers: []
    }
];

export default routes
