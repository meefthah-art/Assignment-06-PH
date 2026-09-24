"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

// badge numbers come from context, both link to /my-plan
export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const navLink = (href, label, active) => (
    <Link href={href} className={`rounded-full px-4 py-1.5 text-xs ${active ? "bg-[#1a2312] font-semibold text-accent" : "font-medium text-muted hover:text-white"}`}>{label}</Link>
  );
  const badge = (label, n, cls) => (
    <Link href="/my-plan" aria-label={`${label}: ${n}`} className="flex items-center gap-2 text-xs font-medium text-gray-300">
      <span className="hidden sm:inline">{label}</span>
      <b className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${cls}`}>{n}</b>
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <Dumbbell size={28} className="text-accent" /><span className="hidden sm:inline">FITLOG</span>
        </Link>
        <nav className="flex items-center">
          {navLink("/", "Workouts", path === "/" || path.startsWith("/workout"))}
          {navLink("/my-plan", "My Plan", path === "/my-plan")}
        </nav>
        <div className="flex items-center gap-4">
          {badge("Plan", plan.length, "bg-accent text-black")}
          {badge("Saved", saved.length, "border border-[#2d313b] text-gray-300")}
        </div>
      </div>
    </header>
  );
}
