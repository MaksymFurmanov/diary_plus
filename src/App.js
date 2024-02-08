import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import ServerProvider from "./providers/SereverProvider";


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
    ))

    return (
        <BrowserRouter>
            <ServerProvider>
                <div className="App">
                    <Routes>
                        {routesItems}
                    </Routes>
                </div>
            </ServerProvider>
        </BrowserRouter>
    );
}

export default App;
