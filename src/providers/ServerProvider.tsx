import {createContext, ReactNode, useContext} from "react";

const ServerContext = createContext<string | undefined>(undefined);

const ServerProvider = ({children}: {
    children: ReactNode;
}) => {
    const API = "http://localhost:8083";

    return (
        <ServerContext.Provider value={API}>
            {children}
        </ServerContext.Provider>
    );
}

export default ServerProvider;

export const useServer = () => useContext(ServerContext);