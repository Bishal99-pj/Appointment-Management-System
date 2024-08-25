import * as appwrite from 'node-appwrite'

export const {
    APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY,
    APPWRITE_DATABASE_ID,
    APPWRITE_APPOINTMENT_COLLECTION_ID,
    APPWRITE_DOCTOR_COLLECTION_ID,
    APPWRITE_PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_STORAGE_ID: STORAGE_ID,
    NEXT_PUBLIC_APPWRITE_CLOUD_BASE_URL: BASE_URL
} = process.env


const client = new appwrite.Client();

client.setEndpoint(BASE_URL).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);

export const aw_databases = new appwrite.Databases(client)
export const aw_storage = new appwrite.Storage(client)
export const aw_messaging = new appwrite.Messaging(client)
export const aw_users = new appwrite.Users(client)
