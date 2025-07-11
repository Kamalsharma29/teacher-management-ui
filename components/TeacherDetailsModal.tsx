import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Teacher } from "@/types/teacher";
import QualificationsTable from "@/components/QualificationsTable";
import WeeklyScheduleTable from "@/components/WeeklyScheduleTable";
import EditTeacherForm from "@/components/EditTeacherForm";

interface Props {
  teacher: Teacher | null;
  onClose: () => void;
  onUpdate?: (updatedTeacher: Teacher) => void;
}

export default function TeacherDetailsModal({ teacher, onClose, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(teacher);

  // ✅ Ensure modal updates when a new teacher is selected
  useEffect(() => {
    setCurrentTeacher(teacher);
  }, [teacher]);

  if (!currentTeacher) return null;

  const handleSave = (updated: Teacher) => {
    setCurrentTeacher(updated);
    setIsEditing(false);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        {/* Avatar and Name */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={currentTeacher.avatarUrl}
            alt={currentTeacher.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{currentTeacher.name}</h2>
            <p className="text-sm text-gray-600">{currentTeacher.subject}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tab.Group>
          <Tab.List className="flex space-x-2 border-b mb-4">
            {["Overview", "Schedule", "Qualifications"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-3 py-1 rounded-t-md text-sm font-medium ${
                    selected
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {/* Overview */}
            <Tab.Panel>
              {!isEditing ? (
                <>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> {currentTeacher.email}</p>
                    <p><strong>Phone:</strong> {currentTeacher.phone}</p>
                    <p><strong>From:</strong> {currentTeacher.from}</p>
                    <p><strong>Experience:</strong> {currentTeacher.experience} years</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <EditTeacherForm
                  teacher={currentTeacher}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              )}
            </Tab.Panel>

            {/* Schedule */}
            <Tab.Panel>
              <WeeklyScheduleTable schedule={currentTeacher.schedule} />
            </Tab.Panel>

            {/* Qualifications */}
            <Tab.Panel>
              <QualificationsTable qualifications={currentTeacher.qualifications} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}




