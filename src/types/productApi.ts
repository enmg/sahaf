export type ProductApiCategory = {
    category_id: string;
    name: string;
    url: string;
};

export type ProductApiOption = Record<string, unknown>; // Daha detaylı tip gerekiyorsa güncellenebilir

export type ProductApi = {
    product_id: string;
    name: string;
    description: string;
    model: string;
    sku: string;
    price: string;
    special: string | null;
    quantity: string;
    stock_status: string;
    manufacturer: string | null;
    image: string;
    images: string[];
    categories: ProductApiCategory[];
    options: ProductApiOption[];
    date_added: string;
    date_modified: string;
    status: string;
    viewed: string;
    rating: number;
    reviews: number;
    url: string;
};
