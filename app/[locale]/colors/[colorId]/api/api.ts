import axios from "axios";
import { ColorFormValues } from "../components/color-form";

export const patchColor = async (
  values: ColorFormValues,
  colorId: string
) => {
  const response = await axios.patch(`/api/colors/${colorId}`, values);

  return response.data;
};

export const postColor = async (values: ColorFormValues) => {
  const response = await axios.post(`/api/colors`, values);

  return response.data;
};

export const deleteColor = async (colorId: string) => {
  const response = await axios.delete(`/api/colors/${colorId}`);

  return response.data;
};
