"use client"; // Ensure this component is treated as a client component

import "./globals.css";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html>
        <body>
          <SignedOut>
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="text-center">
                <SignIn routing="hash" afterSignInUrl="/pages/" />
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <Navbar />
            <main >{children}</main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
