"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronDown, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Spinner, Stats, btnPrimary } from "@/components/ui";

const sorters = {
  Duration: (a, b) => a.duration - b.duration,
  Calories: (a, b) => a.caloriesBurned - b.caloriesBurned,
  Rating: (a, b) => b.rating - a.rating,
};
const box = "rounded-2xl border border-[#232732]";

// metrics only count today's plan, not saved items (matches the design)
export default function MyPlan() {
  const { plan, saved, ready, remove, markDone } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sort, setSort] = useState("Duration");
  const list = [...(tab === "plan" ? plan : saved)].sort(sorters[sort]);
  const totals = {
    Exercises: plan.length,
    Minutes: plan.reduce((s, w) => s + w.duration, 0),
    Calories: plan.reduce((s, w) => s + w.caloriesBurned, 0),
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <header>
        <h1 className="font-display text-3xl font-bold uppercase">My Plan</h1>
        <p className="mt-2 text-sm text-[#8a92a0]">Cap of five lifts for today. Finish them, then load more.</p>
      </header>

      <div className={`${box} grid grid-cols-3 bg-[#13161d] p-4 sm:p-6`}>
        {Object.entries(totals).map(([k, v], i) => (
          <div key={k} className={`px-3 sm:px-8 ${i ? "border-l border-[#232732]" : ""}`}>
            <p className="text-xs text-[#8a92a0]">{k}</p>
            <p className={`font-display text-3xl font-bold sm:text-4xl ${i === 0 ? "text-accent" : ""}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-[#232732] bg-[#151921] p-1">
          {[["plan", "Today's Plan"], ["saved", "Saved"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-lg px-4 py-1.5 text-xs ${tab === k ? "border border-[#2b303d] bg-[#1f242d] font-bold text-white" : "text-[#8a92a0]"}`}>{l}</button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-xs text-[#8a92a0]">
          Sort By
          <span className="relative">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none rounded-lg border border-[#232732] bg-[#13161d] py-2 pl-3 pr-9 text-white outline-none">
              {Object.keys(sorters).map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </span>
        </label>
      </div>

      {!ready ? <Spinner text="Loading workouts…" />
        : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-[#111317]/50 px-4 py-20 text-center">
            <h2 className="font-display text-xl font-bold">NOTHING HERE YET</h2>
            <p className="mb-6 mt-2 text-xs text-zinc-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className={btnPrimary}>Go to workouts</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((w) => (
              <article key={w.id} className={`${box} flex flex-col gap-4 bg-[#14171e] p-4 sm:flex-row sm:items-center`}>
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-[#1f2937] sm:h-20 sm:w-36">
                  <Image src={w.image} alt={w.name} fill sizes="144px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h2 className={`font-display text-base font-bold uppercase ${w.done && tab === "plan" ? "text-muted line-through" : ""}`}>{w.name}</h2>
                  <p className="text-xs font-semibold text-[#8a92a0]">{w.equipment}</p>
                  <div className="pt-1.5"><Stats w={w} icon="text-accent" text="text-gray-300" /></div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/workout/${w.id}`} className="rounded-full border border-[#374151] px-4 py-2 text-xs transition hover:bg-white/5">View Details</Link>
                  {tab === "plan" && (
                    <button disabled={w.done} onClick={() => markDone(w.id)} className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black disabled:opacity-40">
                      <Check size={14} />{w.done ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button aria-label={`Remove ${w.name}`} onClick={() => remove(tab, w.id)} className="p-1.5 text-muted transition hover:text-white"><X size={16} /></button>
                </div>
              </article>
            ))}
          </div>
        )}
    </div>
  );
}
