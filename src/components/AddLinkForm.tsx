"use client";
import React from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type FormData = {
  userId: number;
  content: string;
  link: string;
  username: string;
};

const AddLinkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const user = useUser();
  const data = user;
  console.log(data);
  const userId = data?.user?.id;
  const username = data?.user?.username;
  const userImg = data?.user?.imageUrl;

  const onSubmit = async (data: FieldValues) => {
    try {
      isSubmitting;
      const res = await axios.post("/api/postlinks", {
        userId,
        username,
        content: data?.content as string,
        link: data?.link as string,
      });
      console.log(res);
      if (res.status === 201) {
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Add Link <Plus className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent className="text-black sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
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
                <Button type="submit" variant="outline" disabled={isSubmitting}>
                  Add
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Avatar className="mt-4 h-full w-full">
        <AvatarImage src={`${userImg}`} className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AddLinkForm;
