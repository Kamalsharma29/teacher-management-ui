import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TeacherProvider } from "@/context/TeacherContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "Teacher Management UI",
  description: "Modern teacher management interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        <Toaster position="top-right" reverseOrder={false} />
        <ThemeProvider>
          <LanguageProvider>
            <TeacherProvider>
              {children}
            </TeacherProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}



