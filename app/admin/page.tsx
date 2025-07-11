"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTeacherContext } from "@/context/TeacherContext";
import { Teacher } from "@/types/teacher";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const { teachers, setTeachers } = useTeacherContext(); // ✅ use global state

  const [newTeacher, setNewTeacher] = useState<Teacher>({
    id: "",
    name: "",
    subject: "",
    email: "",
    avatarUrl: "",
    joinedOn: new Date().toISOString().split("T")[0],
    phone: "",
    from: "",
    experience: 0,
    schedule: {},
    qualifications: [],
  });

  const handleLogin = () => {
    if (form.username === "admin" && form.password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject) {
      alert("Name and Subject are required!");
      return;
    }

    const teacherWithId = { ...newTeacher, id: uuidv4() };
    setTeachers([...teachers, teacherWithId]);

    setNewTeacher({
      id: "",
      name: "",
      subject: "",
      email: "",
      avatarUrl: "",
      joinedOn: new Date().toISOString().split("T")[0],
      phone: "",
      from: "",
      experience: 0,
      schedule: {},
      qualifications: [],
    });
  };

  const handleRemoveTeacher = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {!isLoggedIn ? (
        <div className="bg-white p-6 rounded shadow max-w-sm">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow space-y-8">
          {/* Add Teacher Form */}
          <div>
            <h2 className="text-lg font-semibold mb-3">➕ Add New Teacher</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Subject"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Avatar URL"
                value={newTeacher.avatarUrl}
                onChange={(e) => setNewTeacher({ ...newTeacher, avatarUrl: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="From"
                value={newTeacher.from}
                onChange={(e) => setNewTeacher({ ...newTeacher, from: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Experience"
                value={newTeacher.experience}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, experience: parseInt(e.target.value) || 0 })
                }
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={newTeacher.joinedOn}
                readOnly
                className="border px-3 py-2 rounded bg-gray-100 text-gray-500"
              />
            </div>
            <button
              onClick={handleAddTeacher}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Teacher
            </button>
          </div>

          {/* List of Teachers */}
          <div>
            <h2 className="text-lg font-semibold mb-3">📋 Current Teachers</h2>
            {teachers.length === 0 ? (
              <p className="text-gray-500">No teachers found.</p>
            ) : (
              <ul className="space-y-3">
                {teachers.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{t.name} ({t.subject})</p>
                      <p className="text-sm text-gray-500">{t.email}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveTeacher(t.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

