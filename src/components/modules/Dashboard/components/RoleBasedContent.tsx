// "use client";

// import { usePathname } from "next/navigation";
// import { Roles } from "@/constants/Roles";

// interface RoleBasedContentProps {
//   role: string;
//   admin: React.ReactNode;
//   provider: React.ReactNode;
// }

// export default function RoleBasedContent({
//   role,
//   admin,
//   provider,
// }: RoleBasedContentProps) {
//   const pathname = usePathname();

//   // পাথ চেক করার লজিক (আপনার adminRoutes এর URL অনুযায়ী)
//   const isAdminPath = pathname.includes("/dashboard/admin");
//   const isProviderPath = pathname.includes("/dashboard/provider");

//   // অ্যাডমিনের ডিফল্ট হোম বা অ্যানালিটিক্স এর জন্য চেক
//   const isGeneralAdmin = pathname === "/analytics" || pathname === "/dashboard";

//   return (
//     <>
//       {/* ১. অ্যাডমিন যদি অ্যাডমিন স্পেসিফিক রাউটে থাকে */}
//       {(isAdminPath || isGeneralAdmin) && role === Roles.admin && admin}

//       {/* ২. অ্যাডমিন বা প্রোভাইডার যদি প্রোভাইডার রাউটে থাকে */}
//       {isProviderPath &&
//         (role === Roles.admin || role === Roles.provider) &&
//         provider}
//     </>
//   );
// }
