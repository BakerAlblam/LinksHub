"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const user = useUser();
  const isSignedIn = user.isSignedIn;

  return (
    <header className="flex items-center justify-between border-b px-4 py-2 md:px-8 lg:px-10 xl:px-12">
      <p className="flex items-center">
        <span className="ml-2 text-lg font-semibold text-purple-800">
          LinkHub
        </span>
      </p>

      <nav className="hidden gap-6 lg:flex"></nav>
      <div className="text-lg font-semibold text-purple-800">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton redirectUrl={"/links"} />
        )}
      </div>
    </header>
  );
}
