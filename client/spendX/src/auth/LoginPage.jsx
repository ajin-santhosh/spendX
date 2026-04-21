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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Settings } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
const triggerIcon = {
  light: <Sun className="h-4 w-4" />,
  dark: <Moon className="h-4 w-4" />,
  system: <Settings className="h-4 w-4" />,
};

function LoginPage() {
  const { theme, setTheme } = useThemeStore();
  
  return (
    <>
      <div className="flex w-full items-center p-5">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          spendX.com
        </a>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {triggerIcon[theme]}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-10" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                  <DropdownMenuShortcut>
                    <Moon className="h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                  <DropdownMenuShortcut>
                    <Sun className="h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                  <DropdownMenuShortcut>
                    <Settings className="h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
        <div className="bg-muted relative hidden lg:block">
         <img
    src="/Spend X (1).png"
    className="absolute inset-0 h-full w-full object-cover dark:hidden"
  />
  <img
    src="/Dark Spend X.png"
    className="absolute inset-0 h-full w-full object-cover hidden dark:block"
  />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
