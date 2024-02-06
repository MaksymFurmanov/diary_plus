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
import QualityControlPage from "./components/Testing/QualityControlPage";
import AdminPage from "./components/Administration/AdminPage";
import AboutSystem from "./components/MainPages/AboutSystem";
import OutputStockProvider from "./providers/OutputStockProvider";
import EnteryStockProvider from "./providers/EnteryStockProvider";
import OrdersProvider from "./providers/OrdersProvider";
import MaterialsProvider from "./providers/MaterialsProvider";
import EmployeeInfo from "./components/Administration/EmployeeInfo";
import OrderInfo from "./components/Orders/OrderInfo";
import MaterialInfo from "./components/Orders/MaterialInfo";
import DepartmentsProvider from "./providers/DepartmentsProvider";
import EmployeesProvider from "./providers/EmployeesProvider";
import ProductionProcessesProvider from "./providers/ProductionProcessesProvider";
import ProductsProvider from "./providers/ProductsProvider";
import TestMaterialsProvider from "./providers/TestMaterialsProvider";
import TestProductsProvider from "./providers/TestProductsProvider";

const routes = [
    {
        path: "/",
        element: <MainPage/>,
        providers: []
    },
    {
        path: "/log_in",
        element: <LogInPage/>,
        providers: [UserProvider]
    },
    {
        path: "/navigation",
        element: <SystemNavigation/>,
        providers: [UserProvider]
    },
    {
        path: "/orders/:type",
        element: <OrdersPage/>,
        providers: [UserProvider,
            OrdersProvider,
            MaterialsProvider,
            OrdersProvider,
            ProductionProcessesProvider,
            ProductsProvider]
    },
    {
        path: "/orders/products_to_product/new_order",
        element: <OrderInfo existing={false}/>,
        providers: [UserProvider,
            ProductsProvider,
            OrdersProvider]
    },
    {
        path: "/orders/products_to_product/:orderId",
        element: <OrderInfo existing={true}/>,
        providers: [UserProvider,
            ProductsProvider,
            OrdersProvider]
    },
    {
        path: "/orders/raw_materials/new_order_material",
        element: <MaterialInfo existing={false}/>,
        providers: [MaterialsProvider]
    },
    {
        path: "/orders/raw_materials/:materialId",
        element: <MaterialInfo existing={true}/>,
        providers: [UserProvider,
            MaterialsProvider]
    },
    {
        path: "/production",
        element: <ProductionPage/>,
        providers: [UserProvider,
            ProductsProvider,
            DepartmentsProvider,
            OrdersProvider,
            ProductionProcessesProvider]
    },
    {
        path: "/products",
        element: <ProductsPage/>,
        providers: [UserProvider,
            ProductsProvider]
    },
    {
        path: "/products/new_product",
        element: <ProductInfo existing={false}/>,
        providers: [UserProvider,
            ProductsProvider,
            ProductionProcessesProvider]
    },
    {
        path: "/products/edit/:productId",
        element: <ProductInfo existing={true}/>,
        providers: [UserProvider,
            ProductsProvider,
            ProductionProcessesProvider]
    },
    {
        path: "/stock/:type",
        element: <StockPage/>,
        providers: [UserProvider, OutputStockProvider,
            EnteryStockProvider,
            MaterialsProvider,
            OrdersProvider,
            ProductsProvider]
    },
    {
        path: "/testings/:laboratory",
        element: <TestingsPage/>,
        providers: [UserProvider,
            MaterialsProvider,
            OrdersProvider,
            ProductsProvider,
            TestMaterialsProvider,
            TestProductsProvider]
    },
    {
        path: "/quality_control",
        element: <QualityControlPage/>,
        providers: [UserProvider,
            MaterialsProvider,
            OrdersProvider,
            ProductsProvider,
            TestMaterialsProvider,
            TestProductsProvider]
    },
    {
        path: "/admin",
        element: <AdminPage/>,
        providers: [UserProvider,
            DepartmentsProvider, EmployeesProvider]
    },
    {
        path: "/admin/new_employee",
        element: <EmployeeInfo existing={false}/>,
        providers: [UserProvider,
            DepartmentsProvider,
            EmployeesProvider]
    },
    {
        path: "/admin/edit/:employeeId",
        element: <EmployeeInfo existing={true}/>,
        providers: [UserProvider,
            DepartmentsProvider,
            EmployeesProvider]
    },
    {
        path: "/about_system",
        element: <AboutSystem/>,
        providers: [UserProvider]
    }
];

export default routes
