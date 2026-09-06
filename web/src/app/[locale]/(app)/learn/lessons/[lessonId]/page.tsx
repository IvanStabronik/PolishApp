import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLessonById } from "@/modules/content";
import { LessonPlayer } from "@/components/exercise/lesson-player";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { getRequestSession } from "@/modules/auth/session";

type Props = {
  params: Promise<{ locale: string; lessonId: string }>;
};

export default async function LessonPage({ params }: Props) {
  const { locale, lessonId } = await params;
  setRequestLocale(locale);
  await getTranslations("learn");

  const lesson = await getLessonById(lessonId);
  if (!lesson) notFound();

  const session = await getRequestSession();
  const canDraft = canAccessDraftContent({
    roles: session?.roles ?? [],
    email: session?.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  });

  return (
    <LessonPlayer
      lesson={lesson}
      moduleHref={`/learn/modules/${lesson.moduleId}`}
      preview={canDraft}
    />
  );
}
