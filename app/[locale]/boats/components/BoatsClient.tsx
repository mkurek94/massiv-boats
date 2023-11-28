'use client'
import { Header } from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { BOATS_TRANSLATION } from '../[boatId]/constants/translations';
import { Boat } from '@prisma/client'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';

interface BoatsClientProps {
    boats: Boat[];
}

export const BoatsClient: React.FC<BoatsClientProps> = ({boats}) => {
    const t = useTranslations();
    const router = useRouter();

  const actionButton = (
    <Button className="gap-2 bg-blue-500 hover:bg-blue-800" onClick={() => router.push(ROUTES.BOATS_NEW)}>
      <AiOutlinePlus />
      {t(BOATS_TRANSLATION.boats.actionButton)}
    </Button>
  );

  return (
    <Header
        headerText={`${t(BOATS_TRANSLATION.boats.header)} (${boats.length})`}
        subHeaderText={t(BOATS_TRANSLATION.boats.subHeader)}
        actionButton={actionButton}
      />
  )
}
