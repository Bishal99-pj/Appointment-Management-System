"use client"

import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { decryptKey, encryptKey } from '@/lib/utils'

const ModalOtpVerification = () => {
    const router = useRouter()
    /* that comes immediately after '/' */
    const currentPath = usePathname()
    const [open, setOpen] = useState(true)
    const [otp, setOtp] = useState("")
    const [error, setError] = useState('')

    const encryptedPassKey = typeof window !== undefined ? localStorage.getItem('admin_access_key') : null

    useEffect(() => {
        // check if user is already logged in by checking the admin_access_key in local storage
        const adminAccessKey = encryptedPassKey ? decryptKey(encryptedPassKey) : ''

        if (currentPath) {
            if (adminAccessKey === process.env.NEXT_PUBLIC_ADMIN_OTP) {
                // proceed to admin login
                setOpen(false)
                router.push('/admin')
            } else {
                setOpen(true)
            }
        }
    }, [encryptedPassKey])

    function closeModal() {
        setOpen(false)
        router.push('/')
    }

    function validateOtp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()

        if (otp.length === 6 && otp === process.env.NEXT_PUBLIC_ADMIN_OTP) {
            setError('')
            setOpen(false)
            const encryptedOtp = encryptKey(otp)
            localStorage.setItem('admin_access_key', encryptedOtp)
            router.push('/admin')
        } else {
            setError('Invalid OTP')
        }
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className='shad-alert-dialog'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex items-start justify-between'>Admin OTP verification

                            <Image
                                src="/assets/icons/close.svg"
                                width={20}
                                height={20}
                                alt="close"
                                onClick={() => closeModal()}
                                className='cursor-pointer'
                            />

                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            To access the admin dashboard, please verify your email
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div>
                        <InputOTP maxLength={6}
                            value={otp}
                            onChange={(value) => {
                                setOtp(value)
                                setError('')
                            }}
                        >
                            <InputOTPGroup
                                className='shad-otp'
                            >
                                <InputOTPSlot className='shad-otp-slot' index={0} />
                                <InputOTPSlot className='shad-otp-slot' index={1} />
                                <InputOTPSlot className='shad-otp-slot' index={2} />
                                <InputOTPSlot className='shad-otp-slot' index={3} />
                                <InputOTPSlot className='shad-otp-slot' index={4} />
                                <InputOTPSlot className='shad-otp-slot' index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {error &&
                            <p className='text-red-500 text-center text-14-regular mt-4'>{error}</p>
                        }
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={(e) => validateOtp(e)}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ModalOtpVerification