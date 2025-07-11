"use client";

import WeeklyCalendar from "@/components/WeeklyCalendar";
import { teachers } from "../data"; // Adjust path if needed

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 Weekly Calendar View</h1>
      <WeeklyCalendar teachers={teachers} />
    </main>
  );
}
