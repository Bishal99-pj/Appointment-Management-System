"use server"

import { CreateUserParams, RegisterUserParams } from "@/types";
import { APPWRITE_DATABASE_ID, APPWRITE_PATIENT_COLLECTION_ID, APPWRITE_PROJECT_ID, aw_databases, aw_storage, aw_users, BASE_URL, STORAGE_ID } from "../appwrite.config";
import { AppwriteException, ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        // app-write DB
        const newUser = await aw_users.create(ID.unique(), user.email, user.phone, undefined, user.name);
        return newUser
    } catch (err) {
        if (err instanceof AppwriteException && err?.code === 409) {
            console.error(err)
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

export const registerUser = async ({ identificationDocument, ...user }: RegisterUserParams) => {
    try {
        // app-write storage
        let file;
        if (!identificationDocument) throw new AppwriteException("Identification document is required", 400)

        const inputFile = InputFile.fromBuffer(
            identificationDocument.get('blobFile') as Blob,
            identificationDocument.get('fileName') as string
        )
        
        file = await aw_storage.createFile(STORAGE_ID, ID.unique(), inputFile)
        
        console.log();

        const registeredUser = await aw_databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_PATIENT_COLLECTION_ID,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${BASE_URL}/storage/buckets/${STORAGE_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`,
                ...user
            }
        )
        return parseStringify(registeredUser)
    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}