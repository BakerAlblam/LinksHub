"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "~/components/Loading";

const Page = () => {
  const router = useRouter();
  const user = useUser();
  const isSignedIn = user?.isSignedIn;
  const username = user?.user?.username;
  const cleanedUsername = username?.replace(/\s/g, "") ?? "";
  const encodedUsername = encodeURIComponent(cleanedUsername);
  const decodedUsername = decodeURIComponent(encodedUsername);
  const authId = user?.user?.id;
  const email = user?.user?.primaryEmailAddress?.emailAddress;
  const avatar = user?.user?.imageUrl;

  useEffect(() => {
    if (encodedUsername != null) {
      router.push(`/links/${decodedUsername}`);
    }
  }, [decodedUsername, encodedUsername, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSignedIn) {
          await axios.post("/api/users", {
            authId,
            username,
            email,
            avatar,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, [isSignedIn, authId, username, email, avatar]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#21014f] to-[#1a1b2e] text-white">
      <Loading />
    </div>
  );
};

export default Page;
