import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { db } from "~/server/db";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, params.slug),
  });

  const sesh = await currentUser();

  if (!user)
    return (
      <div className="">
        <main className="grid min-h-screen place-items-center bg-gradient-to-b from-[#1b013f] to-[#1a1b2e] px-6 py-24 text-white sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold ">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 ">
              Sorry, we couldn`t find the page you`re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={sesh ? `/links/${sesh?.id}` : "/"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const userId = user?.authId!;

  const userLinks = await db.query.links.findMany({
    where: (link, { eq }) => eq(link.userId, userId),
  });

  return (
    <main className="min-h-screen flex-col items-center bg-gradient-to-b from-[#1b013f] to-[#1a1b2e] text-white">
      <div className="flex flex-col items-center gap-12 py-12">
        <Avatar className="mt-4 h-28 w-28">
          <AvatarImage src={`${user?.avatar}`} className="object-cover" />
          <AvatarFallback className="bg-black">
            {" "}
            {user?.username}{" "}
          </AvatarFallback>
        </Avatar>
        <h1 className="items-end text-3xl font-extrabold tracking-tight sm:text-[3rem]">
          <span className="text-[hsl(280,100%,70%)]">@{user?.username}</span>
        </h1>

        <div className="flex w-full flex-col space-y-6 px-4  lg:w-2/3">
          {userLinks.map((link) => (
            <Link
              key={link?.id}
              className="block w-full truncate rounded-full bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
              href={`${link?.content}`}
              target="blank"
            >
              {link?.link}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 block w-40 -translate-x-1/2 transform space-x-4 truncate rounded-full bg-white/50 py-4 text-center text-xs font-medium text-white hover:bg-white/20">
          <Link className="underline" href={sesh ? `/links/${sesh?.id}` : "/"}>
            Create your Linktree
          </Link>
        </div>
      </div>
    </main>
  );
}
