import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("nav");
  return (
    <a className="skip-link" href="#main-content">
      {t("skipToContent")}
    </a>
  );
}
