"use client";

import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Teacher } from "@/types/teacher";

interface Props {
  teachers: Teacher[];
}

export default function DownloadCSVButton({ teachers }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Run only on client
    setIsClient(true);
  }, []);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Subject", key: "subject" },
    { label: "Experience", key: "experience" },
    { label: "Origin", key: "origin" },
  ];

  if (!isClient) return null; // Prevent server-side rendering of dynamic CSVLink

  return (
    <CSVLink
      data={teachers}
      headers={headers}
      filename="teachers.csv"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Download CSV
    </CSVLink>
  );
}


