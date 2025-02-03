import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

interface PlacesContextType {
    places: string[];
    setPlaces: Dispatch<SetStateAction<string[]>>;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

const SelectedStockPlacesProvider = ({children}: {
    children: ReactNode,
}) => {
    const [places, setPlaces] = useState<string[]>([]);

    return (
        <PlacesContext.Provider value={{places, setPlaces}}>
            {children}
        </PlacesContext.Provider>
    );
}

export const useSelectedStockPlaces = () => {
    const context = useContext(PlacesContext);
    if (!context) {
        throw new Error("Order context is not found");
    }
    return context;
};
export default SelectedStockPlacesProvider;