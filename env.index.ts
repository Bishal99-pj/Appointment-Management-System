import * as z from 'zod'

const envVariableSchema = z.object({
    APPWRITE_PROJECT_ID: z.string(),
    APPWRITE_API_KEY: z.string(),
    APPWRITE_DATABASE_ID: z.string(),
    APPWRITE_PATIENT_COLLECTION_ID: z.string(),
    APPWRITE_DOCTOR_COLLECTION_ID: z.string(),
    APPWRITE_APPOINTMENT_COLLECTION_ID: z.string(),
    NEXT_PUBLIC_APPWRITE_STORAGE_ID: z.string(),
    NEXT_PUBLIC_APPWRITE_CLOUD_BASE_URL: z.string(),
    NEXT_PUBLIC_ADMIN_OTP: z.string(),
    SENTRY_AUTH_TOKEN: z.string()
})

envVariableSchema.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariableSchema> { }
    }
}