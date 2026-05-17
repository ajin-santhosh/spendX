"use client";
import React from "react";
import { Outlet } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";

function AuthLayout() {
  return (
    <>
      <div className="flex w-full items-center p-5">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          spendX.com
        </a>

        <ThemeToggle />
      </div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <Outlet />
          </div>
        </div>
        <div className=" relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/djqxrh1gk/image/upload/v1776871980/Spend_X_1_-Photoroom_wrhzma.png"
            className="absolute inset-0 h-full w-full object-cover dark:hidden"
          />
          <img
            src="https://res.cloudinary.com/djqxrh1gk/image/upload/v1776871258/Dark_Spend_X-Photoroom_richbe.png"
            className="absolute inset-0 h-full w-full object-cover hidden dark:block"
          />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
