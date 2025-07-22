import db from "../db";
import {NotFoundException} from "../utils/exceptions";

interface ItemData {
    name: string;
    quantity: number;
    store: string;
    user_id: number;
}

export const addItemService = async (data: ItemData) => {
    return db('items').insert(data);
}

export const getAllUserItems = async (userId: number) => {
    return db('items').where({ user_id: userId });
}

export const deleteItemService = async (itemId: number, userId: number) => {
    // Make sure to only allow user to delete their own items
    const deletedItem = await db('items').where({ id: itemId, user_id: userId }).del();

    // If no row was deleted, this means the item was not found
    if (deletedItem === 0) {
        throw new NotFoundException(`Item with id ${itemId} not found`);
    }
}