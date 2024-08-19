import AppointmentForm from "@/components/forms/Appointment";
import { getRegisteredUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const registeredUser = await getRegisteredUser(userId);

  return (
    <div className="flex flex-col xl:flex-row min-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="logo" />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={registeredUser?.$id as string}
          />

          <p className="justify-items-end text-dark-600">
            © 2024. Appoint Ease | All rights reserved.
          </p>
        </div>
      </section>

      <Image src="/assets/images/appointment-img.png" height={1000} width={1000} alt="appointment" className="side-img max-w-[390px]" priority={true} />
    </div>
  );
}
