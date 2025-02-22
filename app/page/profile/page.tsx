'use client'
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth, useUser } from "@clerk/nextjs"; // Import useAuth and useUser from Clerk

export default function CardWithForm() {
  const { signOut } = useAuth(); // Destructure signOut from useAuth
  const { user } = useUser(); // Destructure user from useUser

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-80px)]">
      <Card className="w-[400px] flex justify-center items-center flex-col">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h2>Name: {user?.fullName || "Jon doe"}</h2> {/* Display user name */}
            <h2>Email: {user?.emailAddresses[0]?.emailAddress || "N/A"}</h2> {/* Display user email */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="uppercase" onClick={() => signOut()}>Log Out</Button> {/* Handle logout */}
        </CardFooter>
      </Card>
    </div>
  );
}
