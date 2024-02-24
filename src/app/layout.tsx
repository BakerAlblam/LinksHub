import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LinkHub",
  description:
    "LinkHub is a dynamic and user-friendly web app designed to streamline your online presence and make sharing multiple links a breeze. Whether you're an influencer, entrepreneur, or just someone looking to organize and showcase your digital footprint, UniHub Connect empowers you to curate a centralized hub of links in a sleek and customizable interface.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${roboto.className} text-primary `}>
          {children}
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
