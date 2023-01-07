export interface Category {
    title: string;
    type: string;
}
export interface CategoryApi {
    title: string;
    type: string;
    id: string
}

export interface transactionApi {
    amounte: number;
    category: string;
    createdAt: string;
}