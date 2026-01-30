"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authServices } from "@/services/auth.services";
import { signUpInput } from "@/types";
import { userSignUpSchema } from "@/lib/validation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  // hanlde signUp user
  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: signUpInput = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      address: formData.get("address") as string,
    };

    const validation = userSignUpSchema.safeParse(payload);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error?.issues.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);

      return;
    }

    try {
      setLoading(true);
      const result = await authServices.signUp(payload);

      if (result?.data) {
        toast.success("Welcome aboard! 🎉", {
          description: "Your account has been created successfully.",
        });
      } else if (result?.error) {
        toast.error("Registration Failed", {
          description:
            result.error.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Network Error", {
        description: "Unable to connect to the server. Check your internet.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={cn("flex flex-col gap-6 text-foreground/90", className)}
      {...props}
    >
      {/* Login UI-er moto background gradient, blur ebong border add kora hoyeche */}
      <Card className="bg-gradient-to-br from-background/5 to-background/6 backdrop-blur-sm border border-border/40 shadow-2xl text-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white font-semibold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-white/80">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSingUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-sm text-white">
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-background/80 text-black placeholder:text-muted-foreground border-border/50"
                />
                <FieldDescription>
                  {errors.name && (
                    <span className="text-red-500 text-xs">{errors.name}</span>
                  )}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="address" className="text-sm text-white">
                  Address
                </FieldLabel>
                <Input
                  id="Address"
                  type="text"
                  name="address"
                  placeholder="John Doe"
                  required
                  className="bg-background/80 text-black placeholder:text-muted-foreground border-border/50"
                />

                <FieldDescription>
                  {errors.address && (
                    <span className="text-red-500 text-xs">
                      {errors.address}
                    </span>
                  )}
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="email" className="text-sm text-white">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className="bg-background/80 text-black placeholder:text-muted-foreground border-border/50"
                />

                <FieldDescription>
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                  )}
                </FieldDescription>
              </Field>

              <Field>
                <div className="w-full gap-4">
                  <div className="space-y-2">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm text-white"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      className="bg-background/80 text-black border-border/50"
                    />

                    <FieldDescription>
                      {errors.password && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </span>
                      )}
                    </FieldDescription>
                  </div>
                </div>
              </Field>

              <Field className="pt-2">
                <Button type="submit" className="w-full font-medium">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <FieldDescription className="text-center text-white/70 mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-green-500 underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-white/60">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
