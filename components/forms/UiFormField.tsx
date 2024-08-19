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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

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
    const { name, label, fieldType, iconSrc, iconAlt, placeholder, disabled, renderSkeleton, dateFormat, showTimeSelect } = props

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
            return (
                <FormControl>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label
                            htmlFor={name}
                            className="checkbox-label"
                        >
                            {label}
                        </Label>
                    </div>
                </FormControl>
            )

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

        case UiFormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image src={"/assets/icons/calendar.svg"} alt="calendar" width={24} height={24} className='ml-2' />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className="shad-input border-0"
                            dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName='date-picker'
                        />
                    </FormControl>
                </div>
            )

        case UiFormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null


        case UiFormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )

        case UiFormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        {...field}
                        placeholder={placeholder}
                        disabled={disabled}
                        className='shad-textarea border-0'
                    />
                </FormControl>
            )

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