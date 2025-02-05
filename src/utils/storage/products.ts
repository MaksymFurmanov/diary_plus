import { Product, ProductInput } from "../../types";

export const getProducts = (productsRaw: string | null): Product[] => {
    return productsRaw ? JSON.parse(productsRaw) as Product[] : [];
};

export const getProductById = (products: Product[], productId?: string): Product | null => {
    return productId ? products.find(product => product.id === productId) || null : null;
};

export const createProduct = (products: Product[], productInput: ProductInput, id: string): Product[] => {
    return [
        ...products,
        {
            id,
            name: productInput.name,
            type: productInput.type,
            per_pallet: productInput.per_pallet,
            img_url: productInput.img_url,
            quality_standards_url: productInput.quality_standards_url
        } as Product
    ];
};

export const updateProduct = (products: Product[], productInput: ProductInput): Product[] => {
    return products.map((product: Product) => {
        if (product.id === productInput.id) {
            return {
                id: product.id,
                name: productInput.name,
                type: productInput.type,
                per_pallet: productInput.per_pallet,
                img_url: productInput.img_url,
                quality_standards_url: productInput.quality_standards_url
            } as Product;
        }
        return product;
    });
};

export const deleteProduct = (products: Product[], productId: string): Product[] => {
    return products.filter((product: Product) => product.id !== productId);
};