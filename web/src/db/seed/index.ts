import { and, eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DEMO_ACCOUNTS, isDemoMode } from "@/modules/auth/demo";
import { allowDemoSeed } from "@/modules/admin/roles";
import { seedBetaInviteSlots } from "@/modules/beta";
import type { UserRole } from "@/lib/enums";
import { upsertModulePackage } from "@/modules/content/import-module";
import {
  loadModulePackage,
  resolveContentRoot,
} from "@/modules/content/load-package";
import { getDb, getSql } from "../client";
import { loadEnvFiles } from "../load-env";
import {
  account,
  contentUnits,
  contentVersions,
  learnerProfiles,
  levels,
  modules,
  user,
  userRoles,
} from "../schema";

loadEnvFiles();

type DemoKey = keyof typeof DEMO_ACCOUNTS;


async function upsertDemoUser(key: DemoKey): Promise<string> {
  const db = getDb();
  const demo = DEMO_ACCOUNTS[key];
  const existing = await db.query.user.findFirst({
    where: eq(user.email, demo.email),
  });

  if (existing) {
    await db
      .update(user)
      .set({
        roleFlags: [...demo.roles] as UserRole[],
        updatedAt: new Date(),
      })
      .where(eq(user.id, existing.id));
    await syncUserRoles(existing.id, demo.roles);

    const passwordHash = await hashPassword(demo.password);
    const cred = await db.query.account.findFirst({
      where: and(
        eq(account.userId, existing.id),
        eq(account.providerId, "credential"),
      ),
    });
    if (cred) {
      await db
        .update(account)
        .set({ password: passwordHash, updatedAt: new Date() })
        .where(eq(account.id, cred.id));
    } else {
      const now = new Date();
      await db.insert(account).values({
        id: randomUUID(),
        accountId: existing.id,
        providerId: "credential",
        issuer: "local:credential",
        userId: existing.id,
        password: passwordHash,
        createdAt: now,
        updatedAt: now,
      });
    }
    return existing.id;
  }

  const userId = randomUUID();
  const now = new Date();
  await db.insert(user).values({
    id: userId,
    name: demo.name,
    email: demo.email,
    emailVerified: true,
    roleFlags: [...demo.roles] as UserRole[],
    createdAt: now,
    updatedAt: now,
  });

  const passwordHash = await hashPassword(demo.password);
  await db.insert(account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    issuer: "local:credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  await syncUserRoles(userId, demo.roles);
  return userId;
}

async function syncUserRoles(
  userId: string,
  roles: readonly UserRole[],
): Promise<void> {
  const db = getDb();
  for (const role of roles) {
    const existing = await db.query.userRoles.findFirst({
      where: and(eq(userRoles.userId, userId), eq(userRoles.role, role)),
    });
    if (!existing) {
      await db.insert(userRoles).values({ userId, role });
    }
  }
}

async function seedLevelA1(): Promise<string> {
  const db = getDb();
  const existing = await db.query.levels.findFirst({
    where: eq(levels.canonicalId, "LVL-A1"),
  });
  if (existing) return existing.id;

  const [inserted] = await db
    .insert(levels)
    .values({
      canonicalId: "LVL-A1",
      code: "A1",
      title: "A1 — Pierwszy kontakt",
      sortOrder: 1,
      description:
        "Breakthrough Polish for everyday first contact (internal curriculum level).",
    })
    .returning({ id: levels.id });
  return inserted!.id;
}

async function seedLearnerProfile(userId: string) {
  const db = getDb();
  const existing = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, userId),
  });
  if (existing) {
    await db
      .update(learnerProfiles)
      .set({
        level: "A1",
        goal: "Pierwsze rozmowy po polsku",
        weeklyGoal: 5,
        onboardingComplete: true,
        timezone: "Europe/Warsaw",
        goals: { primary: "Pierwsze rozmowy po polsku" },
        weeklyMinutes: 120,
        updatedAt: new Date(),
      })
      .where(eq(learnerProfiles.id, existing.id));
    return;
  }

  await db.insert(learnerProfiles).values({
    userId,
    uiLocale: "ru",
    l1: "ukr",
    level: "A1",
    goal: "Pierwsze rozmowy po polsku",
    weeklyGoal: 5,
    onboardingComplete: true,
    timezone: "Europe/Warsaw",
    goals: { primary: "Pierwsze rozmowy po polsku" },
    weeklyMinutes: 120,
    ageConfirmed18: true,
    consents: {
      ageConfirmed18: true,
      termsAcceptedAt: new Date().toISOString(),
      privacyAcceptedAt: new Date().toISOString(),
    },
  });
}

async function seedDraftPlaceholders(
  authorId: string,
  levelId: string,
): Promise<void> {
  const db = getDb();
  const canonicalId = "MOD-A1-PIERWSZE-SPOTKANIE";
  const existing = await db.query.modules.findFirst({
    where: eq(modules.canonicalId, canonicalId),
  });
  if (existing) {
    console.log("db:seed — draft module placeholder already present.");
    return;
  }

  const [unit] = await db
    .insert(contentUnits)
    .values({
      canonicalId,
      kind: "module",
      title: "Pierwsze spotkanie (DRAFT placeholder)",
    })
    .returning({ id: contentUnits.id });

  const [version] = await db
    .insert(contentVersions)
    .values({
      unitId: unit!.id,
      versionNo: 1,
      status: "DRAFT",
      authorUserId: authorId,
      provenance: {
        originality: "seed_placeholder",
        note: "YAML import unavailable; DRAFT metadata only. JPJO review not claimed.",
      },
      payload: { placeholder: true },
    })
    .returning({ id: contentVersions.id });

  await db.insert(modules).values({
    canonicalId,
    levelId,
    workingTitle: "Pierwsze spotkanie",
    slug: "pierwsze-spotkanie",
    sortOrder: 1,
    contentVersionId: version!.id,
    publishedVersionId: null,
    metadata: { seedPlaceholder: true, status: "DRAFT" },
  });

  console.log(
    "db:seed — inserted DRAFT content_units/content_versions/modules placeholders (not PUBLISHED).",
  );
}

async function seedAllDraftModules(authorId: string, levelId: string) {
  let modulesRoot: string;
  try {
    modulesRoot = path.join(
      resolveContentRoot(process.cwd()),
      "content",
      "a1",
      "modules",
    );
  } catch (err) {
    console.warn(
      `db:seed — content root missing (${err instanceof Error ? err.message : String(err)}); using placeholders.`,
    );
    await seedDraftPlaceholders(authorId, levelId);
    return;
  }

  if (!fs.existsSync(modulesRoot)) {
    await seedDraftPlaceholders(authorId, levelId);
    return;
  }

  const dirs = fs
    .readdirSync(modulesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let imported = 0;
  for (const dir of dirs) {
    const moduleDir = path.join(modulesRoot, dir);
    if (!fs.existsSync(path.join(moduleDir, "module.yaml"))) continue;

    const loaded = loadModulePackage(moduleDir);
    if (!loaded.ok || !loaded.package) {
      console.warn(`db:seed — skip invalid package at ${moduleDir}`);
      for (const issue of loaded.issues) {
        console.warn(`  [${issue.code}] ${issue.path}: ${issue.message}`);
      }
      continue;
    }

    const pkg = loaded.package;
    const draftPkg = {
      module: { ...pkg.module, status: "DRAFT" as const },
      lessons: pkg.lessons.map((l) => ({
        ...l,
        status: "DRAFT" as const,
        exercises: l.exercises.map((e) => ({ ...e, status: "DRAFT" as const })),
      })),
    };

    const result = await upsertModulePackage(getDb(), draftPkg, {
      authorUserId: authorId,
    });

    await getDb()
      .update(modules)
      .set({
        levelId,
        slug: pkg.module.slug ?? dir,
        updatedAt: new Date(),
      })
      .where(eq(modules.id, result.moduleId));

    console.log(
      `imported ${pkg.module.canonical_id} as DRAFT (module=${result.moduleId}, lessons=${result.lessonCount}, exercises=${result.exerciseCount})`,
    );
    imported += 1;
  }

  if (imported === 0) {
    await seedDraftPlaceholders(authorId, levelId);
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("db:seed — DATABASE_URL not set.");
    process.exit(1);
  }

  if (!allowDemoSeed()) {
    console.log(
      "Skipping seed (demo seed not allowed). Set DEMO_MODE=true (non-production) or FORCE_SEED=true / ALLOW_PRODUCTION_DEMO.",
    );
    return;
  }

  if (!isDemoMode() && process.env.FORCE_SEED !== "true") {
    console.log(
      "Skipping seed (DEMO_MODE is not true). Set DEMO_MODE=true or FORCE_SEED=true.",
    );
    return;
  }

  console.log("Seeding demo users + roles + LVL-A1 + DRAFT A1 modules + beta slots…");

  const learnerId = await upsertDemoUser("learner");
  const authorId = await upsertDemoUser("author");
  const reviewerId = await upsertDemoUser("reviewer");
  const adminId = await upsertDemoUser("admin");

  if (
    learnerId === authorId ||
    authorId === reviewerId ||
    learnerId === reviewerId ||
    adminId === learnerId
  ) {
    throw new Error("Demo users must remain distinct identities");
  }

  const levelId = await seedLevelA1();
  await seedLearnerProfile(learnerId);
  await seedAllDraftModules(authorId, levelId);

  const db = getDb();
  const existingSlots = await db.query.betaInvites.findMany();
  if (existingSlots.length < 15) {
    const need = 15 - existingSlots.length;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const { created } = await seedBetaInviteSlots({
      actorUserId: adminId,
      count: need,
      expiresAt,
    });
    console.log(
      `db:seed — created ${created} beta invite slot(s); plaintext tokens discarded (never logged).`,
    );
  } else {
    console.log("db:seed — beta invite slots already present (≥15).");
  }

  console.log("Seed complete.");
  console.log("  learner: ", DEMO_ACCOUNTS.learner.email, DEMO_ACCOUNTS.learner.roles);
  console.log("  author:  ", DEMO_ACCOUNTS.author.email);
  console.log("  reviewer:", DEMO_ACCOUNTS.reviewer.email);
  console.log("  admin:   ", DEMO_ACCOUNTS.admin.email);
  console.log(
    "Note: A1 modules stay DRAFT (internal preview); JPJO review pending; A2–B2 not started.",
  );

  await getSql().end({ timeout: 5 });
}

main().catch(async (err) => {
  console.error(err);
  try {
    await getSql().end({ timeout: 5 });
  } catch {
    /* ignore */
  }
  process.exit(1);
});
