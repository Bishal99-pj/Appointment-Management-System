"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
} from "@/components/ui/form"
import UiFormField from "./UiFormField"
import SubmitButton from "./SubmitButton"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { SelectItem } from "../ui/select"
import Image from "next/image"

import { Doctors } from "@/constants"
import { getAppointmentSchema } from "@/lib/form-validation"
import { CreateAppointmentParams, Status, UpdateAppointmentParams } from "@/types"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.type"

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

type AppointmentFormProps = {
    type: 'create' | 'schedule' | 'cancel',
    userId: string,
    patientId: string,
    appointment?: Appointment,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AppointmentForm({ type, userId, patientId, appointment, setOpen }: AppointmentFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    let buttonLabel: string = ''

    switch (type) {
        case 'create':
            buttonLabel = 'Create Appointment'
            break
        case 'cancel':
            buttonLabel = 'Cancel Appointment'
            break
        case 'schedule':
            buttonLabel = 'Schedule Appointment'
            break
    }

    const AppointmentSchema = getAppointmentSchema(type)

    const form = useForm<z.infer<typeof AppointmentSchema>>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician : "",
            schedule: appointment ? new Date(appointment.schedule) : new Date(),
            reason: appointment ? appointment.reason : "",
            note: appointment ? appointment.note : "",
            cancellationReason: "",
        },
    })

    async function onSubmit(formData: z.infer<typeof AppointmentSchema>, event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)
        let status: Status;

        switch (type) {
            case 'cancel':
                status = 'cancelled'
                break
            case 'schedule':
                status = 'scheduled'
                break
            default:
                status = 'pending'
                break
        }

        try {
            /* create a new appointment */
            if (type === 'create' && patientId) {

                const appointmentData: CreateAppointmentParams = {
                    userId,
                    patient: patientId,
                    primaryPhysician: formData.primaryPhysician,
                    schedule: formData.schedule,
                    reason: formData.reason as string,
                    note: formData.note,
                    status
                }

                const newAppointment = await createAppointment(appointmentData)

                if (newAppointment) {
                    form.reset();
                    router.push(`/users/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)
                }
            }
            /* update status of exisiting appointment (SCHEDULE / CANCEL) */
            else {
                const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment?.$id as string,
                    appointment: {
                        primaryPhysician: formData.primaryPhysician,
                        schedule: formData.schedule,
                        cancellationReason: formData.cancellationReason,
                        note: formData.note,
                        status
                    },
                    type
                }

                const updatedAppointment = await updateAppointment(appointmentToUpdate as UpdateAppointmentParams)

                if (!updatedAppointment) throw new Error("Failed to update appointment")
                setOpen && setOpen(false)
                form.reset()
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        form.handleSubmit((data) => onSubmit(data, event))(event)
    }

    return (<Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            {
                type === 'create' &&
                <section className="mb-12 space-y-4">
                    <h1 className="header">New appointment 🧑🏻‍⚕️</h1>
                    <p className="text-dark-700">Schedule your appointment</p>
                </section>
            }

            {(type === 'cancel' ?
                <>
                    <UiFormField
                        fieldType={UiFormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="e.g I am unable to make an appointment"
                    />
                </> :
                <>
                    {/* PRIMARY CARE PHYSICIAN */}
                    <UiFormField
                        fieldType={UiFormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Doctor"
                        placeholder={ type === 'create' ? 'Select a doctor' : 'Select a different doctor'}
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

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <UiFormField
                            fieldType={UiFormFieldType.TEXTAREA}
                            control={form.control}
                            name="reason"
                            label="Reason for appointment"
                            placeholder="e.g I have fever since a few days "
                        />

                        <UiFormField
                            fieldType={UiFormFieldType.TEXTAREA}
                            control={form.control}
                            name="note"
                            label="Notes"
                            placeholder="e.g I could be a little late because of traffic"
                        />
                    </div>
                </>
            )}

            <SubmitButton
                loading={isLoading}
                className={type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'}
            >{buttonLabel}</SubmitButton>
        </form>
    </Form>
    )
}
