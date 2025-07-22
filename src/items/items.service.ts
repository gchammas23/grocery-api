import db from "../db";

interface ItemData {
    name: string;
    quantity: number;
    store: string;
    user_id: number;
}

export const addItemService = async (data: ItemData) => {
    return db('items').insert(data);
}