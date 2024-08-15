import RegisterForm from '@/components/forms/Register'
import { getUser } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)
    return (
        <div className='flex h-screen'>
            <section className='remove-scrollbar container'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                    <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="appointease logo" />
                    <RegisterForm user={user}/>
                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024. Appoint Ease | All rights reserved.
                        </p>
                        <Link href="/?admin=true" className="text-green-500">
                            Admin
                        </Link>
                    </div>
                </div>
            </section>
            <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="onboarding" className="side-im max-w-[390px]" priority={true} />

        </div>
    )
}

export default Register