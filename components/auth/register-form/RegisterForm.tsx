"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { AUTH_TRANSLATIONS } from "@/constants/translations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ROUTES } from "@/constants/routes";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const formSchema = z.object({
    email: z.string().min(1, {
      message: t(AUTH_TRANSLATIONS.auth.register.email.emptyError),
    }),
    password: z.string().min(8, {
      message: t(AUTH_TRANSLATIONS.auth.register.password.validationError),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    axios
      .post("/api/register", values)
      .then(() => {
        toast.success(t(AUTH_TRANSLATIONS.auth.register.toast.success));
      })
      .catch((err) => {
        toast.error(t(AUTH_TRANSLATIONS.auth.register.toast.failure));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-row flex-wrap justify-between bg-neutral-100 mt-16 p-8 gap-8 w-full mx-auto">
      <div className="flex flex-col mx-auto w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(AUTH_TRANSLATIONS.auth.register.email.label)}
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(AUTH_TRANSLATIONS.auth.register.password.label)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder=""
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <span>{t(AUTH_TRANSLATIONS.auth.register.text.label)}</span>
              <Button
                type="button"
                variant="link"
                onClick={() => router.push(ROUTES.SIGN_IN)}
              >
                {t(AUTH_TRANSLATIONS.auth.register.text.button)}
              </Button>
            </div>
            <Button type="submit" disabled={isLoading}>
              {t(AUTH_TRANSLATIONS.auth.register.button)}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
