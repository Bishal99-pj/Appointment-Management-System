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

      <section className="remove-scrollbar container max-h-screen">
        <div className="sub-container max-w-[500px]">
          
          <Image className="mb-12 h-10 w-fit cursor-pointer" src="/assets/icons/logo-full.png" width={1000} height={1000} alt="logo" />

          <SignUpForm />

          <div className="flex mt-10 mb-2 justify-between">
            <p className="copyright">
              © 2024. Appoint Ease | All rights reserved.
            </p>
            <Link href="/?admin=true" className="text-green-500 text-14-regular">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image src="/assets/images/onboarding-img.webp" height={1000} width={1000} alt="onboarding" className="max-w-3xl max-h-screen object-cover hidden md:block" priority={true} />
    </div>
  );
}
