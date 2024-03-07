import MainPage from "./components/MainPages/MainPage";
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
import EmployeeInfo from "./components/Administration/EmployeeInfo";
import OrderInfo from "./components/Orders/OrderInfo";
import MaterialInfo from "./components/Orders/MaterialInfo";
import PlacesToChangeProvider from "./providers/PlacesToChangeProvider";
import EmployeesProvider from "./providers/EmployeesProvider";
import OrdersProvider from "./providers/OrdersProvider";
import MaterialsProvider from "./providers/MaterialsProvider";
import ProductsProvider from "./providers/ProductsProvider";
import TestsProductsProvider from "./providers/TestsProductsProvider";
import ProductionProcessesProvider from "./providers/ProductionProcessesProvider";
import DepartmentsProvider from "./providers/DepartmentsProvider";
import EntryStockProvider from "./providers/EntryStockProvider";
import OutputStockProvider from "./providers/OutputStockProvider";
import TestsMaterialsProvider from "./providers/TestsMaterialsProvider";

const routes = [
    {
        path: "/",
        element: <MainPage/>,
        providers: []
    },
    {
        path: "/log_in",
        element: <LogInPage/>,
        providers: [EmployeesProvider]
    },
    {
        path: "/navigation",
        element: <SystemNavigation/>,
        providers: []
    },
    {
        path: "/orders/:type",
        element: <OrdersPage/>,
        providers: [OrdersProvider,
            MaterialsProvider,
            ProductsProvider,
            ProductionProcessesProvider,
            TestsMaterialsProvider]
    },
    {
        path: "/orders/products_to_product/new_order",
        element: <OrderInfo existing={false}/>,
        providers: [OrdersProvider,
            ProductsProvider]
    },
    {
        path: "/orders/products_to_product/:orderId",
        element: <OrderInfo existing={true}/>,
        providers: [OrdersProvider,
            ProductsProvider]
    },
    {
        path: "/orders/raw_materials/new_order_material",
        element: <MaterialInfo existing={false}/>,
        providers: [MaterialsProvider]
    },
    {
        path: "/orders/raw_materials/:materialId",
        element: <MaterialInfo existing={true}/>,
        providers: [MaterialsProvider]
    },
    {
        path: "/production",
        element: <ProductionPage/>,
        providers: [OrdersProvider,
            ProductsProvider,
            TestsProductsProvider,
            ProductionProcessesProvider]
    },
    {
        path: "/products",
        element: <ProductsPage/>,
        providers: [ProductsProvider]
    },
    {
        path: "/products/new_product",
        element: <ProductInfo existing={false}/>,
        providers: [ProductsProvider,
            ProductionProcessesProvider,
            DepartmentsProvider]
    },
    {
        path: "/products/edit/:productId",
        element: <ProductInfo existing={true}/>,
        providers: [ProductsProvider,
            ProductionProcessesProvider,
            DepartmentsProvider]
    },
    {
        path: "/stock/:type",
        element: <StockPage/>,
        providers: [EntryStockProvider,
            OutputStockProvider,
            ProductsProvider,
            MaterialsProvider,
            OrdersProvider,
            PlacesToChangeProvider]

    },
    {
        path: "/testings/:laboratory",
        element: <TestingsPage/>,
        providers: [TestsProductsProvider,
            TestsMaterialsProvider,
            MaterialsProvider,
            ProductsProvider,
            OrdersProvider]
    },
    {
        path: "/quality_control",
        element: <QualityControlPage/>,
        providers: [MaterialsProvider,
            OrdersProvider,
            ProductsProvider,
            TestsMaterialsProvider,
            TestsProductsProvider]
    },
    {
        path: "/admin",
        element: <AdminPage/>,
        providers: [DepartmentsProvider,
            EmployeesProvider]
    },
    {
        path: "/admin/new_employee",
        element: <EmployeeInfo existing={false}/>,
        providers: [DepartmentsProvider,
            EmployeesProvider]
    },
    {
        path: "/admin/edit/:employeeId",
        element: <EmployeeInfo existing={true}/>,
        providers: [DepartmentsProvider,
            EmployeesProvider]
    },
    {
        path: "/about_system",
        element: <AboutSystem/>,
        providers: []
    }
];

export default routes
