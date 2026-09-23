import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = { title: "FitLog — Workout Library", description: "Pick a lift, lock it into today's plan, and log every set." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" toastOptions={{ style: { background: "#15171d", color: "#fff", border: "1px solid #222630" } }} />
        </PlanProvider>
      </body>
    </html>
  );
}
