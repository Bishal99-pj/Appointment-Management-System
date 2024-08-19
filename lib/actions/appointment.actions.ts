"use server"

import { AppwriteException, ID, Models } from "node-appwrite"
import { APPWRITE_APPOINTMENT_COLLECTION_ID, APPWRITE_DATABASE_ID, aw_databases } from "../appwrite.config"
import { parseStringify } from "../utils"
import { CreateAppointmentParams } from "@/types"

export const createAppointment = async (createAppointmentRequest: CreateAppointmentParams) => {
    try {
        const newAppointment = await aw_databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_APPOINTMENT_COLLECTION_ID,
            ID.unique(),
            createAppointmentRequest
        )
        return parseStringify<Models.Document>(newAppointment)
    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}