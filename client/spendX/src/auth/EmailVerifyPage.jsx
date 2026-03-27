import React from "react";
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

function EmailVerifyPage({onNext}) {
  
  return (
    <>
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
            <Button type="button" className="w-full" onClick={onNext} >
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
    </>
  );
}

export default EmailVerifyPage;
