/**
 * Supported API request configuration.
 */
export type ApiRequestOptions = {
    data?: object;
    form?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
};

/**
 * Product category information returned from Automation Exercise API.
 */
export type ProductCategory = {
    usertype: {
        usertype: string;
    };
    category: string;
};

/**
 * Product information returned from Automation Exercise API.
 */
export type Product = {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: ProductCategory;
};

/**
 * Products list API response body.
 */
export type ProductsListResponse = {
    responseCode: number;
    products: Product[];
};
