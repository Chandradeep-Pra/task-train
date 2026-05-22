import type { LucideIcon } from "lucide-react";

export type PrdValue = string | string[] | undefined;

export type PrdDocument = Record<string, PrdValue>;

export type PrdSection = {
  id: string;
  key: string;
  label: string;
  helper: string;
  icon: LucideIcon;
  list?: boolean;
};
