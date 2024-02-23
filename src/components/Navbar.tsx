"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Backgrounds from "./Backgrounds";

export function Navbar() {
  const user = useUser();
  const isSignedIn = user.isSignedIn;
  const authId = user?.user?.id;

  return (
    <header className="flex items-center justify-center gap-10 border-b px-4 py-2 text-center md:px-8 lg:px-10 xl:px-12">
      <Backgrounds authId={authId!} />
      <p className="flex items-center">
        <span className="ml-2 text-lg font-semibold text-purple-800">
          LinkHub
        </span>
      </p>
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
