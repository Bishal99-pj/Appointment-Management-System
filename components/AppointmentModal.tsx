"use client"

import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import clsx from 'clsx'
import AppointmentForm from './forms/Appointment'
import { Appointment } from '@/types/appwrite.type'

type AppointmentModalProps = {
    type: 'schedule' | 'cancel',
    userId: string,
    patientId: string,
    appointment: Appointment,
    description: string
}

const AppointmentModal = ({ type, userId, patientId, appointment, description }: AppointmentModalProps) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost"
                        className={
                            clsx('capitalize',
                                type === 'cancel' && 'text-red-400',
                                type === 'schedule' && 'text-green-500'
                            )
                        }>{type}</Button>
                </DialogTrigger>
                <DialogContent className='shad-dialog sm:max-w-md'>
                    <DialogHeader className='mb-4 space-y-3'>
                        <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <AppointmentForm
                        type={type}
                        userId={userId}
                        patientId={patientId}
                        appointment={appointment}
                        setOpen={setOpen}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AppointmentModal