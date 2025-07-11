"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1>

      <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
        {/* Theme Toggle */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Dark Mode</label>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Language</label>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {language === "en" ? "English" : "Hindi"}
          </button>
        </div>
      </div>
    </div>
  );
}
