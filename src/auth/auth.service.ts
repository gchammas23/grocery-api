import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../db";
import {ConflictException, NotFoundException} from "../utils/exceptions";
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

export const loginService = async (data: RegisterData) => {
    const notFoundError: NotFoundException = new NotFoundException('Invalid username or password');

    // Check if user is found in DB
    const userCheck = await db('users').where({ username: data.username }).first();
    if (!userCheck) {
        throw notFoundError;
    }

    // If user is found, compare provided password with saved hash in DB
    const passwordCheck = await bcrypt.compare(data.password, userCheck.password);
    if (!passwordCheck) {
        throw notFoundError;
    }

    // If all checks pass, we can generate a JWT and return it to the client
    const token: string = jwt.sign({
        uid: userCheck.id,
    }, config.jwt.secret as string, { expiresIn: '1d' });

    return { accessToken: token };
}