"use client";

import { useCallback, useState } from "react";

import { MenuItem } from "./MenuItem";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { navigation } from "@/constants/navigation";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { LOCALE } from "@/constants/locale";
import { signOut } from "next-auth/react";
import { NAVIGATION_TRANSLATIONS } from "@/constants/translations";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react"
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations();
  const session = useSession();
  

  const toggleOpen = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogOut = () => {
    signOut({
      redirect: true,      
    })
  }

  return (
    <nav className="w-screen bg-neutral-50 shadow-sm h-16 z-50 px-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Link href={ROUTES.MAIN} locale={params?.locale as string}>
            <Logo />
          </Link>
          {navigation.map((el, index) => (
            <MenuItem key={index} label={el.label} href={el.href} />
          ))}
        </div>
        <div className="flex-row items-center justify-around hidden md:flex">
          {session.status === 'authenticated' ? (
            <span
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
            `}
              onClick={handleLogOut}
            >
              {t(NAVIGATION_TRANSLATIONS.navigation.logout)}
            </span>
          ) : null}
          <div className="font-semibold flex flex-row gap-2">
            <span
              className={`border-b-2 ${
                params?.locale === "pl"
                  ? "border-blue-600"
                  : "border-transparent"
              } cursor-pointer transition`}
              onClick={() => router.replace(pathname, { locale: LOCALE.PL })}
            >
              PL
            </span>
            <span>/</span>
            <span
              className={`border-b-2 ${
                params?.locale === "en"
                  ? "border-blue-600"
                  : "border-transparent"
              } cursor-pointer transition`}
              onClick={() => router.replace(pathname, { locale: LOCALE.EN })}
            >
              EN
            </span>
          </div>
        </div>
        <div className="md:hidden items-center cursor-pointer hover:text-[#2f528a] transition">
          {isMobileMenuOpen ? (
            <AiOutlineClose onClick={toggleOpen} size={25} />
          ) : (
            <AiOutlineMenu onClick={toggleOpen} size={25} />
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute bg-neutral-50 p-1 shadow-sm w-[30vw] overflow-hidden right-0 top-10 text-lg transition md:hidden">
          <div className="flex flex-col">
            {navigation.map((el) => (
              <MenuItem key={el.label} label={el.label} href={el.href} />
            ))}
            <div className="font-semibold flex flex-row gap-2 ml-4">
              <span
                className={`border-b-2 ${
                  params?.locale === LOCALE.PL
                    ? "border-blue-600"
                    : "border-transparent"
                } cursor-pointer transition`}
                onClick={() => router.replace(pathname, { locale: LOCALE.PL })}
              >
                PL
              </span>
              <span>/</span>
              <span
                className={`border-b-2 ${
                  params?.locale === LOCALE.EN
                    ? "border-blue-600"
                    : "border-transparent"
                } cursor-pointer transition`}
                onClick={() => router.replace(pathname, { locale: LOCALE.EN })}
              >
                EN
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
