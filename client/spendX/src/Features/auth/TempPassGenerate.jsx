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

function TempPassgenerate({onNext}) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email to receive a temporary password for account access
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
            A temporary password will be sent to your registered email address.
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

export default TempPassgenerate;
