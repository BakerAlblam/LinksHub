import Link from "next/link";
import AddLinkForm from "~/components/AddLinkForm";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function Page({ params }: { params: { slug: string } }) {
  const sesh = await currentUser();
  const username = sesh?.username;

  const imgUrl = sesh?.imageUrl;

  if (username !== params.slug) {
    redirect("/");
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, params.slug),
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const userId = user?.authId!;
  const authId = user?.authId;
  console.log(authId);

  const userLinks = await db.query.links.findMany({
    where: (link, { eq }) => eq(link.userId, userId),
  });

  const sendData = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/users`, {
        username,
        authId,
        avatar: imgUrl,
      });
      console.log(res);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };
  void sendData();

  return (
    <main className=" min-h-screen flex-col items-center bg-gradient-to-b from-[#21014f] to-[#1a1b2e] text-white">
      <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
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
        <div className="flex w-full flex-col space-y-6 px-12">
          {userLinks && userLinks.length !== 0 ? (
            userLinks.map((link) => (
              <Link
                key={link?.id}
                className="block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
                href={`${link?.content}`}
                target="_blank"
              >
                {link?.link}
              </Link>
            ))
          ) : (
            <p>no Data</p>
          )}
        </div>
      </div>
    </main>
  );
}
