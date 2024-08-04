import {z} from 'zod'

export const SignUpFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Invalid email'),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {message: 'Invalid phone number'}),
})