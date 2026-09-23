"use client";
// this was the hardest part for me, spent a lot of time here.
// basically all the plan/saved stuff lives in one place so every page can use it
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Ctx = createContext(null);
export const usePlan = () => useContext(Ctx);
const KEY = "fitlog-state"; // for localStorage
const LABEL = { plan: "today's plan", saved: "saved list" };

export function PlanProvider({ children }) {
  const [s, setS] = useState({ plan: [], saved: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem(KEY)); if (d?.plan && d?.saved) setS(d); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }, [s, ready]);

    // used by both "add to plan" and "save for later" buttons on details page
  const addTo = (key, w) => {
    if (s[key].some((x) => x.id === w.id)) return toast.error(`${w.name} is already in your ${LABEL[key]}`);
    if (key === "plan" && s.plan.length >= 5) return toast.error("Today's plan is full — five lifts max");
    setS({ ...s, [key]: [...s[key], { ...w, done: false }] });
    toast.success(key === "plan" ? "Added to today's plan" : "Saved for later");
  };
  const remove = (key, id) => {
    setS({ ...s, [key]: s[key].filter((x) => x.id !== id) });
    toast(`Removed from ${LABEL[key]}`);
  };
  const markDone = (id) => {
    setS({ ...s, plan: s.plan.map((x) => (x.id === id ? { ...x, done: true } : x)) });
    toast.success("Nice work — marked as done");
  };

  return <Ctx.Provider value={{ ...s, ready, addTo, remove, markDone }}>{children}</Ctx.Provider>;
}
