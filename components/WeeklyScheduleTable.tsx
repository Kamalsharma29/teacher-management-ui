interface Props {
  schedule: {
    [day: string]: string;
  };
}

export default function WeeklyScheduleTable({ schedule }: Props) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Weekly Schedule</h3>
      <div className="overflow-x-auto rounded shadow-sm">
        <table className="w-full table-auto text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Session</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day} className="border-t">
                <td className="px-4 py-2 font-medium">{day}</td>
                <td className="px-4 py-2 text-gray-700">
                  {schedule[day] || <span className="italic text-gray-400">No class</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
