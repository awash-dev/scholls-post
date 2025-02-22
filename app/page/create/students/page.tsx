"use client";
import { useState } from "react";
import { db } from "@/Firebase"; // Adjust the path as necessary
import { collection, addDoc } from "firebase/firestore";

export default function Student() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "student-atendance"), {
        name,
        
      });
      alert("Teacher registered successfully!");
      // Clear form
      setName("");
     
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error registering teacher. Please try again!");
    }
  };
  return (
    <>
      <div className="flex min-h-screen justify-center flex-1 flex-col px-4 lg:px-8 bg-gray-100">
        <div className="text-center text-3xl font-bold text-gray-800 mb-4">
          Student Registration
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full justify-center sm:max-w-md p-6 bg-white shadow-lg rounded-lg">
          <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                   
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-lg font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                <select
                  id="subject"
                  name="subject"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a subject</option>
                  <option value="english">English</option>
                  <option value="maths">Maths</option>
                  <option value="phy">Physics</option>
                  <option value="bio">Biology</option>
                  <option value="che">Chemistry</option>
                  <option value="social">Social Studies</option>
                </select>
              </div>
            </div> */}

            <div className="  items-center justify-between">
              <button
                type="submit"
                className="flex w-full text-center justify-center aign-center  rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-200"
              >
                Register Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
