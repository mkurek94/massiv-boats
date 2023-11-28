'use client'
import React from 'react'
import { Header } from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Color } from '@prisma/client'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { COLORS_TRANSLATION } from '../constants/translations';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { ColorColumn, columns } from './columns';

interface ColorsClientProps {
    data: ColorColumn[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({data}) => {
    const t = useTranslations();
    const router = useRouter();

  const actionButton = (
    <Button className="gap-2 bg-blue-500 hover:bg-blue-800" onClick={() => router.push(ROUTES.COLORS_NEW)}>
      <AiOutlinePlus />
      {t(COLORS_TRANSLATION.colors.actionButton)}
    </Button>
  );

  return (
    <>
    <Header
        headerText={`${t(COLORS_TRANSLATION.colors.header)} (${data.length})`}
        subHeaderText={t(COLORS_TRANSLATION.colors.subHeader)}
        actionButton={actionButton}
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      </>
  )
}
