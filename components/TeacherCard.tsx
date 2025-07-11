import { Teacher } from "@/types/teacher";
import Link from "next/link";

interface Props {
  teacher: Teacher;
  onDelete?: (id: string) => void;
  onView: (teacher: Teacher) => void;
  mode?: "dashboard" | "admin"; // 👈 Optional prop
}

export default function TeacherCard({
  teacher,
  onDelete,
  onView,
  mode = "dashboard",
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={teacher.avatarUrl || "/default-avatar.png"} // ✅ fallback
          alt={teacher.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {teacher.name}
          </h2>
          <p className="text-sm text-gray-500">{teacher.subject}</p>
          <p className="text-xs text-gray-400">Joined: {teacher.joinedOn}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-between">
        <button
          onClick={() => onView(teacher)}
          className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
        >
          View Details
        </button>

        <Link href={`/teachers/${teacher.id}`}>
          <button className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded hover:bg-green-200">
            View Profile
          </button>
        </Link>

        {/* Show Remove only in Admin mode */}
        {mode === "admin" && onDelete && (
          <button
            onClick={() => onDelete(teacher.id)}
            className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded hover:bg-red-200"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}




