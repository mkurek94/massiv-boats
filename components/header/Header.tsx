import React from "react";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";

interface HeaderProps {
  headerText: string;
  subHeaderText: string;
  actionButton?: React.ReactElement;
}

export const Header: React.FC<HeaderProps> = ({
  headerText,
  subHeaderText,
  actionButton,
}) => {
  const t = useTranslations();
  return (
    <>
      <div className="flex justify-between w-full mb-3">
        <div className="flex flex-col">
          <h2 className="text-3xl bold py-2">{headerText}</h2>
          <h3 className="text-gray-500">{subHeaderText}</h3>
        </div>
        {actionButton}
      </div>
      <Separator className="bg-gray-800"/>
    </>
  );
};
