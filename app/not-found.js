import Link from "next/link";
import { btnPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="px-6 py-32 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase">Page not found</h1>
      <p className="mb-8 mt-2 text-sm text-muted">That lift isn&apos;t in the library. Head back and pick another one.</p>
      <Link href="/" className={btnPrimary}>Back to workouts</Link>
    </div>
  );
}
