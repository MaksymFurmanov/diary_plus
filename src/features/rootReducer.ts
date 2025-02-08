import { combineReducers } from "@reduxjs/toolkit";
import departmentReducer from "./departmentsSlice";
import entryStockReducer from "./enteryStockPlacesSlice";
import outputStockReducer from "./outputStockPlacesSlice";
import employeeReducer from "./employeesSlice";
import materialReducer from "./materialsSlice";
import materialTestReducer from "./materialsTestsSlice";
import productReducer from "./productsSlice";
import ordersReducer from "./ordersSlice";
import productTestReducer from "./productsTestsSlice";
import productionProcessReducer from "./productionProcessesSlice";
import userReducer from "./usersSlice";

const rootReducer = combineReducers({
    departments: departmentReducer,
    entryStockPlaces: entryStockReducer,
    outputStockPlaces: outputStockReducer,
    employees: employeeReducer,
    materials: materialReducer,
    orders: ordersReducer,
    materialsTests: materialTestReducer,
    products: productReducer,
    productsTests: productTestReducer,
    productionProcesses: productionProcessReducer,
    users: userReducer
});

export default rootReducer;
