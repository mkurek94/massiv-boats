"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import React, { useEffect, useState } from "react";
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
import { getServerSession } from "next-auth/next";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { ROUTES } from "@/constants/routes";

interface LoginFormProps {
  isLoggedIn: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({isLoggedIn}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if(isLoggedIn) {
      router.push(ROUTES.MAIN)
    }
  }, [router, isLoggedIn])

  const formSchema = z.object({
    email: z.string().min(1, {
      message: t(AUTH_TRANSLATIONS.auth.login.email.emptyError),
    }),
    password: z.string().min(8, {
      message: t(AUTH_TRANSLATIONS.auth.login.password.validationError),
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

    signIn("credentials", { ...values, redirect: false }).then((status) => {
      setIsLoading(false);

      if (status?.ok) {
        toast.success(t(AUTH_TRANSLATIONS.auth.login.toast.success));
        router.push(ROUTES.BOATS);
      }

      if (status?.error) {
        toast.error(status.error);
        toast.success(t(AUTH_TRANSLATIONS.auth.login.toast.failure));
      }
    });
  };

  return (
    <div className="flex flex-row flex-wrap justify-between p-8 gap-8 w-full mx-auto">
      <div className="flex flex-col mx-auto w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(AUTH_TRANSLATIONS.auth.login.email.label)}
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
                    {t(AUTH_TRANSLATIONS.auth.login.password.label)}
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
              <span>{t(AUTH_TRANSLATIONS.auth.login.text.label)}</span>
              <Button
                type="button"
                variant="link"
                onClick={() => router.push(ROUTES.SIGN_UP)}
              >
                {t(AUTH_TRANSLATIONS.auth.login.text.button)}
              </Button>
            </div>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-800">
              {t(AUTH_TRANSLATIONS.auth.login.button)}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
