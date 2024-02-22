"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import axios from "axios";
import { type FieldValues, useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

type FormData = {
  userId: number;
  content: string;
  link: string;
  username: string;
  authId: string;
};

const AddLinkForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const user = useUser();
  const data = user;
  const userId = data?.user?.id;
  const username = data?.user?.username;
  const imgUrl = data?.user?.imageUrl;

  useEffect(() => {
    const sendData = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/api/users`, {
          username,
          authId: userId,
          avatar: imgUrl,
        });
        console.log(res, username, userId, imgUrl);
      } catch (error) {
        // Handle errors here
        console.error("Error:", error);
      }
    };
    void sendData();
  }, [imgUrl, userId, username]);

  const onSubmit = async (data: FieldValues) => {
    try {
      isSubmitting;
      const res = await axios.post("/api/postlinks", {
        userId,
        username,
        content: data?.content as string,
        link: data?.link as string,
      });
      if (res.status === 201) {
        toast({
          title: "Link added",
        });
        reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Add Link</Button>
        </DialogTrigger>
        <DialogContent className="text-black sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2 space-y-2">
                  <Label className=" text-black">Link title</Label>
                  <Input
                    {...register("link", {
                      required: "Title is required",
                    })}
                    type="text"
                  />
                  {errors.link && (
                    <p className="text-red-500"> {`${errors.link.message}`} </p>
                  )}
                  <Label className="">URL</Label>
                  <Input
                    {...register("content", {
                      required: "URL is required",
                    })}
                    type="text"
                  />
                  {errors.content && (
                    <p className="text-red-500">
                      {" "}
                      {`${errors.content.message}`}{" "}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting}
                  className="mt-3"
                >
                  Add
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddLinkForm;
