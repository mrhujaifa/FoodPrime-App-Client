import { Route } from "@/types";
import { House, History, Soup } from "lucide-react";

export const userRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      {
        icon: House,
        title: "Home",
        url: "/dashboard",
      },
      {
        icon: History,
        title: "History",
        url: "/dashboard/history",
      },
      {
        icon: Soup,
        title: "Add Meal",
        url: "/dashboard/provider/meals/create",
      },
      {
        icon: Soup,
        title: "My Meals",
        url: "/dashboard/provider/meals",
      },
    ],
  },
];
