import Link from "next/link";
import Image from "next/image";
import { Tag, Stats } from "./ui";

export default function WorkoutCard({ w }) {
  return (
    <Link href={`/workout/${w.id}`} className="group block overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-1 hover:border-accent/60">
      <div className="relative h-48 overflow-hidden">
        <Image src={w.image} alt={w.name} fill sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">{w.muscleGroups.map((m) => <Tag key={m} upper>{m}</Tag>)}</div>
        <h3 className="mt-3 font-display text-lg font-bold uppercase">{w.name}</h3>
        <p className="text-xs text-muted">{w.equipment}</p>
        <div className="mt-4 border-t border-[#20242e] pt-3"><Stats w={w} /></div>
      </div>
    </Link>
  );
}
