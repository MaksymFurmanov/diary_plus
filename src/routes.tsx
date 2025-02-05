import Main from "./pages/Main";
import LoginPage from "./pages/LoginPage";
import SystemNavigation from "./pages/SystemNavigation";
import DashboardPage from "./pages/DashboardPage";
import ProductionPage from "./pages/ProductionPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import StockPage from "./pages/StockPage";
import QualityControlPage from "./pages/QualityControlPage";
import Administration from "./pages/Administration";
import EmployeePage from "./pages/EmployeePage";
import OrderPage from "./pages/OrderPage";
import MaterialPage from "./pages/MaterialPage";
import {ReactNode} from "react";
import OrderInputProvider from "./providers/OrderInputProvider";
import MaterialInputProvider from "./providers/MaterialInputProvider";
import TestingsPage from "./pages/TestingsPage";
import EmployeeInputProvider from "./providers/EmployeeInputProvider";
import SelectedStockPlacesProvider from "./providers/SelectedStockPlacesProvider";
import ProductInputProvider from "./providers/ProductInputProvider";

type Route = {
    path: string,
    element: ReactNode
}

const routes: Route[] = [
    {
        path: "/",
        element: <Main/>
    },
    {
        path: "/log_in",
        element: <LoginPage/>
    },
    {
        path: "/navigation",
        element: <SystemNavigation/>
    },
    {
        path: "/dashboard/orders",
        element: <DashboardPage type={"orders"}/>
    },
    {
        path: "/dashboard/materials",
        element: <DashboardPage type={"materials"}/>
    },
    {
        path: "/orders/new_order",
        element: (
            <OrderInputProvider>
                <OrderPage existing={false}/>
            </OrderInputProvider>
        )
    },
    {
        path: "/orders/:orderId",
        element: (
            <OrderInputProvider>
                <OrderPage existing={true}/>
            </OrderInputProvider>
        )
    },
    {
        path: "/materials/new_material",
        element: (
            <MaterialInputProvider>
                <MaterialPage existing={false}/>
            </MaterialInputProvider>
        )
    },
    {
        path: "/materials/:materialId",
        element: (
            <MaterialInputProvider>
                <MaterialPage existing={true}/>
            </MaterialInputProvider>
        )
    },
    {
        path: "/production",
        element: <ProductionPage/>
    },
    {
        path: "/products",
        element: <ProductsPage/>
    },
    {
        path: "/products/new_product",
        element: <ProductPage existing={false}/>
    },
    {
        path: "/products/:productId",
        element: <ProductInputProvider>
            <ProductPage existing={true}/>
        </ProductInputProvider>
    },
    {
        path: "/stock/:type",
        element: <SelectedStockPlacesProvider>
            <StockPage/>
        </SelectedStockPlacesProvider>
    },
    {
        path: "/testings/:laboratory_type",
        element: <TestingsPage/>
    },
    {
        path: "/quality_control",
        element: <QualityControlPage/>
    },
    {
        path: "/admin",
        element: <Administration/>
    },
    {
        path: "/admin/new_employee",
        element: <EmployeeInputProvider>
            <EmployeePage existing={false}/>
        </EmployeeInputProvider>
    },
    {
        path: "/admin/:employeeId",
        element: <EmployeeInputProvider>
            <EmployeePage existing={true}/>
        </EmployeeInputProvider>
    },
];

export default routes
