import { CreateUserParams } from "@/types";
import { aw_users } from "../appwrite.config";
import { AppwriteException, ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await aw_users.create(ID.unique(), user.email, user.phone, undefined, user.name);
        return newUser
    } catch (err) {
        console.error(err)
        if (err instanceof AppwriteException && err?.code === 409) {
            const existingUser = await aw_users.list([
                Query.equal('email', [user.email]),
            ])
            return existingUser.users[0]
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await aw_users.get(userId)
        return parseStringify(user)
    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}