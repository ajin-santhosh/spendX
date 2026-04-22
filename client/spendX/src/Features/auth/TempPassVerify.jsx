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
export default function TempPassVerify( {onNext}) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Enter temporary password</CardTitle>
        <CardDescription>
          Enter the temporary password sent to your email to proceed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>
          <FieldDescription>
            This password is valid for a limited time.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button onClick={onNext} className="w-full">
            Submit
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
  );
}
