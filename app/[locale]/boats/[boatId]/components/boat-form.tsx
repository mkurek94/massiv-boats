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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Boat, Color } from "@prisma/client";
import { MODES } from "@/constants/modes";
import { BOAT_FORM_TRANSLATION } from "../constants/translations";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { COMMON_TRANSLATIONS } from "@/constants/translations";
import { deleteBoatModel, patchBoatModel, postBoatModel } from "../api/api";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "@/components/image-upload";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
  producer: z.string().min(1),
  colorId: z.string().min(1),
  mass: z.number().min(1),
  width: z.number().min(1),
  height: z.number().min(1),
  length: z.number().min(1),
  colors: z.string().array(),
  images: z.object({ url: z.string() }).array(),
});

export type BoatFormValues = z.infer<typeof formSchema>;

interface BoatFormProps {
  initialData: Boat | null;
  colors: Color[] | null;
}

export const BoatForm: React.FC<BoatFormProps> = ({
  initialData,
  colors
}) => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mode = initialData ? MODES.EDIT : MODES.NEW;
  
  const form = useForm<BoatFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          name: "",
          colors: [],
          mass: 0,
          width: 0,
          height: 0,
          length: 0,
          price: 0,
          producer: "",
          description: "",
          images: [],
        },
  });

  const onSubmit = async (values: BoatFormValues) => {
    setIsLoading(true);

    try {
      if (initialData) {
        patchBoatModel(values, params.boatId as string);
      } else {
        postBoatModel(values);
      }
      router.refresh();
      router.push(ROUTES.BOATS);
      toast.success(t(BOAT_FORM_TRANSLATION.boatForm[mode].toastMessage));
    } catch (error) {
      toast.error(t(COMMON_TRANSLATIONS.common.errorToast));
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    deleteBoatModel(params.boatId as string)
      .then(() => {
        router.refresh();
        router.push(ROUTES.BOATS);
        toast.success(t(BOAT_FORM_TRANSLATION.boatForm.delete.toastMessage));
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
          title={BOAT_FORM_TRANSLATION.boatForm[mode].title}
          description={BOAT_FORM_TRANSLATION.boatForm[mode].description}
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
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isLoading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
          <FormField
              name="producer"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Producer name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="width"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (m)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="2.35"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="height"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (m)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="2.35"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="length"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length (m)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="2.35"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="mass"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mass (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="2320"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="colorId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors?.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Boat description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {t(BOAT_FORM_TRANSLATION.boatForm[mode].actionLabel)}
          </Button>
        </form>
      </Form>
    </>
  );
};
