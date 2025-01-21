import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SystemNavigation from "./pages/SystemNavigation";
import DashboardPage from "./pages/DashboardPage";
import ProductionPage from "./pages/ProductionPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import StockPage from "./pages/StockPage";
import QualityControl from "./pages/QualityControl";
import Administration from "./pages/Administration";
import AboutSystem from "./pages/AboutSystem";
import EmployeeInfo from "./pages/EmployeeInfo";
import OrderPage from "./pages/OrderPage";
import MaterialPage from "./pages/MaterialPage";
import {ReactNode} from "react";
import OrderInputProvider from "./providers/OrderInputProvider";
import MaterialInputProvider from "./providers/MaterialInputProvider";
import TestingsPage from "./pages/TestingsPage";

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
        element: <LogIn/>
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
        element: <ProductPage existing={true}/>
    },
    {
        path: "/stock/:type",
        element: <StockPage/>
    },
    {
        path: "/testings/:laboratory",
        element: <TestingsPage/>
    },
    {
        path: "/quality_control",
        element: <QualityControl/>
    },
    {
        path: "/admin",
        element: <Administration/>
    },
    {
        path: "/admin/new_employee",
        element: <EmployeeInputProvider><EmployeeInfo existing={false}/></EmployeeInputProvider>
    },
    {
        path: "/admin/:employeeId",
        element: <EmployeeInputProvider><EmployeeInfo existing={true}/></EmployeeInputProvider>
    },
    {
        path: "/about_system",
        element: <AboutSystem/>
    }
];

export default routes
