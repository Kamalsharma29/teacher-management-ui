import { Teacher } from "@/types/teacher";
import { useState } from "react";

interface Props {
  teacher: Teacher;
  onSave: (updated: Teacher) => void;
  onCancel: () => void;
}

export default function EditTeacherForm({ teacher, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState(teacher);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-semibold text-lg mb-2">Edit Teacher</h3>

      {["name", "phone", "from", "subject", "experience"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium capitalize">{field}</label>
          <input
            type={field === "experience" ? "number" : "text"}
            name={field}
            value={formData[field as keyof Teacher] as string}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded text-sm"
          />
        </div>
      ))}

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
