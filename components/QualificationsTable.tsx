import { Qualification } from "@/types/qualification";

interface Props {
  qualifications: Qualification[];
}

export default function QualificationsTable({ qualifications }: Props) {
  if (!qualifications || qualifications.length === 0) {
    return <p className="text-gray-500 italic">No qualifications available.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
      <div className="overflow-x-auto rounded-md shadow-sm">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Rate (₹)</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map((q, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{q.name}</td>
                <td className="px-4 py-2 capitalize">{q.type}</td>
                <td className="px-4 py-2">₹{q.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
