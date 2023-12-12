import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage";
import LogInPage from "./components/LogInPage";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"/"} element={<LogInPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
