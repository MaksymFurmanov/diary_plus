import {createContext, useContext, useState} from "react";
import productsData from "../data/products";

const ProductsContext = createContext(undefined);
const SetProductsContext = createContext(undefined);

const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(productsData);

    return <SetProductsContext.Provider value={setProducts}>
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    </SetProductsContext.Provider>
}

export const useProducts = () => useContext(ProductsContext);
export const useSetProducts = () => useContext(SetProductsContext);

export default ProductsProvider