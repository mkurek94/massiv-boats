'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { COMMON_TRANSLATIONS } from '@/constants/translations';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    onRemove,
    value,
    disabled,
}) => {
    const t = useTranslations();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
  
      return () => {
        setIsMounted(false);
      };
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }
  
    if (!isMounted) {
      return null;
    }

  return (
    <div>
        <div className='mb-4 flex items-center gap-4'>
            {value.map(url => (
                <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                    <div className='z-10 absolute top-2 right-2'>
                        <Button type='button' onClick={() => onRemove(url)} variant="destructive" size="icon">
                            <Trash className='h-4 w-4'/>
                        </Button>
                    </div>
                    <Image fill className='object-cover' alt='Image' src={url}/>
                </div>
            ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="hyvzwgwo">
            {({open}) => {
                const onClick = () => {
                    open();
                }

                return (
                    <Button type='button' disabled={disabled} variant="secondary" onClick={onClick}>
                        <ImagePlus className='h-4 w-4 mr-2'/>
                        {t(COMMON_TRANSLATIONS.common.uploadImage)}
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}