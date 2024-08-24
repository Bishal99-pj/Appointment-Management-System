import { StatusIcon } from '@/constants'
import { Status } from '@/types'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const Badge = ({ status }: { status: Status }) => {
  return (
    <div className={clsx('status-badge',
      status === "scheduled" && 'bg-green-600',
      status === "pending" && 'bg-blue-600',
      status === "cancelled" && 'bg-red-600')}>
      <Image
        src={StatusIcon[status]}
        alt={`appointment status symbol for ${status}`}
        width={24}
        height={24}
        className='h-fit w-3'
      />
      <p className={clsx('text-white', 
        status === "scheduled" && 'text-green-500', status === "pending" && 'text-blue-500', status === "cancelled" && 'text-red-500')}>{status}</p>
    </div>
  )
}

export default Badge