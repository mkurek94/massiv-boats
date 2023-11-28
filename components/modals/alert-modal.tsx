"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ALERT_MODAL_TRANSLATIONS } from "./constants/translations";
import { useTranslations } from "next-intl";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={ALERT_MODAL_TRANSLATIONS.alertModal.title}
      description={ALERT_MODAL_TRANSLATIONS.alertModal.description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          {t(ALERT_MODAL_TRANSLATIONS.alertModal.cancel)}
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          {t(ALERT_MODAL_TRANSLATIONS.alertModal.submit)}
        </Button>
      </div>
    </Modal>
  );
};
