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

client.setEndpoint("https://cloud.appwrite.io/v1").setProject('669d0aa300055f4b0348').setKey('e00541e7f1abcff5eea624b630b40d5b2874e770d32cbfb3007d0562b1d58c5f4011f850ba88310eadafa02d58757cd74ec8d14105a2919cc65d10c881682c44f1704067a6f23d0cc822885e58056ecaa89ceda5c580cd60f1b344c5616008933ee0adf68923546b81200982661f940d3be5991819969a101ceabca8a0a13fdf');

export const aw_databases = new appwrite.Databases(client)
export const aw_storage = new appwrite.Storage(client)
export const aw_messaging = new appwrite.Messaging(client)
export const aw_users = new appwrite.Users(client)
