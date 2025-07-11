"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TeacherCard from "@/components/TeacherCard";
import TeacherDetailsModal from "@/components/TeacherDetailsModal";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import DownloadCSVButton from "@/components/DownloadCSVButton";
import { Teacher } from "@/types/teacher";
import { useTeacherContext } from "@/context/TeacherContext";

export default function HomePage() {
  const { teachers, setTeachers } = useTeacherContext();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleDeleteTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Teacher Management</h1>

          <div className="flex gap-3">
            <DownloadCSVButton teachers={teachers} />
          </div>
        </div>

        {/* Modals */}
        <TeacherDetailsModal teacher={selectedTeacher} onClose={handleCloseModal} />

        {/* List of cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-10">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onDelete={handleDeleteTeacher}
              onView={handleViewTeacher}
            />
          ))}
        </div>

        {/* 📅 Weekly Calendar View */}
        <WeeklyCalendar teachers={teachers} />
      </main>
    </>
  );
}
