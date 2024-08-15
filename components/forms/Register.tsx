"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
} from "@/components/ui/form"
import UiFormField from "./UiFormField"
import SubmitButton from "./SubmitButton"
import { useState, useEffect } from "react"
import { SignUpFormSchema } from "@/lib/form-validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/router"
import { User } from "@/types"
import { UiFormFieldType } from "./SignUp"

export default function RegisterForm({user} : {user: User}) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof SignUpFormSchema>, event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true)
        try {
            const userData = { name, email, phone }
            const user = await createUser(userData)
            const router = useRouter()
            if(user) router.push(`/patients/${user.$id}/register`)
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        form.handleSubmit((data) => onSubmit(data, event))(event)
    }

    return (<Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Hello there 🙋🏻‍♂️</h1>
                <p className="text-dark-700">Schedule your first appointment</p>
            </section>
            <UiFormField
                name="name" label="Full name"
                placeholder="Ada Lovelace"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                fieldType={UiFormFieldType.INPUT} control={form.control}
            />
            <SubmitButton loading={isLoading}>Get started</SubmitButton>
        </form>
    </Form>)
}
