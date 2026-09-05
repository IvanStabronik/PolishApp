import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { conceptKindEnum, timestamps } from "./enums";

/**
 * Curriculum graph (levels → concepts / functions / scenarios / lexical bundles).
 * Does NOT import content.ts — module_concepts lives in content.ts to avoid cycles.
 */

export const levels = pgTable(
  "levels",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    code: text("code").notNull(),
    title: text("title").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    description: text("description"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("levels_canonical_id_uidx").on(table.canonicalId),
    uniqueIndex("levels_code_uidx").on(table.code),
  ],
);

export const concepts = pgTable(
  "concepts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    kind: conceptKindEnum("kind").notNull(),
    title: text("title").notNull(),
    levelCode: text("level_code").notNull(),
    summary: text("summary"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("concepts_canonical_id_uidx").on(table.canonicalId),
  ],
);

export const conceptDependencies = pgTable(
  "concept_dependencies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    conceptId: uuid("concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    dependsOnConceptId: uuid("depends_on_concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    relationType: text("relation_type").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("concept_dependencies_pair_uidx").on(
      table.conceptId,
      table.dependsOnConceptId,
    ),
  ],
);

export const functions = pgTable(
  "functions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    title: text("title").notNull(),
    levelCode: text("level_code").notNull(),
    summary: text("summary"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("functions_canonical_id_uidx").on(table.canonicalId),
  ],
);

export const scenarios = pgTable(
  "scenarios",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    title: text("title").notNull(),
    levelCode: text("level_code").notNull(),
    domain: text("domain"),
    summary: text("summary"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("scenarios_canonical_id_uidx").on(table.canonicalId),
  ],
);

export const lexicalBundles = pgTable(
  "lexical_bundles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    title: text("title").notNull(),
    levelCode: text("level_code").notNull(),
    forms: jsonb("forms").$type<Record<string, unknown>>().notNull().default({}),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("lexical_bundles_canonical_id_uidx").on(table.canonicalId),
  ],
);

export const functionConcepts = pgTable(
  "function_concepts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    functionId: uuid("function_id")
      .notNull()
      .references(() => functions.id, { onDelete: "cascade" }),
    conceptId: uuid("concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("function_concepts_pair_uidx").on(
      table.functionId,
      table.conceptId,
    ),
  ],
);

export const scenarioFunctions = pgTable(
  "scenario_functions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scenarioId: uuid("scenario_id")
      .notNull()
      .references(() => scenarios.id, { onDelete: "cascade" }),
    functionId: uuid("function_id")
      .notNull()
      .references(() => functions.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("scenario_functions_pair_uidx").on(
      table.scenarioId,
      table.functionId,
    ),
  ],
);

export const functionLexicalBundles = pgTable(
  "function_lexical_bundles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    functionId: uuid("function_id")
      .notNull()
      .references(() => functions.id, { onDelete: "cascade" }),
    lexicalBundleId: uuid("lexical_bundle_id")
      .notNull()
      .references(() => lexicalBundles.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("function_lexical_bundles_pair_uidx").on(
      table.functionId,
      table.lexicalBundleId,
    ),
  ],
);

export const conceptsRelations = relations(concepts, ({ many }) => ({
  dependencies: many(conceptDependencies, {
    relationName: "concept_dependencies_of",
  }),
  dependedOnBy: many(conceptDependencies, {
    relationName: "concept_dependencies_by",
  }),
  functionConcepts: many(functionConcepts),
}));

export const conceptDependenciesRelations = relations(
  conceptDependencies,
  ({ one }) => ({
    concept: one(concepts, {
      fields: [conceptDependencies.conceptId],
      references: [concepts.id],
      relationName: "concept_dependencies_of",
    }),
    dependsOn: one(concepts, {
      fields: [conceptDependencies.dependsOnConceptId],
      references: [concepts.id],
      relationName: "concept_dependencies_by",
    }),
  }),
);

export const functionsRelations = relations(functions, ({ many }) => ({
  functionConcepts: many(functionConcepts),
  scenarioFunctions: many(scenarioFunctions),
  functionLexicalBundles: many(functionLexicalBundles),
}));

export const scenariosRelations = relations(scenarios, ({ many }) => ({
  scenarioFunctions: many(scenarioFunctions),
}));

export const lexicalBundlesRelations = relations(lexicalBundles, ({ many }) => ({
  functionLexicalBundles: many(functionLexicalBundles),
}));

export const functionConceptsRelations = relations(
  functionConcepts,
  ({ one }) => ({
    function: one(functions, {
      fields: [functionConcepts.functionId],
      references: [functions.id],
    }),
    concept: one(concepts, {
      fields: [functionConcepts.conceptId],
      references: [concepts.id],
    }),
  }),
);

export const scenarioFunctionsRelations = relations(
  scenarioFunctions,
  ({ one }) => ({
    scenario: one(scenarios, {
      fields: [scenarioFunctions.scenarioId],
      references: [scenarios.id],
    }),
    function: one(functions, {
      fields: [scenarioFunctions.functionId],
      references: [functions.id],
    }),
  }),
);

export const functionLexicalBundlesRelations = relations(
  functionLexicalBundles,
  ({ one }) => ({
    function: one(functions, {
      fields: [functionLexicalBundles.functionId],
      references: [functions.id],
    }),
    lexicalBundle: one(lexicalBundles, {
      fields: [functionLexicalBundles.lexicalBundleId],
      references: [lexicalBundles.id],
    }),
  }),
);
