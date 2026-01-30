import { Route } from "@/types";
import { RouteIcon } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        icon: RouteIcon,
        title: "Analytics",
        url: "/analytics",
      },
    ],
  },
];
