import { NAVIGATION_TRANSLATIONS } from "@/constants/translations";
import { ROUTES } from "./routes";

export const navigation = [
  { label: NAVIGATION_TRANSLATIONS.navigation.boats, href: ROUTES.BOATS },
  { label: NAVIGATION_TRANSLATIONS.navigation.producers, href: ROUTES.PRODUCERS },
  { label: NAVIGATION_TRANSLATIONS.navigation.colors, href: ROUTES.COLORS },
];