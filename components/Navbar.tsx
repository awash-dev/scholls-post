"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, User, ClipboardList, UserRound } from "lucide-react";

const NavigationMenu = () => {
  const [isStudentMenuOpen, setIsStudentMenuOpen] = React.useState(false);
  const [isTeacherMenuOpen, setIsTeacherMenuOpen] = React.useState(false);
  const studentMenuRef = React.useRef<HTMLDivElement>(null);
  const teacherMenuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        studentMenuRef.current &&
        !studentMenuRef.current.contains(event.target as Node)
      ) {
        setIsStudentMenuOpen(false);
      }
      if (
        teacherMenuRef.current &&
        !teacherMenuRef.current.contains(event.target as Node)
      ) {
        setIsTeacherMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center w-full h-20 bg-white shadow-sm">
      <div className="flex items-center gap-6">
        {/* Student Menu */}
        <div ref={studentMenuRef} className="relative">
          <button
            onClick={() => setIsStudentMenuOpen(!isStudentMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsStudentMenuOpen(!isStudentMenuOpen);
              }
            }}
            className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 hover:shadow-md rounded-md transition-all duration-200"
            aria-haspopup="true"
            aria-expanded={isStudentMenuOpen}
          >
            Student <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {isStudentMenuOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md p-2">
              <Link
                href="/page/attend/student"
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 rounded-md transition-all duration-200"
                onClick={() => setIsStudentMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Add a student
              </Link>
              <Link
                href="/page/create/students"
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 rounded-md transition-all duration-200"
                onClick={() => setIsStudentMenuOpen(false)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Attendance
              </Link>
            </div>
          )}
        </div>

        {/* Teacher Menu */}
        <div ref={teacherMenuRef} className="relative">
          <button
            onClick={() => setIsTeacherMenuOpen(!isTeacherMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsTeacherMenuOpen(!isTeacherMenuOpen);
              }
            }}
            className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 hover:shadow-md rounded-md transition-all duration-200"
            aria-haspopup="true"
            aria-expanded={isTeacherMenuOpen}
          >
            Teacher <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {isTeacherMenuOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md p-2">
              <Link
                href="/page/create/teacher"
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 rounded-md transition-all duration-200"
                onClick={() => setIsTeacherMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Add a teacher
              </Link>
              <Link
                href="/page/attend/teacher"
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 rounded-md transition-all duration-200"
                onClick={() => setIsTeacherMenuOpen(false)}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Attendance
              </Link>
            </div>
          )}
        </div>

        {/* Profile Link */}
        <Link
          href="/page/profile"
          className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 hover:shadow-md rounded-md transition-all duration-200"
        >
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default NavigationMenu;
