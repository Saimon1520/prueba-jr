"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import { PostProvider } from "@/context/PostContext";
import { CommentProvider } from "@/context/CommentContext";
import { LoginProvider } from "@/context/LoginContext";
import { NextUIProvider } from "@nextui-org/react";
import { AlbumProvider } from "@/context/AlbumContext";

// Carga de las fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextUIProvider>
          <LoginProvider>
            <PostProvider>
              <AlbumProvider>
                <CommentProvider>
                  <Navbar />
                  <main>{children}</main>
                </CommentProvider>
              </AlbumProvider>
            </PostProvider>
          </LoginProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

