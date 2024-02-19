import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#21014f] to-[#1a1b2e] text-white">
      <div className="container flex  h-fit flex-col items-center gap-12 px-4 py-20 md:py-12 lg:py-14 xl:py-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Links<span className="text-[hsl(280,100%,70%)]">Hub</span>
        </h1>
        <div className="mb-8 space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The complete platform for your links
          </h1>
          <p className="mx-auto max-w-[600px] text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Share all of your social media profiles and important links with a
            beautiful and customizable page.
          </p>
          <div className="block w-full rounded-lg bg-white/40 py-4 text-center text-lg font-medium text-white hover:bg-white/20">
            <SignUpButton afterSignInUrl="/links" afterSignUpUrl="/links" />
          </div>
        </div>

        <hr className="my-4 h-1 w-full bg-white" />
        <Avatar className=" h-20 w-20">
          <AvatarImage src={``} className="object-cover" />
          <AvatarFallback className="bg-black">{""}</AvatarFallback>
        </Avatar>
        <h1 className="items-end text-3xl font-extrabold tracking-tight sm:text-[3rem]">
          <span className="text-[hsl(280,100%,70%)]">@Johndoe</span>
        </h1>

        <div className="flex w-full max-w-[850px] flex-col space-y-6 px-12">
          <Link
            className="glassmorphism block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
            href={`https://twitter.com/`}
            target="blank"
          >
            Twitter
          </Link>
          <Link
            className="glassmorphism block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
            href="https://snapchat.com"
            target="_blank"
          >
            Snapchat
          </Link>

          <Link
            className="glassmorphism block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
            href={`https://www.youtube.com/`}
            target="blank"
          >
            YouTube
          </Link>
        </div>
      </div>
    </main>
  );
}
