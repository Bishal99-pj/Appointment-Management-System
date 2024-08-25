import AppointmentForm from "@/components/forms/Appointment";
import { getRegisteredUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {

  const registeredUser = await getRegisteredUser(userId);

  return (
    <div className="flex flex-col xl:flex-row min-h-screen">
      <section className="remove-scrollbar container max-h-screen">
        <div className="sub-container max-w-[860px] flex-1">
          <Link href='/'>
            <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.png" width={1000} height={1000} alt="logo" />
          </Link>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={registeredUser?.$id as string}
          />

          <p className="copyright mt-6">
            © 2024. Appoint Ease | All rights reserved.
          </p>
        </div>
      </section>

      <Image src="/assets/images/appointment-img.webp" height={1000} width={1000} alt="appointment" className="side-img max-w-2xl max-h-screen" priority={true} />
    </div>
  );
}
