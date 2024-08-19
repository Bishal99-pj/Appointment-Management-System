"use client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export type FileUploadProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

export default function FileUpload({ files, onChange }: FileUploadProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files.length > 0 ?
                (<Image src={convertFileToUrl(files[0])} alt='' width={1000} height={1000} className='max-h-[400px] overflow-hidden object-cover' />)
                : (
                    <>
                        <Image src="/assets/icons/upload.svg" width={40} height={40} alt='file upload' />
                        <div className='file-upload-label'>
                            <p className="text-14-regular">
                                <span className='text-green-500'>
                                    Click to upload
                                </span> or drag and drop here
                            </p>
                            <p className='mt-1.5'>
                                SVG, PNG, JPG or GIF (max 800 x 400)
                            </p>
                        </div>
                    </>
                )}
        </div>
    )
}