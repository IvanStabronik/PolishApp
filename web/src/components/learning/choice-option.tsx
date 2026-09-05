"use client";

import { cn } from "@/lib/cn";

type ChoiceOptionProps = {
  id: string;
  name: string;
  label: string;
  selected: boolean;
  disabled?: boolean;
  multi?: boolean;
  state?: "idle" | "correct" | "incorrect";
  onSelect: (id: string) => void;
};

export function ChoiceOption({
  id,
  name,
  label,
  selected,
  disabled,
  multi = false,
  state = "idle",
  onSelect,
}: ChoiceOptionProps) {
  return (
    <label
      data-testid="exercise-option"
      data-option-id={id}
      className={cn(
        "flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors rounded-[var(--radius-md)]",
        selected
          ? "border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest-soft)_55%,var(--color-paper-raised))]"
          : "border-[var(--color-line)] bg-[var(--color-paper-raised)] hover:border-[var(--color-line-strong)]",
        state === "correct" &&
          "border-[var(--color-success)] bg-[var(--color-success-bg)]",
        state === "incorrect" &&
          "border-[var(--color-error)] bg-[var(--color-error-bg)]",
        disabled && "cursor-default opacity-90",
      )}
    >
      <input
        type={multi ? "checkbox" : "radio"}
        className="mt-1 accent-[var(--color-forest)]"
        name={name}
        value={id}
        checked={selected}
        disabled={disabled}
        onChange={() => onSelect(id)}
      />
      <span className="text-[var(--color-ink)]">{label}</span>
    </label>
  );
}
