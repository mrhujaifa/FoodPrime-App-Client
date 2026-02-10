import { Route } from "@/types";
import { ListOrdered, RouteIcon, User } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Provider Management",
    items: [
      {
        icon: RouteIcon,
        title: "Partner Ship Request",
        url: "/dashboard/admin/partner-ship",
      },
      // {
      //   icon: RouteIcon,
      //   title: "Provider add meals",
      //   url: "/dashboard/provider/meals/create",
      // },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        icon: User,
        title: "All Users",
        url: "/dashboard/admin/users",
      },
      {
        icon: ListOrdered,
        title: "All Orders",
        url: "/dashboard/admin/orders",
      },
    ],
  },
];
