import {Product, ProductInput} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import products from "../../initialData/products";

export const getProducts = (): Product[] => {
    const productsRaw = localStorage.getItem("products");
    return productsRaw ? JSON.parse(productsRaw) as Product[] : products;
};

export const getProductById = (productId?: string): Product | null => {
    if (!productId) return null;

    const products = getProducts();
    return products.find((product) => product.id === productId) || null;
};

export const createProduct = (productInput: ProductInput): Product[] => {
    const products = getProducts();

    const newProduct: Product = {
        id: nanoid(),
        name: productInput.name,
        type: productInput.type,
        per_pallet: productInput.per_pallet,
        img_url: productInput.img_url,
        quality_standards_url: productInput.quality_standards_url
    };

    const updatedProducts = [...products, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    return updatedProducts;
};

export const updateProduct = (productInput: ProductInput): Product[] => {
    const products = getProducts();

    const updatedProducts = products.map((product) =>
        product.id === productInput.id
            ? {...product, ...productInput}
            : product
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    return updatedProducts;
};

export const deleteProduct = (productId: string): Product[] => {
    const products = getProducts();

    const updatedProducts = products.filter((product) => product.id !== productId);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    return updatedProducts;
};