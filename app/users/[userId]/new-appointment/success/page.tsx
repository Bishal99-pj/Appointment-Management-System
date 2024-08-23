import { Button } from '@/components/ui/button'
import { Doctors } from '@/constants'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AppointmentSuccess = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams.appointmentId as string) || ''
  const appointment = await getAppointment(appointmentId)

  const doc = Doctors.find(doc => doc.name === appointment?.primaryPhysician)

  return (
    <div className='flex h-screen px-12'>
      <div className="success-img">
        <Link href='/'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image
            src="/assets/gifs/success.gif"
            alt='success'
            height={300}
            width={280}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
          </h2>
          <p>We'll be in touch shortly to confirm</p>
        </section>

        <section className='request-details'>
          <p>Requested appointment details</p>

          {
            doc &&
            <Image
              src={doc.image}
              alt={doc.name}
              height={100}
              width={100}
              className="rounded-full border border-dark-500"
            />
          }

          <p className='whitespace-nowrap'>Dr. {doc?.name}</p>

          <div className='flex gap-2'>
            <Image
              src='/assets/icons/calendar.svg'
              alt='calendar'
              height={24}
              width={24}
            />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className='shad-primary-btn' asChild>
          <Link href={`/users/${userId}/new-appointment`}>New appointment</Link>
        </Button>

        <p className="copyright mt-6 lg:mt-10 py-12">
          © 2024. Appoint Ease | All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default AppointmentSuccess