//merchants

export type ICategory = {
    category: string;
    title: string;
};

export type IImage = {
    attributes: {
        url: string;
    };
};

export type IRestaurantData = {
    categories: {
        categories: ICategory[];
    };
    category_food: string;
    category_price: string;
    isOpen: boolean;
    merchant_adress: string;
    merchant_number: string;
    name: string;
    preview_image: {
        data: IImage[];
    };
    telegram_id: string;
    unique_prefix: string;
};

export type IRestaurant = {
    attributes: IRestaurantData;
    id: number;
};

//products

export type IProductExtra = {
    additionalPrice: number;
    description: string;
    extraName: string;
    id: number;
};

export type IProductType = {
    description: string;
    id: number;
    newPrice: number;
    typeName: string;
};

export type IProduct = {
    blocked: boolean;
    category: string;
    discription: string;
    id: number;
    image: IImage[];
    merchant: IRestaurantData;
    price: number;
    product_extras: IProductExtra[];
    product_types: IProductType[];
    title: string;
    weight: number;
    stoplist_timestamp: number;
};
