import db from "../db";
import {NotFoundException} from "../utils/exceptions";

interface Item {
    id: number;
    user_id: number;
    name: string;
    quantity: number;
    store: string;
    created_at: string
}

interface ItemData {
    name: string;
    quantity: number;
    store: string;
    user_id: number;
}

interface UpdateItem extends ItemData {
    itemId: string;
}

export const addItemService = async (data: ItemData): Promise<void> => {
    return db('items').insert(data);
}

export const getAllUserItems = async (userId: number): Promise<Item[]> => {
    return db('items').where({ user_id: userId });
}

export const editItemService = async (data: UpdateItem): Promise<void> => {
    const updatedItem: number = await db('items').where({ id: data.itemId, user_id: data.user_id }).update({
        name: data.name,
        quantity: data.quantity,
        store: data.store,
    });

    if (updatedItem === 0) {
        throw new NotFoundException(`Item with id ${data.itemId} not found`);
    }
}

export const deleteItemService = async (itemId: number, userId: number): Promise<void> => {
    // Make sure to only allow user to delete their own items
    const deletedItem = await db('items').where({ id: itemId, user_id: userId }).del();

    // If no row was deleted, this means the item was not found
    if (deletedItem === 0) {
        throw new NotFoundException(`Item with id ${itemId} not found`);
    }
}