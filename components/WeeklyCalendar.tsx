import { Teacher } from "@/types/teacher";

interface Props {
  teachers: Teacher[];
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayColors: Record<string, string> = {
  Monday: "bg-red-100 text-red-800",
  Tuesday: "bg-orange-100 text-orange-800",
  Wednesday: "bg-yellow-100 text-yellow-800",
  Thursday: "bg-green-100 text-green-800",
  Friday: "bg-blue-100 text-blue-800",
  Saturday: "bg-purple-100 text-purple-800",
  default: "bg-gray-100 text-gray-800",
};

export default function WeeklyCalendar({ teachers }: Props) {
  return (
    <div className="overflow-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Weekly Calendar View</h2>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 text-sm font-medium text-center">
        {days.map((day) => (
          <div key={day} className="bg-gray-200 p-2 rounded">
            {day}
          </div>
        ))}
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-7 gap-2 mt-2 text-sm">
        {days.map((day) => (
          <div
            key={day}
            className="bg-blue-50 min-h-[100px] p-2 rounded overflow-auto text-left"
          >
            {teachers.map((teacher) => {
              const session = teacher.schedule?.[day];
              if (!session) return null;

              const colorClass = dayColors[day] || dayColors.default;

              return (
                <div
                  key={teacher.id + day}
                  className={`mb-2 p-2 rounded ${colorClass}`}
                >
                  <strong>{teacher.name}</strong>
                  <div className="text-xs">{session}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
