"use client";

import { useParams } from "next/navigation";
import { teachers } from "@/app/data";
import { Teacher } from "@/types/teacher";
import { notFound } from "next/navigation";

export default function TeacherProfilePage() {
  const { id } = useParams();
  const teacher = teachers.find((t: Teacher) => t.id === id);

  if (!teacher) return notFound();

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Teachers / {teacher.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Details */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Role:</strong> Teacher</p>
            <p><strong>Joined On:</strong> {teacher.joinedOn}</p>
          </div>

          {/* Email */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Email</h2>
            <p>{teacher.email}</p>
          </div>

          {/* Phone */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Phone</h2>
            <p>{teacher.phone}</p>
          </div>

          {/* From */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">From</h2>
            <p>{teacher.from}</p>
          </div>

          {/* Experience */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Experience</h2>
            <p>{teacher.experience} years</p>
          </div>

          {/* Subject */}
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Subject</h2>
            <p>{teacher.subject}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
