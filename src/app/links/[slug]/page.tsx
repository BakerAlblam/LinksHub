import Link from "next/link";
import AddLinkForm from "~/components/AddLinkForm";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navbar } from "~/components/Navbar";

export default async function Page({ params }: { params: { slug: string } }) {
  const sesh = await currentUser();
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.authId, params.slug),
  });

  if (sesh?.id !== params.slug) {
    redirect(`/links/${sesh?.id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const userId = user?.authId!;

  const userLinks = await db.query.links.findMany({
    where: (link, { eq }) => eq(link.userId, userId),
  });

  return (
    <div className="">
      <Navbar />
      <main className="min-h-screen flex-col items-center bg-gradient-to-b from-[#1b013f] to-[#1a1b2e] text-white">
        <div className=" flex flex-col items-center gap-8 py-12">
          <Link
            href={`/${user?.username}`}
            className="block truncate rounded-full bg-white/10 px-4 py-1 text-center text-sm  text-white hover:bg-white/20"
          >
            Your live URL:{" "}
            <span className="text-large ml-1 text-[hsl(280,100%,70%)]">{`${user?.username}`}</span>
          </Link>
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
          <AddLinkForm />
          <div className="flex w-full flex-col space-y-6 px-4  lg:w-2/3">
            {userLinks && userLinks.length !== 0 ? (
              userLinks.map((link) => (
                <Link
                  key={link?.id}
                  className="block w-full truncate  rounded-full bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
                  href={`${link?.content}`}
                  target="blank"
                >
                  {link?.link}
                </Link>
              ))
            ) : (
              <p className="block w-full truncate  rounded-full bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20">
                No links added
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
