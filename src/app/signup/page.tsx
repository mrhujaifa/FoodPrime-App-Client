import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/modules/Authentication/Signup";
import Image from "next/image";

import authBg from "../../../public/background/authBg.jpg";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image src={authBg} alt="Background" className="w-full" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
}
