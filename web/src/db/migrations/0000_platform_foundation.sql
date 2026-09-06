CREATE TYPE "public"."ui_locale" AS ENUM('ru', 'uk', 'pl');--> statement-breakpoint
CREATE TYPE "public"."l1" AS ENUM('ukr', 'rus', 'bel');--> statement-breakpoint
CREATE TYPE "public"."app_role" AS ENUM('learner', 'author', 'reviewer', 'admin');--> statement-breakpoint
CREATE TYPE "public"."content_status" AS ENUM('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."content_kind" AS ENUM('level', 'module', 'lesson', 'lesson_step', 'concept', 'function', 'scenario', 'lexical_bundle', 'exercise', 'dialogue', 'grammar_point', 'other');--> statement-breakpoint
CREATE TYPE "public"."concept_kind" AS ENUM('grammar', 'phonology', 'orthography', 'pragmatics', 'lexis', 'other');--> statement-breakpoint
CREATE TYPE "public"."mastery_state" AS ENUM('NOT_STARTED', 'LEARNING', 'PRACTICING', 'DEMONSTRATED', 'MASTERED', 'REVIEW_DUE');--> statement-breakpoint
CREATE TYPE "public"."attempt_mode" AS ENUM('formative', 'summative', 'preview');--> statement-breakpoint
CREATE TYPE "public"."evidence_result" AS ENUM('correct', 'incorrect', 'partial', 'pending');--> statement-breakpoint
CREATE TYPE "public"."review_decision" AS ENUM('approve', 'reject');--> statement-breakpoint
CREATE TYPE "public"."exercise_type" AS ENUM('single_choice', 'multiple_choice', 'gap_fill', 'ordering');--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"role_flags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "learner_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"ui_locale" "ui_locale" DEFAULT 'ru' NOT NULL,
	"l1" "l1" NOT NULL,
	"level" text,
	"goal" text,
	"weekly_goal" integer,
	"onboarding_complete" boolean DEFAULT false NOT NULL,
	"timezone" text DEFAULT 'Europe/Warsaw' NOT NULL,
	"goals" jsonb DEFAULT '{}'::jsonb,
	"weekly_minutes" integer,
	"consents" jsonb DEFAULT '{"ageConfirmed18":false}'::jsonb NOT NULL,
	"age_confirmed_18" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"role" "app_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "levels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"kind" "concept_kind" NOT NULL,
	"title" text NOT NULL,
	"level_code" text NOT NULL,
	"summary" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "concept_dependencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"concept_id" uuid NOT NULL,
	"depends_on_concept_id" uuid NOT NULL,
	"relation_type" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "functions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"title" text NOT NULL,
	"level_code" text NOT NULL,
	"summary" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "scenarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"title" text NOT NULL,
	"level_code" text NOT NULL,
	"domain" text,
	"summary" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "lexical_bundles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"title" text NOT NULL,
	"level_code" text NOT NULL,
	"forms" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "function_concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"function_id" uuid NOT NULL,
	"concept_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "scenario_functions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scenario_id" uuid NOT NULL,
	"function_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "function_lexical_bundles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"function_id" uuid NOT NULL,
	"lexical_bundle_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "content_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"kind" "content_kind" NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "content_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"unit_id" uuid NOT NULL,
	"version_no" integer NOT NULL,
	"status" "content_status" DEFAULT 'DRAFT' NOT NULL,
	"author_user_id" text,
	"reviewer_id" text,
	"provenance" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"content_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "provenance_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_version_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"actor_user_id" text,
	"details" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "source_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provenance_record_id" uuid NOT NULL,
	"ref_type" text NOT NULL,
	"ref_value" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_id" text NOT NULL,
	"level_id" uuid,
	"working_title" text NOT NULL,
	"slug" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published_version_id" uuid,
	"content_version_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" uuid NOT NULL,
	"canonical_id" text NOT NULL,
	"title" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"content_version_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "lesson_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"canonical_id" text NOT NULL,
	"step_type" text NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"content_version_id" uuid,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" uuid NOT NULL,
	"canonical_id" text NOT NULL,
	"exercise_type" "exercise_type" NOT NULL,
	"content_version_id" uuid,
	"answer_key" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "module_concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" uuid NOT NULL,
	"concept_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_version_id" uuid NOT NULL,
	"reviewer_user_id" text NOT NULL,
	"decision" "review_decision" NOT NULL,
	"comment" text,
	"checklist" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "publication_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_version_id" uuid NOT NULL,
	"actor_user_id" text,
	"from_status" "content_status",
	"to_status" "content_status" NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "privacy_audit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" text,
	"subject_user_id" text,
	"action" text NOT NULL,
	"details" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"module_id" uuid NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"enrolled_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "learning_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"module_id" uuid,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"learning_session_id" uuid,
	"exercise_id" uuid,
	"lesson_step_id" uuid,
	"content_version_id" uuid NOT NULL,
	"response" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"correct" boolean,
	"hinted" boolean DEFAULT false NOT NULL,
	"mode" "attempt_mode" DEFAULT 'formative' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "attempt_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attempt_id" uuid NOT NULL,
	"response" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"correct" boolean,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "evidence_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attempt_id" uuid NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"concept_canonical_id" text NOT NULL,
	"skill" text,
	"weight" numeric(5, 2),
	"hinted" boolean DEFAULT false NOT NULL,
	"exam_like" boolean DEFAULT false NOT NULL,
	"result" "evidence_result" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "concept_mastery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"concept_canonical_id" text NOT NULL,
	"state" "mastery_state" DEFAULT 'NOT_STARTED' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"explanation_snapshot" jsonb
);--> statement-breakpoint
CREATE TABLE "module_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"module_id" uuid NOT NULL,
	"lessons_completed" integer DEFAULT 0 NOT NULL,
	"percent_complete" integer DEFAULT 0 NOT NULL,
	"state" text DEFAULT 'not_started' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "review_schedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_profile_id" uuid NOT NULL,
	"concept_canonical_id" text NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"interval_days" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner_profiles" ADD CONSTRAINT "learner_profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concept_dependencies" ADD CONSTRAINT "concept_dependencies_concept_id_concepts_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concept_dependencies" ADD CONSTRAINT "concept_dependencies_depends_on_concept_id_concepts_id_fk" FOREIGN KEY ("depends_on_concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_concepts" ADD CONSTRAINT "function_concepts_function_id_functions_id_fk" FOREIGN KEY ("function_id") REFERENCES "public"."functions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_concepts" ADD CONSTRAINT "function_concepts_concept_id_concepts_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenario_functions" ADD CONSTRAINT "scenario_functions_scenario_id_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."scenarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenario_functions" ADD CONSTRAINT "scenario_functions_function_id_functions_id_fk" FOREIGN KEY ("function_id") REFERENCES "public"."functions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_lexical_bundles" ADD CONSTRAINT "function_lexical_bundles_function_id_functions_id_fk" FOREIGN KEY ("function_id") REFERENCES "public"."functions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "function_lexical_bundles" ADD CONSTRAINT "function_lexical_bundles_lexical_bundle_id_lexical_bundles_id_fk" FOREIGN KEY ("lexical_bundle_id") REFERENCES "public"."lexical_bundles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_versions" ADD CONSTRAINT "content_versions_unit_id_content_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."content_units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_versions" ADD CONSTRAINT "content_versions_author_user_id_user_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_versions" ADD CONSTRAINT "content_versions_reviewer_id_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provenance_records" ADD CONSTRAINT "provenance_records_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provenance_records" ADD CONSTRAINT "provenance_records_actor_user_id_user_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_references" ADD CONSTRAINT "source_references_provenance_record_id_provenance_records_id_fk" FOREIGN KEY ("provenance_record_id") REFERENCES "public"."provenance_records"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_level_id_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_published_version_id_content_versions_id_fk" FOREIGN KEY ("published_version_id") REFERENCES "public"."content_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_steps" ADD CONSTRAINT "lesson_steps_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_steps" ADD CONSTRAINT "lesson_steps_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_concepts" ADD CONSTRAINT "module_concepts_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_concepts" ADD CONSTRAINT "module_concepts_concept_id_concepts_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_user_id_user_id_fk" FOREIGN KEY ("reviewer_user_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publication_events" ADD CONSTRAINT "publication_events_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publication_events" ADD CONSTRAINT "publication_events_actor_user_id_user_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "privacy_audit" ADD CONSTRAINT "privacy_audit_actor_user_id_user_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "privacy_audit" ADD CONSTRAINT "privacy_audit_subject_user_id_user_id_fk" FOREIGN KEY ("subject_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_learning_session_id_learning_sessions_id_fk" FOREIGN KEY ("learning_session_id") REFERENCES "public"."learning_sessions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_lesson_step_id_lesson_steps_id_fk" FOREIGN KEY ("lesson_step_id") REFERENCES "public"."lesson_steps"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_content_version_id_content_versions_id_fk" FOREIGN KEY ("content_version_id") REFERENCES "public"."content_versions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_records" ADD CONSTRAINT "evidence_records_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_records" ADD CONSTRAINT "evidence_records_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "concept_mastery" ADD CONSTRAINT "concept_mastery_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_progress" ADD CONSTRAINT "module_progress_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_progress" ADD CONSTRAINT "module_progress_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_schedule" ADD CONSTRAINT "review_schedule_learner_profile_id_learner_profiles_id_fk" FOREIGN KEY ("learner_profile_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE UNIQUE INDEX "learner_profiles_user_id_uidx" ON "learner_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_roles_user_role_uidx" ON "user_roles" USING btree ("user_id","role");--> statement-breakpoint
CREATE UNIQUE INDEX "levels_canonical_id_uidx" ON "levels" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "levels_code_uidx" ON "levels" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "concepts_canonical_id_uidx" ON "concepts" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "concept_dependencies_pair_uidx" ON "concept_dependencies" USING btree ("concept_id","depends_on_concept_id");--> statement-breakpoint
CREATE UNIQUE INDEX "functions_canonical_id_uidx" ON "functions" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "scenarios_canonical_id_uidx" ON "scenarios" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lexical_bundles_canonical_id_uidx" ON "lexical_bundles" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "function_concepts_pair_uidx" ON "function_concepts" USING btree ("function_id","concept_id");--> statement-breakpoint
CREATE UNIQUE INDEX "scenario_functions_pair_uidx" ON "scenario_functions" USING btree ("scenario_id","function_id");--> statement-breakpoint
CREATE UNIQUE INDEX "function_lexical_bundles_pair_uidx" ON "function_lexical_bundles" USING btree ("function_id","lexical_bundle_id");--> statement-breakpoint
CREATE UNIQUE INDEX "content_units_canonical_id_uidx" ON "content_units" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "content_versions_unit_version_uidx" ON "content_versions" USING btree ("unit_id","version_no");--> statement-breakpoint
CREATE INDEX "provenance_records_content_version_id_idx" ON "provenance_records" USING btree ("content_version_id");--> statement-breakpoint
CREATE INDEX "source_references_provenance_record_id_idx" ON "source_references" USING btree ("provenance_record_id");--> statement-breakpoint
CREATE UNIQUE INDEX "modules_canonical_id_uidx" ON "modules" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "modules_slug_uidx" ON "modules" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_canonical_id_uidx" ON "lessons" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_steps_canonical_id_uidx" ON "lesson_steps" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "exercises_canonical_id_uidx" ON "exercises" USING btree ("canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "module_concepts_pair_uidx" ON "module_concepts" USING btree ("module_id","concept_id");--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_learner_module_uidx" ON "enrollments" USING btree ("learner_profile_id","module_id");--> statement-breakpoint
CREATE INDEX "learning_sessions_learner_profile_id_idx" ON "learning_sessions" USING btree ("learner_profile_id");--> statement-breakpoint
CREATE INDEX "attempts_learner_profile_id_idx" ON "attempts" USING btree ("learner_profile_id");--> statement-breakpoint
CREATE INDEX "attempts_learning_session_id_idx" ON "attempts" USING btree ("learning_session_id");--> statement-breakpoint
CREATE INDEX "attempt_answers_attempt_id_idx" ON "attempt_answers" USING btree ("attempt_id");--> statement-breakpoint
CREATE INDEX "evidence_records_attempt_id_idx" ON "evidence_records" USING btree ("attempt_id");--> statement-breakpoint
CREATE INDEX "evidence_records_learner_profile_id_idx" ON "evidence_records" USING btree ("learner_profile_id");--> statement-breakpoint
CREATE UNIQUE INDEX "concept_mastery_learner_concept_uidx" ON "concept_mastery" USING btree ("learner_profile_id","concept_canonical_id");--> statement-breakpoint
CREATE UNIQUE INDEX "module_progress_learner_module_uidx" ON "module_progress" USING btree ("learner_profile_id","module_id");--> statement-breakpoint
CREATE UNIQUE INDEX "review_schedule_learner_concept_uidx" ON "review_schedule" USING btree ("learner_profile_id","concept_canonical_id");
