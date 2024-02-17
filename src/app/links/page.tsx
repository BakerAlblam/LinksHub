"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (encodedUsername != null) {
      router.push(`/links/${decodedUsername}`);
      setIsLoading(false);
    }
  }, [decodedUsername, encodedUsername, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSignedIn) {
          const res = await axios.post("/api/users", {
            authId,
            username,
            email,
          });
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, [isSignedIn, authId, username, email]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <h1 className="text-black">{decodedUsername}</h1>
      )}
    </div>
  );
};

export default Page;
