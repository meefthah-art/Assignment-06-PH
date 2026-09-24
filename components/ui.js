import { Clock, Flame, Star } from "lucide-react";

export const btnPrimary = "inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold uppercase text-black transition hover:brightness-110";

export const Spinner = ({ text = "Loading workouts…" }) => (
  <div className="flex flex-col items-center gap-3 py-24 text-muted">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
    <p className="text-sm">{text}</p>
  </div>
);

export const Tag = ({ children, upper }) => (
  <span className={`rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-black ${upper ? "uppercase" : ""}`}>{children}</span>
);

export const Stats = ({ w, icon = "text-muted", text = "text-muted" }) => (
  <div className={`flex flex-wrap gap-4 text-xs ${text}`}>
    <span className="flex items-center gap-1.5"><Clock size={14} className={icon} />{w.duration} min</span>
    <span className="flex items-center gap-1.5"><Flame size={14} className={icon} />{w.caloriesBurned} kcal</span>
    <span className="flex items-center gap-1.5"><Star size={14} className={icon} />{w.rating}</span>
  </div>
);
