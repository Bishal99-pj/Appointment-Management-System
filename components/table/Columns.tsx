"use client"

import React from 'react'
import { ColumnDef } from "@tanstack/react-table"

import { Appointment } from '@/types/appwrite.type'
import Badge from '../Badge'
import { formatDateTime } from '@/lib/utils'
import { Doctors } from '@/constants'
import Image from 'next/image'
import AppointmentModal from '../AppointmentModal'


export const columns: ColumnDef<Appointment>[] = [
    {
        header: 'ID',
        cell: ({ row }) => {
            return <p className="text-14-medium">{row.index + 1}</p>
        },
    },
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => {
            const appointment = row.original
            return <p className="text-14-medium">{appointment.patient.name}</p>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const appointment = row.original
            return (
                <div className='min-w-[115px]'>
                    <Badge status={appointment.status} />
                </div>
            )
        },
    },
    {
        accessorKey: 'schedule',
        header: 'Appointment',
        cell: ({ row }) => {
            const appointment = row.original
            return <p className="text-14-medium">{formatDateTime(appointment.schedule).dateTime}</p>
        },
    },
    {
        accessorKey: "primaryPhysician",
        header: "Doctor",
        cell: ({ row }) => {
            const doctor = Doctors.find(doc => doc.name === row.original.primaryPhysician)
            return (<div className='flex items-center gap-3'>
                <Image
                    src={doctor!.image}
                    alt={doctor!.name}
                    width={100}
                    height={100}
                    className='rounded-full size-8'
                />
                <p className='whitespace-nowrap'>{doctor?.name}</p>
            </div>)
        },
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
            const appointment = row.original

            return (
                <div className='flex gap-1'>
                    <AppointmentModal
                        type="schedule"
                        userId={appointment.userId}
                        patientId={appointment.patient.$id}
                        appointment={appointment}
                        description="Please confirm the following details to schedule"
                    />
                    <AppointmentModal
                        type="cancel"
                        userId={appointment.userId}
                        patientId={appointment.patient.$id}
                        appointment={appointment}
                        description="Are you sure you want to cancel this appointment?"
                    />
                </div>
            )
        },
    },
]



const Columns = () => {
    return (
        <div>Columns</div>
    )
}

export default Columns