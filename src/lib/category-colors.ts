// Tailwind can't build classes from runtime values, so Category.color holds
// a palette key and each key maps to fixed class names.

export interface CategoryColorClasses {
  border: string;
  text: string;
  tint: string;
  bar: string;
}

export const CATEGORY_COLORS: Record<string, CategoryColorClasses> = {
  emerald: { border: "border-emerald-500/60", text: "text-emerald-400", tint: "bg-emerald-500/15", bar: "bg-emerald-500" },
  yellow: { border: "border-yellow-300/60", text: "text-yellow-300", tint: "bg-yellow-300/15", bar: "bg-yellow-300" },
  violet: { border: "border-violet-500/60", text: "text-violet-400", tint: "bg-violet-500/15", bar: "bg-violet-500" },
  blue: { border: "border-blue-500/60", text: "text-blue-400", tint: "bg-blue-500/15", bar: "bg-blue-500" },
  cyan: { border: "border-cyan-400/60", text: "text-cyan-300", tint: "bg-cyan-400/15", bar: "bg-cyan-400" },
  orange: { border: "border-orange-500/60", text: "text-orange-400", tint: "bg-orange-500/15", bar: "bg-orange-500" },
  red: { border: "border-red-500/60", text: "text-red-400", tint: "bg-red-500/15", bar: "bg-red-500" },
  slate: { border: "border-slate-400/60", text: "text-slate-300", tint: "bg-slate-400/15", bar: "bg-slate-400" },
  pink: { border: "border-pink-500/60", text: "text-pink-400", tint: "bg-pink-500/15", bar: "bg-pink-500" },
  lime: { border: "border-lime-400/60", text: "text-lime-300", tint: "bg-lime-400/15", bar: "bg-lime-400" },
  gray: { border: "border-gray-500/60", text: "text-gray-400", tint: "bg-gray-500/15", bar: "bg-gray-500" },
  amber: { border: "border-amber-500/60", text: "text-amber-400", tint: "bg-amber-500/15", bar: "bg-amber-500" },
  teal: { border: "border-teal-500/60", text: "text-teal-400", tint: "bg-teal-500/15", bar: "bg-teal-500" },
  purple: { border: "border-purple-500/60", text: "text-purple-400", tint: "bg-purple-500/15", bar: "bg-purple-500" },
  rose: { border: "border-rose-500/60", text: "text-rose-400", tint: "bg-rose-500/15", bar: "bg-rose-500" },
};

export function categoryColor(key: string): CategoryColorClasses {
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.gray;
}
