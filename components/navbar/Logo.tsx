"use client";

import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="Logo"
      className="cursor-pointer h-16 w-auto"
      height={100}
      width={100}
      src="/images/inglot-logo.png"
    />
  );
};