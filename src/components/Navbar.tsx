"use client";
import Link from "next/link";
import { useState, type JSX, type SVGProps } from "react";
import { Input } from "./ui/input";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function Navbar() {
  const user = useUser();
  const isSignedIn = user.isSignedIn;
  const username = user?.user?.username;
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    router.push(search);
  };

  return (
    <header className="flex items-center justify-between border-b px-4 py-2 md:px-8 lg:px-10 xl:px-12">
      <Link
        className="flex items-center"
        href={isSignedIn ? `/links/${username}` : `/`}
      >
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
            onClick={() => router.push(`/${search}`)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-sm text-black"
            placeholder="Search"
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
