import RegisterForm from '@/components/forms/Register'
import { getUser } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)

    return (
        <div className='flex h-screen flex-col xl:flex-row'>
            <section className='remove-scrollbar container'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                    <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="appointease logo" />
                    <RegisterForm user={user} />
                    <p className="copyright py-12">
                        © 2024. Appoint Ease | All rights reserved.
                    </p>
                </div>
            </section>

            <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="onboarding" className="side-img max-w-2xl" priority={true} />

        </div>
    )
}

export default Register