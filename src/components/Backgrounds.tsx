/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import axios from "axios";

import { toast } from "./ui/use-toast";

import { Settings } from "lucide-react";
import router from "next/router";
import { useRouter } from "next/navigation";

const bgs = [
  {
    id: "1",
    name: "QuantumGradient",
    src: "/assets/QuantumGradient.png",
  },
  {
    id: "2",
    name: "EndlessConstellation",
    src: "/assets/EndlessConstellation.png",
  },
  {
    id: "3",
    name: "HollowedBoxes",
    src: "/assets/HollowedBoxes.png",
  },
  {
    id: "4",
    name: "DragonScales",
    src: "/assets/DragonScales.png",
  },
  {
    id: "5",
    name: "WaveyFingerprint",
    src: "/assets/WaveyFingerprint.png",
  },

  {
    id: "6",
    name: "GeometricIntersection",
    src: "/assets/GeometricIntersection.png",
  },
  {
    id: "7",
    name: "BullseyeGradient",
    src: "/assets/BullseyeGradient.png",
  },
  {
    id: "8",
    name: "ColorfulStingrays",
    src: "/assets/ColorfulStingrays.png",
  },
];

const Backgrounds = ({ authId }: { authId: string }) => {
  const [selectImage, setSelectImage] = useState("");
  const router = useRouter();

  const handleImageClick = async (name: string) => {
    try {
      await axios.put(`/api/users`, {
        background: name, // Change this line
        authId,
      });
      router.refresh();
      setSelectImage(name);
    } catch (error) {
      console.error("Error updating background:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className="cursor-pointer text-purple-800" />
      </DialogTrigger>

      <DialogContent
        className="mx-2 text-black"
        style={{ height: "400px", maxWidth: "1000px" }}
      >
        <DialogHeader>
          <DialogTitle>Choose your background</DialogTitle>
        </DialogHeader>

        <form className="mx-auto max-w-screen-lg">
          <div className="flex w-full items-center space-x-2">
            <div className="flex-col-1 flex h-full w-full gap-1">
              {bgs.map((bg) => (
                <div key={bg.id}>
                  <img
                    src={bg?.src}
                    className="w-full cursor-pointer"
                    style={{
                      height: "300px",
                      width: "500px",
                      aspectRatio: "4/2",
                    }} // Maintain a specific aspect ratio
                    onClick={() => handleImageClick(bg.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Backgrounds;
