import CardAppointmentStat from '@/components/CardAppointmentStat'
import { columns } from '@/components/table/Columns'
import DataTable from '@/components/table/DataTable'
import { getRecentApponitments } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Admin = async () => {
    const appointments = await getRecentApponitments()

    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">

                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.png"
                        height={32}
                        width={162}
                        alt="logo"
                        className="h-8 w-fit"
                    />
                </Link>

                <p className="text-16-semibold">Admin Dashboard</p>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">
                        Start the day by managing new appointments
                    </p>
                </section>

                <section className="admin-stat">
                    <CardAppointmentStat
                        status="scheduled"
                        count={appointments?.scheduledCount ?? 0}
                        label="Scheduled appointments"
                        icon="/assets/icons/appointments.svg"
                    />
                    <CardAppointmentStat
                        status="pending"
                        count={appointments?.pendingCount ?? 0}
                        label="Pending appointments"
                        icon="/assets/icons/pending.svg"
                    />
                    <CardAppointmentStat
                        status="cancelled"
                        count={appointments?.cancelledCount ?? 0}
                        label="Cancelled appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>

                {
                    appointments?.documents.length
                    &&
                    <DataTable columns={columns as any} data={appointments?.documents} />
                }

            </main>
        </div>
    )
}

export default Admin