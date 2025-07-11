"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { teachers as initialTeachers } from "@/app/data";
import { Teacher } from "@/types/teacher";

type TeacherContextType = {
  teachers: Teacher[];
  setTeachers: (teachers: Teacher[]) => void;
};

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

  return (
    <TeacherContext.Provider value={{ teachers, setTeachers }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacherContext() {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacherContext must be used within a TeacherProvider");
  }
  return context;
}

