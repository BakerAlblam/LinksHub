"use client";
import Link from "next/link";
import { type JSX, type SVGProps } from "react";
import { Input } from "./ui/input";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
  const user = useUser();
  const isSignedIn = user.isSignedIn;

  return (
    <header className="flex items-center justify-between border-b px-4 py-2 md:px-8 lg:px-10 xl:px-12">
      <Link className="flex items-center" href="/">
        <FilmIcon className="h-6 w-6" color="purple" />
        <span className="ml-2 text-lg font-semibold text-purple-800">
          LinkHub
        </span>
      </Link>

      <div className="relative lg:hidden">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input className="pl-8 text-sm" placeholder="Search..." type="search" />
      </div>

      <nav className="hidden gap-6 lg:flex">
        <div className="relative hidden lg:block">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            className="pl-8 text-sm"
            placeholder="Search..."
            type="search"
          />
        </div>
      </nav>
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

function FilmIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
