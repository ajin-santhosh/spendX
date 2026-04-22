"use client";
import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";

function LoginPage() {

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
            <div className="w-full max-w-xs">
              <Card>
                <form className="flex flex-col gap-6 p-2">
                  <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h1 className="text-2xl font-bold">
                        Login to your account
                      </h1>
                      <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                      </p>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </Field>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </Field>
                    <Field>
                      <Button type="submit">Login</Button>
                    </Field>
                    <FieldSeparator>
                      {" "}
                      Don&apos;t have an account?{" "}
                      <a href="#" className="underline underline-offset-4">
                        Sign up
                      </a>
                    </FieldSeparator>
                  </FieldGroup>
                </form>
              </Card>
            </div>
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

export default LoginPage;
