import {createContext, useContext} from "react";

const ServerContext = createContext(undefined);
const DriveContext = createContext(undefined);

const ServerProvider = ({children}) => {
    const API = "http://localhost:8083";
    const drive = null;

    return <ServerContext.Provider value={API}>
        <DriveContext.Provider value={drive}>
            {children}
        </DriveContext.Provider>
    </ServerContext.Provider>
}

export default ServerProvider;

export const useServer = () => useContext(ServerContext);

export const useDrive = () => useContext(DriveContext);