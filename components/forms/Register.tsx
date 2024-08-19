"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
} from "@/components/ui/form"
import UiFormField from "./UiFormField"
import SubmitButton from "./SubmitButton"
import { useState, useEffect } from "react"
import { SignUpFormSchema } from "@/lib/form-validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import { User } from "@/types"
import { UiFormFieldType } from "./SignUp"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUpload from "../FileUpload"

export default function RegisterForm({ user }: { user: User }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof SignUpFormSchema>, event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true)
        try {
            const userData = { name, email, phone }
            const user = await createUser(userData)
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        form.handleSubmit((data) => onSubmit(data, event))(event)
    }

    return (<Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-12 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Welcome 🙌🏻</h1>
                <p className="text-dark-700">Let us know more about yourself</p>
            </section>
            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Personal Information</h2>
                </div>

                {/* Name */}
                <UiFormField
                    name="name"
                    placeholder="Jane Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                    fieldType={UiFormFieldType.INPUT} control={form.control}
                />

                {/* Email & Phone */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email address"
                        placeholder="janedoe@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="(555) 123-4567"
                    />
                </div>

                {/* BirthDate & Gender */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of birth"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer select-none">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                {/* Address & Occupation */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="14 street, New york, NY - 5101"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Software Developer"
                    />
                </div>

                {/* Emergency Contact Name & Emergency Contact Number */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Friend or family"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="(555) 123-4567"
                    />
                </div>
            </section>
            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Medical Information</h2>
                </div>

                {/* PRIMARY CARE PHYSICIAN */}
                <UiFormField
                    fieldType={UiFormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor, i) => (
                        <SelectItem
                            key={doctor.name + i}
                            value={doctor.name}
                            className="hover:bg-dark-500 transition-colors"
                        >
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    width={32}
                                    height={32}
                                    alt={doctor.name}
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </UiFormField>

                {/* INSURANCE & POLICY NUMBER */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance provider"
                        placeholder="BlueCross BlueShield"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance policy number"
                        placeholder="ABC123456789"
                    />
                </div>

                {/* ALLERGY & CURRENT MEDICATIONS */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Penicillin, Pollen"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current medications"
                        placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
                    />
                </div>

                {/* FAMILY HISTORY & PAST MEDICATIONS */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <UiFormField
                        fieldType={UiFormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family medical history (if relevant)"
                        placeholder="Grandfather had brain cancer"
                    />

                    <UiFormField
                        fieldType={UiFormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
                    />
                </div>

            </section>

            {/* IDENTIFICATION AND PERSONAL VERIFICATION */}
            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Identification and Verfication</h2>
                </div>

                {/* ID TYPE */}

                <UiFormField
                    fieldType={UiFormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select identification type"
                >
                    {IdentificationTypes.map((idType, i) => (
                        <SelectItem
                            key={idType + i}
                            value={idType}
                            className="hover:bg-dark-500 transition-colors"
                        >
                            {idType}
                        </SelectItem>
                    ))}
                </UiFormField>

                <UiFormField
                    fieldType={UiFormFieldType.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="123456789"
                />

                {/* Document upload */}

                <UiFormField
                    fieldType={UiFormFieldType.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned copy of identification document(s)"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUpload files={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                    )}
                />
            </section>

            {/* CONSENT AND PRIVACY POLICY */}
            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Consent and Privacy</h2>
                </div>
                <UiFormField
                    fieldType={UiFormFieldType.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I consent to receive treatment for my health condition."
                />

                <UiFormField
                    fieldType={UiFormFieldType.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="I consent to the use and disclosure of my health information for treatment purposes."
                />

                <UiFormField
                    fieldType={UiFormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="I acknowledge that I have reviewed and agree to the privacy policy"
                />
            </section>

            <SubmitButton loading={isLoading}>Get started</SubmitButton>
        </form>
    </Form>)
}
