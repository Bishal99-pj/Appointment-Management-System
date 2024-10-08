import RegisterForm from '@/components/forms/Register'
import { getUser } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import * as Sentry from "@sentry/nextjs";
import React from 'react'
import Link from 'next/link';

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)

    if (user)
        Sentry.metrics.set("user_appointment_register", user.name);

    return (
        <div className='flex h-screen flex-col xl:flex-row'>
            <section className='remove-scrollbar container'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                    <Link href='/'>
                        <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.png" width={1000} height={1000} alt="appointease logo" />
                    </Link>
                    {user && <RegisterForm user={user} />}
                    <p className="copyright py-12">
                        © 2024. Appoint Ease | All rights reserved.
                    </p>
                </div>
            </section>

            <Image src="/assets/images/register-img.webp" height={1000} width={1000} alt="register" className="side-img max-w-2xl" priority={true} />

        </div>
    )
}

export default Register