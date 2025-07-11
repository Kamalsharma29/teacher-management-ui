"use client";

import { useState } from "react";
import { Teacher } from "@/types/teacher";

interface Props {
  onAddTeacher: (teacher: Teacher) => void;
}

export default function TeacherForm({ onAddTeacher }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    joinedOn: "",
    phone: "",
    from: "",
    experience: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    subject: "",
    email: "",
    joinedOn: "",
    phone: "",
    from: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", subject: "", email: "", joinedOn: "", phone: "", from: "" };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }
    if (!form.email.includes("@")) {
      newErrors.email = "Invalid email";
      valid = false;
    }
    if (!form.joinedOn) {
      newErrors.joinedOn = "Joining date is required";
      valid = false;
    }
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }
    if (!form.from) {
      newErrors.from = "Location is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        ...form,
        avatarUrl: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
        schedule: {
          Monday: "",
          Tuesday: "",
          Wednesday: "",
          Thursday: "",
          Friday: "",
          Saturday: "",
        },
        qualifications: [],
      };

      onAddTeacher(newTeacher);
      setLoading(false);
      setSuccessMsg("Teacher added successfully!");
      toggleModal();

      setForm({
        name: "",
        subject: "",
        email: "",
        joinedOn: "",
        phone: "",
        from: "",
        experience: 0,
      });
      setErrors({ name: "", subject: "", email: "", joinedOn: "", phone: "", from: "" });

      setTimeout(() => setSuccessMsg(""), 3000);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "experience" ? parseInt(value) : value });
  };

  return (
    <>
      {successMsg && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
          {successMsg}
        </div>
      )}

      <button
        onClick={toggleModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Teacher
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {["name", "subject", "email", "joinedOn", "phone", "from"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize mb-1">
                    {field === "joinedOn" ? "Joining Date" : field}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "joinedOn" ? "date" : "text"}
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[field as keyof typeof errors] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[field as keyof typeof errors]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1">Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  min={0}
                  max={50}
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}



