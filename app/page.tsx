import SignUpForm from "@/components/forms/SignUp";
import ModalOtpVerification from "@/components/ModalOtpVerification";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true'

  return (
    <div className="flex flex-col xl:flex-row min-h-screen">
      {isAdmin &&
        <ModalOtpVerification
        />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[500px]">
          <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="logo" />

          <SignUpForm />

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

      <Image src="/assets/images/onboarding-img.png" height={1000} width={1000} alt="onboarding" className="side-img w-1/2" priority={true} />
    </div>
  );
}
