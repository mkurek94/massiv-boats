"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ description, title }) => {
  const t = useTranslations();
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{t(title)}</h2>
      <p className="text-sm text-muted-foreground">{t(description)}</p>
    </div>
  );
};
