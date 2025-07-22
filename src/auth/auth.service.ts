import db from "../db";
import bcrypt from "bcrypt";
import {ConflictException} from "../utils/exceptions";
import config from "../utils/config";

interface RegisterData {
    username: string;
    password: string;
}

export const registrationService = async (data: RegisterData) => {
    // Check if user with the same username exists in the DB first
    const usernameCheck = await db('users').where({ username: data.username }).first();
    if (usernameCheck) {
        throw new ConflictException('An account with this username already exists. Please login!')
    }

    // Insert the new user in the DB
    const passHash: string = await bcrypt.hash(data.password, config.hashSalt);
    return db('users').insert({ username: data.username, password: passHash });
}