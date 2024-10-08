"use server"

// next.js server actions ----- appwrite DB
import { AppwriteException, ID, Models, Query } from "node-appwrite"
import { APPWRITE_APPOINTMENT_COLLECTION_ID, APPWRITE_DATABASE_ID, aw_databases, aw_messaging } from "@/lib/appwrite.config"
import { formatDateTime, parseStringify } from "../utils"
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types"
import { Appointment } from "@/types/appwrite.type"
import { revalidatePath } from "next/cache"

export const createAppointment = async (createAppointmentRequest: CreateAppointmentParams) => {
    try {
        const newAppointment = await aw_databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_APPOINTMENT_COLLECTION_ID,
            ID.unique(),
            createAppointmentRequest
        )

        /* important for first visit after a new appointment is created */
        revalidatePath("/admin")
        return parseStringify<Models.Document>(newAppointment)
    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await aw_databases.updateDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_APPOINTMENT_COLLECTION_ID,
            appointmentId,
            appointment
        )

        if (!updatedAppointment) throw new Error('Appointment does not exist')

        // SMS notifications service
        let SMSmessage = 'Your appointment has been'

        switch (type) {
            case "schedule":
                SMSmessage += ` scheduled for ${formatDateTime(appointment.schedule).dateTime} with Dr. ${appointment.primaryPhysician}`
                break;
            case "cancel":
                SMSmessage +=
                    ` cancelled due to the following reason:
                    "${appointment.cancellationReason}"`
                break;
            default:
                break;
        }

        await sendSMSnotification(userId, SMSmessage)

        /* by pass cache and refetch updated data from server */
        revalidatePath("/admin")
        return parseStringify<Models.Document>(updatedAppointment)

    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await aw_databases.getDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_APPOINTMENT_COLLECTION_ID,
            appointmentId
        )
        return parseStringify<Models.Document>(appointment)
    } catch (err) {
        console.error(err);
    }
}

export const getRecentApponitments = async () => {
    try {
        const appointments = await aw_databases.listDocuments(
            APPWRITE_DATABASE_ID,
            APPWRITE_APPOINTMENT_COLLECTION_ID,
            [Query.orderDesc('$createdAt')],
        )
        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            switch (appointment.status) {
                case "scheduled":
                    return { ...acc, scheduledCount: acc.scheduledCount + 1 }
                case "pending":
                    return { ...acc, pendingCount: acc.pendingCount + 1 }
                case "cancelled":
                    return { ...acc, cancelledCount: acc.cancelledCount + 1 }
                default:
                    return acc
            }
        }, initialCounts)

        const refinedResponse = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(refinedResponse)
    } catch (err) {
        console.error(err);
    }
}


export const sendSMSnotification = async (userId: string, message: string) => {
    try {
        const messageSMS = await aw_messaging.createSms(ID.unique(), message, [], [userId])
        return parseStringify<Models.Message>(messageSMS)

    } catch (err) {
        if (err instanceof AppwriteException)
            console.error(err)
    }
}