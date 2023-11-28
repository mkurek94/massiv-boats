"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { navigation } from "@/constants/navigation";
import {
    FOOTER_TRANSLATIONS
} from "@/constants/translations";
import Link from "next/link";

interface IFooterProps {
  locale: string;
}

export const Footer: React.FC<IFooterProps> = ({ locale }) => {
  const t = useTranslations();
  const [isCookiePolicyModalOpen, setIsCookiePolicyModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
  const [isPersonalDataPolicyModalOpen, setIsPersonalDataPolicyModalOpen] = useState(false);
  return (
      <footer className="w-screen p-8 flex flex-row bg-neutral-800 text-neutral-400 justify-around font-semibold flex-wrap gap-8">
        <ul>
          {navigation.map((el) => (
            <li className="hover:text-neutral-50 transition" key={el.label}>
              <Link href={el.href} locale={locale}>
                {t(el.label)}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          <li className="hover:text-neutral-50 transition cursor-pointer" onClick={() => setIsPrivacyPolicyModalOpen(true)}>
              {t(FOOTER_TRANSLATIONS.footer.privacyPolicy)}
          </li>
          <li className="hover:text-neutral-50 transition cursor-pointer" onClick={() => setIsPersonalDataPolicyModalOpen(true)}>
              {t(FOOTER_TRANSLATIONS.footer.legal)}
          </li>
          <li className="hover:text-neutral-50 transition cursor-pointer" onClick={() => setIsCookiePolicyModalOpen(true)}>
              {t(FOOTER_TRANSLATIONS.footer.cookiesPolicy)}
          </li>
        </ul>
        <div className="flex flex-col">
          <Link href="/" locale={locale}>
            <Image
              alt="Logo"
              className="cursor-pointer h-16 w-auto"
              height={200}
              width={200}
              src="/images/inglot-logo.png"
            />
          </Link>
          <div className="flex flex-row items-center gap-4">
            <Link href="https://www.facebook.com/IIKMARINE" target="_blank">
              <AiFillFacebook
                size={30}
                className="hover:text-neutral-50 transition"
              />
            </Link>
            <Link
              href="https://instagram.com/massivboat?igshid=MzRlODBiNWFlZA=="
              target="_blank"
            >
              <AiFillInstagram
                size={30}
                className="hover:text-neutral-50 transition"
              />
            </Link>
            <Link
              href="https://www.youtube.com/@MassivBoats"
              target="_blank"
            >
              <AiFillYoutube
                size={30}
                className="hover:text-neutral-50 transition"
              />
            </Link>
          </div>
        </div>
      </footer>
  );
};