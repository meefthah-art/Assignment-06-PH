"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { Spinner, btnPrimary } from "@/components/ui";

// used client component here so i could show a loading spinner while fetching
export default function Home() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/fitlog")
      .then((r) => r.json())
      .then((data) => {
        // console.log(data) // was checking the shape of the api response here
        if (Array.isArray(data)) setItems(data);
        else setError(true);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <section className="grid items-center gap-8 rounded-2xl border border-line bg-card p-8 md:grid-cols-2 md:p-14">
        <div className="space-y-5">
          <p className="text-[11px] font-bold tracking-widest text-accent">WORKOUT LIBRARY</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-6xl">Train with intent. Log every set.</h1>
          <p className="max-w-md text-base text-muted">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className={`${btnPrimary} px-6 py-3`}>Browse workouts <ArrowDown size={16} /></a>
        </div>
        <Image src="/hero.png" alt="Muscle anatomy figure using a preacher curl machine" width={400} height={400} priority className="mx-auto w-full max-w-sm" />
      </section>

      <section id="library" className="scroll-mt-24 pt-12">
        <h2 className="font-display text-3xl font-bold uppercase">The Library</h2>
        <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        {error ? <p className="py-20 text-center text-muted">Could not load workouts. Please refresh and try again.</p>
          : !items ? <Spinner />
          : <div className="mt-6 grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">{items.map((w) => <WorkoutCard key={w.id} w={w} />)}</div>}
      </section>
    </div>
  );
}
