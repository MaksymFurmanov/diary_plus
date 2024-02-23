import {createContext, useContext, useState} from "react";

const PlacesToChangeContext = createContext(undefined);
const SetPlacesToChangeContext = createContext(undefined);

const PlacesToChangeProvider = ({children}) => {
    const [placesToChange, setPlacesToChange] = useState([]);

    return <SetPlacesToChangeContext.Provider value={setPlacesToChange}>
        <PlacesToChangeContext.Provider value={placesToChange}>
            {children}
        </PlacesToChangeContext.Provider>
    </SetPlacesToChangeContext.Provider>
}

export const usePlacesToChange = () => useContext(PlacesToChangeContext);
export const useSetPlacesToChange = () => useContext(SetPlacesToChangeContext);

export default PlacesToChangeProvider