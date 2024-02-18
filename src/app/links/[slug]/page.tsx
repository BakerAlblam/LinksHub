import Link from "next/link";
import AddLinkForm from "~/components/AddLinkForm";
import { db } from "~/server/db";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, params.slug),
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const userId = user?.authId!;

  const userLinks = await db.query.links.findMany({
    where: (link, { eq }) => eq(link.userId, userId),
  });

  console.log(userLinks);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#21014f] to-[#1a1b2e] text-white">
      <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
        <AddLinkForm />

        <h1 className="items-end text-3xl font-extrabold tracking-tight sm:text-[3rem]">
          <span className="text-[hsl(280,100%,70%)]">@{user?.username}</span>
        </h1>
        <div className="flex w-full flex-col space-y-4  px-12">
          <Link
            className="block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white"
            href="#"
          >
            x profile
          </Link>
          <Link
            className="block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white"
            href="#"
          >
            x profile
          </Link>
        </div>
      </div>
    </main>
  );
}
