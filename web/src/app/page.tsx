import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Bare `/` → default locale (middleware also handles this). */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
