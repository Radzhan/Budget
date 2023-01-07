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
export interface Transactions {
    amounte: number;
    title: string;
    type: string;
    date: string;
    id: string;
}
export interface transactionObject{
    category: string;
    type: string;
    amounte: string;
}