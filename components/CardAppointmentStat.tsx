"use client"

import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

export type AppointmentStatProps = {
    status: "scheduled" | "pending" | "cancelled",
    count: number,
    label: string,
    icon: string
}

const CardAppointmentStat = ({ status, count = 0, label, icon }: AppointmentStatProps) => {
    return (
        <div className={clsx('stat-card', {
            'bg-appointments': status === "scheduled",
            'bg-pending': status === "pending",
            'bg-cancelled': status === "cancelled",
        })}> 
            <div className='flex items-center gap-4'>
                <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    className='size-8 w-fit'
                />
                <h2 className='text-32-bold text-white'>{count}</h2>
            </div>

            <p className='text-14-regular'>{label}</p>
        </div>
    )
}

export default CardAppointmentStat