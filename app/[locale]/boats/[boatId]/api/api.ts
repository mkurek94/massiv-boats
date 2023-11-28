import axios from "axios";
import { BoatFormValues } from "../components/boat-form";

export const patchBoatModel = async (
  values: BoatFormValues,
  boatId: string
) => {
  const response = await axios.patch(`/api/boats/${boatId}`, values);

  return response.data;
};

export const postBoatModel = async (values: BoatFormValues) => {
  const response = await axios.post(`/api/boats`, values);

  return response.data;
};

export const deleteBoatModel = async (boatId: string) => {
  const response = await axios.delete(`/api/boats/${boatId}`);

  return response.data;
};
