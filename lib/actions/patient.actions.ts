"use server"

import { CreateUserParams, RegisterUserParams } from "@/types";
import { APPWRITE_DATABASE_ID, APPWRITE_PATIENT_COLLECTION_ID, APPWRITE_PROJECT_ID, aw_databases, aw_storage, aw_users, BASE_URL, STORAGE_ID } from "../appwrite.config";
import { AppwriteException, ID, Models, Query } from "node-appwrite";
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
        return parseStringify<Models.User<Models.Preferences>>(user)
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
        return parseStringify<Models.Document>(registeredUser)
    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}

export const getRegisteredUser = async (userId: string) => {
    try {
        /*  TODO: Inspect the reason of listDocs not working */

        // const user = await aw_databases.listDocuments(
        //     APPWRITE_DATABASE_ID,
        //     APPWRITE_PATIENT_COLLECTION_ID,
        //     [
        //         Query.equal('userId', [userId])
        //     ]
        // )

        const registeredUser = await aw_databases.getDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_PATIENT_COLLECTION_ID,
            userId
        )

        if (!registeredUser) throw new AppwriteException("User not found", 404)

        return parseStringify<Models.Document>(registeredUser)
    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}
