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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { userSignInSchema } from "@/lib/validation";
import { signInInput } from "@/types";
import { useState } from "react";
import { authServices } from "@/services/auth.services";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  // hanlde signUp user
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const validation = userSignInSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const result = await authServices.signIn(validation.data);

      if (result?.data) {
        toast.success("Welcome back!", {
          description: "Redirecting to your dashboard...",
        });
        route.push("/");
        return;
      }

      if (result?.error) {
        const { code, message } = result.error;

        switch (code) {
          case "EMAIL_NOT_VERIFIED":
            toast.warning("Email not verified", {
              description: "Please check your inbox to verify your account.",
            });
            break;

          case "INVALID_EMAIL_OR_PASSWORD":
            toast.error("Login Failed", {
              description: "The email or password you entered is incorrect.",
            });
            break;

          case "USER_BANNED":
            toast.error("Account Suspended", {
              description: "Please contact support for more information.",
            });
            break;

          default:
            toast.error("Error", {
              description: message || "An unexpected error occurred.",
            });
        }
      }
    } catch (error) {
      console.error("Critical Auth Error:", error);
      toast.error("Connection Failed", {
        description: "Unable to reach the server. Please check your internet.",
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
      <Card className="bg-gradient-to-br from-background/5 to-background/6 backdrop-blur-sm border border-border/40 shadow-2xl text-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className=" text-white">
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>

        {/* login with google form */}
        <CardContent>
          <form onSubmit={handleSignIn}>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full gap-2 bg-background/2 text-white hover:bg-background/60 border-border/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                  >
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="white"
                    />
                  </svg>
                  Login with Apple{" "}
                  <span className="text-green-400 text-[8px] animate-pulse">
                    soon
                  </span>
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-white gap-2 bg-background/2  hover:bg-background/60 border-border/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="white"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator className="bg-background/2">
                Or continue with
              </FieldSeparator>

              <Field>
                <FieldLabel className="text-sm text-white">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className="bg-background/80 text-black placeholder:text-muted-foreground border-border/50"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </span>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel className="text-sm text-white">
                    Password
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm text-white/70 hover:text-foreground underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="bg-background/80 text-black border-border/50"
                />

                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </span>
                )}
              </Field>

              <Field>
                <Button type="submit" className="w-full font-medium">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <FieldDescription className="text-center text-white/70">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-green-500 underline underline-offset-4"
                  >
                    Sign up
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
