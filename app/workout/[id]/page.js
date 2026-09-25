"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Plus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Spinner, Tag } from "@/components/ui";

// id comes from the url here (dynamic route)
export default function Details() {
  const { id } = useParams();
  const { plan, addTo } = usePlan();
  const [w, setW] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/fitlog/${id}`)
      .then((r) => r.json())
      .then((d) => {
        // api gave me an array sometimes and an object other times for this endpoint, not sure why
        const x = Array.isArray(d) ? d[0] : d;
        if (x?.id) setW(x); else setMissing(true);
      })
      .catch(() => setMissing(true));
  }, [id]);

  if (missing) notFound();
  if (!w) return <Spinner text="Loading workout…" />;

  const specs = [["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps], ["Duration", `${w.duration} min`], ["Calories", `${w.caloriesBurned} kcal`], ["Rating", w.rating]];
  const full = plan.length >= 5;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] lg:min-h-[640px]">
        <Image src={w.image} alt={w.name} fill priority sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
      </div>
      <div>
        <h1 className="font-display text-4xl font-bold uppercase">{w.name}</h1>
        <p className="mt-3 text-base text-muted">{w.description}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">{w.muscleGroups.map((m) => <Tag key={m}>{m}</Tag>)}</div>

        <dl className="mt-7 divide-y divide-[#1e2330] overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
          {specs.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-6 py-3.5">
              <dt className="text-xs font-bold uppercase text-muted">{k}</dt>
              <dd className="text-sm font-medium text-gray-200">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mb-4 mt-8 text-base font-extrabold">INSTRUCTIONS</h2>
        <ol className="space-y-3 text-sm text-gray-300">
          {w.instructions.map((s, i) => <li key={i} className="flex gap-2"><span className="text-muted">{i + 1}.</span>{s}</li>)}
        </ol>

        <div className="mt-8 flex flex-wrap gap-4">
          <button onClick={() => addTo("plan", w)} disabled={full} className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-[#0f1115] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">
            <Plus size={16} />{full ? "Plan is full (5/5)" : "Add to today's plan"}
          </button>
          <button onClick={() => addTo("saved", w)} className="flex items-center gap-2 rounded-xl border border-[#374151] px-6 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/5">
            <Bookmark size={16} />Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
