import { LoginForm } from "@/components/modules/Authentication/login";
import Image from "next/image";
import authBg from "../../../public/background/authBg.jpg";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src={authBg}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Form Container */}
      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
