"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
} from "@/components/ui/form"
import UiFormField from "./UiFormField"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { CreateAppointmentSchema } from "@/lib/form-validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"

export enum UiFormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select',
    DATE_PICKER = 'datePicker',
    PHONE_INPUT = 'phoneInput',
    SKELETON = 'skeleton'
}

export default function AppointmentForm({ type, userId, patientId }: { type: 'create' | 'cancel', userId: string, patientId: string }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
        resolver: zodResolver(CreateAppointmentSchema),
        defaultValues: {
        },
    })

    async function onSubmit(formData: z.infer<typeof CreateAppointmentSchema>, event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true)
        try {

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
                <h1 className="header">Get ready 🙋🏻</h1>
                <p className="text-dark-700">Schedule your appointment</p>
            </section>

            {(type !== 'cancel' &&
                <>
                    {/* PRIMARY CARE PHYSICIAN */}
                    <UiFormField
                        fieldType={UiFormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Doctor"
                        placeholder="Select a doctor"
                    >
                        {Doctors.map((doctor, i) => (
                            <SelectItem
                                key={doctor.name + i}
                                value={doctor.name}
                                className="hover:bg-dark-500 transition-colors"
                            >
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt={doctor.name}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </UiFormField>

                    <UiFormField
                        fieldType={UiFormFieldType.DATE_PICKER}
                        control={form.control}
                        name="schedule"
                        label="Expected appointment date"
                        showTimeSelect
                        dateFormat="MM/dd/yyyy - hh:mm aa"
                    />

                    <div className="flex flex-col gap-6">
                        <UiFormField
                            fieldType={UiFormFieldType.TEXTAREA}
                            control={form.control}
                            name="reason"
                            label="Reason for appointment"
                            placeholder="Reason for appointment"
                        />

                        <UiFormField
                            fieldType={UiFormFieldType.TEXTAREA}
                            control={form.control}
                            name="note"
                            label="Notes"
                            placeholder="Note"
                        />
                    </div>
                </>
            )}

            <SubmitButton loading={isLoading}>Get started</SubmitButton>
        </form>
    </Form>)
}
