import { Appointment } from "./appwrite.type";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | ?string[] };
};

declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare type CreateUserParams = {
  name: string;
  email: string;
  phone: string;
}
declare type User = CreateUserParams & {
  $id: string;
}

declare type RegisterUserParams = CreateUserParams & {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: FormData;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note?: string;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};