import React from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
function RegisterPageForm({ onBack }) {
  return (
    <Card>
                    <form className="flex flex-col gap-6 p-2">
                      <FieldGroup>
                        <div className="flex flex-col items-center gap-1 text-center ">
                          <h1 className="text-2xl font-bold">
                            Create your account
                          </h1>
                          <p className="text-muted-foreground text-sm text-balance">
                            Fill in the form below to create your account
                          </p>
                        </div>
                        <Field>
                          <FieldLabel htmlFor="name">Full Name</FieldLabel>
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                          />
                          <FieldDescription>
                            We&apos;ll use this to contact you. We will not share
                            your email with anyone else.
                          </FieldDescription>
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          <Input id="password" type="password" required />
                          <FieldDescription>
                            Must be at least 8 characters long.
                          </FieldDescription>
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="confirm-password">
                            Confirm Password
                          </FieldLabel>
                          <Input id="confirm-password" type="password" required />
                          <FieldDescription>
                            Please confirm your password.
                          </FieldDescription>
                        </Field>
                        <Field>
                          <Button onClick={onBack}>Create Account</Button>
                        </Field>
                        <FieldSeparator>
                          Already have an account? <a href="#">Sign in</a>
                        </FieldSeparator>
                      </FieldGroup>
                    </form>
                  </Card>
  )
}

export default RegisterPageForm