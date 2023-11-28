"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import { MODES } from "@/constants/modes";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { COMMON_TRANSLATIONS } from "@/constants/translations";
import { deleteColor, patchColor, postColor} from "../api/api";
import { AlertModal } from "@/components/modals/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { COLORS_FORM_TRANSLATION } from "../../constants/translations";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mode = initialData ? MODES.EDIT : MODES.NEW;
  
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          name: "",
          isFeatured: false,
          isArchived: false,
          value: "",
        },
  });

  const onSubmit = async (values: ColorFormValues) => {
    setIsLoading(true);

    try {
      if (initialData) {
        patchColor(values, params.colorId as string);
      } else {
        postColor(values);
      }
      router.refresh();
      router.push(ROUTES.COLORS);
      toast.success(t(COLORS_FORM_TRANSLATION.colorForm[mode].toastMessage));
    } catch (error) {
      toast.error(t(COMMON_TRANSLATIONS.common.errorToast));
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    deleteColor(params.colorId as string)
      .then(() => {
        router.refresh();
        router.push(ROUTES.COLORS);
        toast.success(t(COLORS_FORM_TRANSLATION.colorForm.delete.toastMessage));
      })
      .catch(() => {
        toast.error(t(COMMON_TRANSLATIONS.common.errorToast));
      })
      .finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={COLORS_FORM_TRANSLATION.colorForm[mode].title}
          description={COLORS_FORM_TRANSLATION.colorForm[mode].description}
        />
        {initialData ? (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mass (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="Blue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value (#F0F0F0)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="#F6C200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isFeatured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="isArchived"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          <Button disabled={isLoading} type="submit">
            {t(COLORS_FORM_TRANSLATION.colorForm[mode].actionLabel)}
          </Button>
        </form>
      </Form>
    </>
  );
};
