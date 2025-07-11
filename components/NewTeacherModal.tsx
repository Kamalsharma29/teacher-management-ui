"use client";

import { useState } from "react";
import { Teacher, Qualification } from "@/types/teacher";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onClose: () => void;
  onAdd: (teacher: Teacher) => void;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function NewTeacherModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    from: "",
    experience: 0,
    avatarUrl: "https://randomuser.me/api/portraits/lego/5.jpg",
    schedule: {} as Record<string, string>,
    qualifications: [] as Qualification[],
  });

  const [newQualification, setNewQualification] = useState<Qualification>({
    name: "",
    rate: 0,
    type: "private",
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduleChange = (day: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: value,
      },
    }));
  };

  const addQualification = () => {
    setForm((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newQualification],
    }));
    setNewQualification({ name: "", rate: 0, type: "private" });
  };

  const handleSubmit = () => {
    const newTeacher: Teacher = {
      id: uuidv4(),
      joinedOn: new Date().toISOString().split("T")[0],
      ...form,
    };
    onAdd(newTeacher);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">Add New Teacher</h2>

        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          <input className="input" placeholder="Subject" value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} />
          <input className="input" placeholder="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          <input className="input" placeholder="From" value={form.from} onChange={(e) => handleChange("from", e.target.value)} />
          <input type="number" className="input" placeholder="Experience" value={form.experience} onChange={(e) => handleChange("experience", parseInt(e.target.value))} />
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Weekly Schedule</h3>
          {days.map((day) => (
            <div key={day} className="flex mb-1 gap-2 items-center">
              <label className="w-24">{day}:</label>
              <input
                className="flex-1 input"
                placeholder="e.g. Algebra 10am"
                value={form.schedule[day] || ""}
                onChange={(e) => handleScheduleChange(day, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Qualifications</h3>
          <div className="flex gap-2 mb-2">
            <input className="input" placeholder="Name" value={newQualification.name} onChange={(e) => setNewQualification({ ...newQualification, name: e.target.value })} />
            <input type="number" className="input" placeholder="Rate" value={newQualification.rate} onChange={(e) => setNewQualification({ ...newQualification, rate: Number(e.target.value) })} />
            <select className="input" value={newQualification.type} onChange={(e) => setNewQualification({ ...newQualification, type: e.target.value as "private" | "group" })}>
              <option value="private">Private</option>
              <option value="group">Group</option>
            </select>
            <button onClick={addQualification} className="px-2 bg-blue-500 text-white rounded">Add</button>
          </div>
          <ul className="list-disc ml-5 text-sm">
            {form.qualifications.map((q, idx) => (
              <li key={idx}>{q.name} - ₹{q.rate} ({q.type})</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Teacher</button>
        </div>
      </div>
    </div>
  );
}
