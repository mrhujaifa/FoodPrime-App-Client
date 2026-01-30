import { LucideIcon } from "lucide-react";
export interface Route {
  title: string;
  items: {
    icon: LucideIcon;
    title: string;
    url: string;
  }[];
}
