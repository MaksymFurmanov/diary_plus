import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import ServerProvider from "./providers/ServerProvider";
import UserProvider from "./providers/UserProvider";

function App() {
    return (
        <BrowserRouter>
            <ServerProvider>
                <UserProvider>
                    <div className="App">
                        <Routes>
                            {routes.map((route, index) => (
                                <Route key={index}
                                       path={route.path}
                                       element={route.element}
                                />
                            ))}
                        </Routes>
                    </div>
                </UserProvider>
            </ServerProvider>
        </BrowserRouter>
    );
}

export default App;
