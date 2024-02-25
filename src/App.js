import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import DepartmentsProvider from "./providers/DepartmentsProvider";
import EmployeesProvider from "./providers/EmployeesProvider";
import EntryStockProvider from "./providers/EntryStockProvider";
import MaterialsProvider from "./providers/MaterialsProvider";
import OrdersProvider from "./providers/OrdersProvider";
import OutputStockProvider from "./providers/OutputStockProvider";
import ProductionProcessesProvider from "./providers/ProductionProcessesProvider";
import ProductsProvider from "./providers/ProductsProvider";
import TestsMaterialsProvider from "./providers/TestsMaterialsProvider";
import TestsProductsProvider from "./providers/TestsProductsProvider";
import ServerProvider from "./providers/ServerProvider";
import UserProvider from "./providers/UserProvider";


const providers = [
    DepartmentsProvider,
    EmployeesProvider,
    ProductsProvider,
    ProductionProcessesProvider,
    OrdersProvider,
    MaterialsProvider,
    EntryStockProvider,
    OutputStockProvider,
    TestsMaterialsProvider,
    TestsProductsProvider,
];

function App() {
    const routesItems = routes.map((route, index) => (
        <Route key={index}
               path={route.path}
               element={route.element}/>
    ))

    const ProvidersTree = providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
    }, <Routes>{routesItems}</Routes>);

    return (
        <BrowserRouter>
            <ServerProvider>
                <UserProvider>
                    <div className="App">
                        {ProvidersTree}
                    </div>
                </UserProvider>
            </ServerProvider>
        </BrowserRouter>
    );
}

export default App;
