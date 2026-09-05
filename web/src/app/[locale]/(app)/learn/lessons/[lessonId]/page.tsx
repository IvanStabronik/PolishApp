import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLessonById } from "@/modules/content";
import { LessonPlayer } from "@/components/exercise/lesson-player";
import { isDemoPreviewEnabled } from "@/lib/demo";

type Props = {
  params: Promise<{ locale: string; lessonId: string }>;
};

export default async function LessonPage({ params }: Props) {
  const { locale, lessonId } = await params;
  setRequestLocale(locale);
  await getTranslations("learn");

  const lesson = await getLessonById(lessonId);
  if (!lesson) notFound();

  return (
    <LessonPlayer
      lesson={lesson}
      moduleHref={`/learn/modules/${lesson.moduleId}`}
      preview={isDemoPreviewEnabled()}
    />
  );
}
