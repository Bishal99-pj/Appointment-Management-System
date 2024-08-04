"use client"

import React from 'react'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { UiFormFieldType } from './SignUp'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export type UiFormFieldProps = {
    control: Control<any>
    fieldType: UiFormFieldType
}

export type InputProps = {
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

type CombinedProps = UiFormFieldProps & InputProps;

const RenderFormField = ({ field, props }: { field: any, props: CombinedProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, disabled } = props

    switch (fieldType) {
        case UiFormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {
                        iconSrc && (
                            <Image src={iconSrc} alt={iconAlt || 'input icon alt text'} width={24} height={24} className='ml-2' />
                        )
                    }
                    <FormControl>
                        <Input
                            disabled={disabled}
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )

        case UiFormFieldType.CHECKBOX:
            return <input type="checkbox" {...field} />
        case UiFormFieldType.PHONE_INPUT:
            return (<FormControl>
                <PhoneInput 
                {...field} defaultCountry='IN' 
                placeholder={placeholder} 
                international 
                withCountryCallingCode
                value={field.value}
                onChange={field.onChange}
                className='input-phone'
                />
            </FormControl>)
        default:
            break;
    }
}

const UiFormField = (props: CombinedProps) => {
    const { control, fieldType, ...inputProps } = props
    return (
        <FormField
            control={control}
            name={inputProps.name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== UiFormFieldType.CHECKBOX && inputProps.label && (
                        <FormLabel>{inputProps.label}</FormLabel>
                    )}

                    <RenderFormField field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default UiFormField