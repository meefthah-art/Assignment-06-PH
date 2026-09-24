import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1d24] bg-[#090a0d] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-sm font-bold"><Dumbbell size={20} className="text-accent" />FITLOG</div>
        <p className="text-center text-xs text-[#6b7280]">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
