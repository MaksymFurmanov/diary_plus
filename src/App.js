import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import ServerProvider from "./providers/ServerProvider";
import UserProvider from "./providers/UserProvider";

function App() {
    const routesItems = routes.map((route, index) => (
        <Route key={index}
               path={route.path}
               element={route.providers.length > 0
                   ? route.providers.reduceRight((acc,
                                                  Provider) =>
                       <Provider>{acc}</Provider>, route.element)
                   : route.element
               }/>
    ));

    return (
        <BrowserRouter>
            <ServerProvider>
                <UserProvider>
                    <div className="App">
                        <Routes>
                            {routesItems}
                        </Routes>
                    </div>
                </UserProvider>
            </ServerProvider>
        </BrowserRouter>
    );
}

export default App;
