"use client";

import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface MenuItemProps {
  label: string;
  href: string;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, href, onClick }) => {
  const pathname = usePathname();
  const params = useParams();
  const isActive = pathname?.startsWith(href) || pathname?.startsWith(`/${params?.locale}${href}`);
  const t  = useTranslations();
  return (
    <Link
      className={`
        text-xl
        cursor-pointer
        text-neutral-700
        mx-4
        hover:border-b-2
        hover:border-blue-400
        transition
        font-semibold
        border-b-2
        ${isActive ? "border-blue-400" : "border-transparent"}
        `}
      href={href}
      lang={params?.locale as string}
      onClick={onClick ? onClick : undefined}
    >
      {t(label)}
    </Link>
  );
};