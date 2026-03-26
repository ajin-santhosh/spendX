import React from "react";
import { GalleryVerticalEnd, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function EmailVerifyPage() {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              spendX.com
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle>Verify your email adress</CardTitle>
                  <CardDescription>
                    Enter your email below to receive a one-time password (OTP).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </Field>{" "}
                    <FieldDescription>
                      We’ll send a verification code (OTP) to this email.
                    </FieldDescription>
                  </Field>
                </CardContent>
                <CardFooter>
                  <Field>
                    <Button type="submit" className="w-full">
                      Verify
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Having trouble signing in?{" "}
                      <a
                        href="#"
                        className="underline underline-offset-4 transition-colors hover:text-primary"
                      >
                        Contact support
                      </a>
                    </div>
                  </Field>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/Spend X (1).png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}

export default EmailVerifyPage;
