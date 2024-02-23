import {createContext, useContext} from "react";

const ServerContext = createContext(undefined);

const ServerProvider = ({children}) => {
    const API = "http://localhost:8083";

    return <ServerContext.Provider value={API}>
            {children}
    </ServerContext.Provider>
}

export default ServerProvider;

export const useServer = () => useContext(ServerContext);