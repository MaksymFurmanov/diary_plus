import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {ProductInput} from "../types";

export type ProductType = {
    product: ProductInput;
    setProduct: Dispatch<SetStateAction<ProductInput>>
}

const ProductInputContext =
    createContext<ProductType | undefined>(undefined);

const initialState: ProductInput = {
    id: undefined,
    name: "",
    type: "",
    per_pallet: 20,
    img_url: undefined,
    imageDisplay: null,
    imageFile: null,
    quality_standards_url: undefined,
    standardsDisplay: null,
    standardsFile: null,
    productionProcesses: [],
    changed: false
}

const ProductInputProvider = ({children}: {
    children: ReactNode
}) => {
    const [product, setProduct] = useState<ProductInput>(initialState);

    return (
        <ProductInputContext.Provider value={{product, setProduct}}>
            {children}
        </ProductInputContext.Provider>
    );
}

export const useProductInput = () => {
    const context = useContext(ProductInputContext);
    if (!context) {
        throw new Error("Product context is not found");
    }
    return context;
};

export default ProductInputProvider;