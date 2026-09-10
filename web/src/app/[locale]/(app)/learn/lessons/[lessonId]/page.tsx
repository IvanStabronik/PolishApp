import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLessonById } from "@/modules/content";
import { LessonPlayer } from "@/components/exercise/lesson-player";
import {
  canAccessDraftContent,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";
import { protectApp } from "@/lib/auth/protect";

type Props = {
  params: Promise<{ locale: string; lessonId: string }>;
};

export default async function LessonPage({ params }: Props) {
  const { locale, lessonId } = await params;
  setRequestLocale(locale);
  await getTranslations("learn");

  const session = await protectApp(locale, `/${locale}/learn/lessons/${lessonId}`);

  const lesson = await getLessonById(lessonId);
  if (!lesson) notFound();

  const canDraft = canAccessDraftContent({
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  });

  return (
    <LessonPlayer
      lesson={lesson}
      moduleHref={`/learn/modules/${lesson.moduleId}`}
      preview={canDraft}
    />
  );
}
