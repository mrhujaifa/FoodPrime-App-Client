import * as React from "react";
import Image from "next/image";
import {
  Book,
  Menu,
  Sunset,
  Trees,
  Zap,
  User,
  Settings,
  LogOut,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userService } from "@/services/user.services";
import Link from "next/link";

// --- Types ---
interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = async ({
  logo = {
    url: "/",
    src: "/logos/logo2.png",
    alt: "logo",
    title: "",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "Latest industry news",
          icon: <Book className="size-5" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission",
          icon: <Trees className="size-5" />,
          url: "#",
        },
      ],
    },
    { title: "Pricing", url: "#" },
    { title: "Meals", url: "/meals" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: NavbarProps) => {
  const sessionResponse = await userService.getSession();
  const user = sessionResponse?.data?.user as SessionUser | undefined;

  return (
    <section
      className={cn(
        "top-0 z-50 w-full bg-black fixed  py-4 text-white border-b border-white/10",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="hidden items-center lg:grid lg:grid-cols-3 w-full">
          <div className="flex justify-start">
            <div
              className="flex items-center gap-2 text-lg text-[#5bab7a] font-bold
            "
            >
              <a href={logo.url} className="flex items-center gap-2">
                <Image
                  width={34}
                  height={34}
                  src={logo.src}
                  className=""
                  alt={logo.alt}
                />
              </a>
              <span className="">foodprime</span>
            </div>
          </div>

          <div className="flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => (
                  <MenuItemComponent key={item.title} item={item} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex justify-end gap-3 items-center">
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-black hover:bg-gray-200 border-none"
                >
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center justify-between lg:hidden">
          <a href={logo.url}>
            <img
              src={logo.src}
              className="max-h-8 brightness-0 invert"
              alt={logo.alt}
            />
          </a>
          <div className="flex items-center gap-4">
            {user && <ProfileDropdown user={user} />}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black text-white border-white/10"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="text-white">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-8">
                  <Accordion type="single" collapsible className="w-full">
                    {menu.map((item) => (
                      <MobileMenuItem key={item.title} item={item} />
                    ))}
                  </Accordion>
                  {!user && (
                    <div className="flex flex-col gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <a href={auth.login.url}>{auth.login.title}</a>
                      </Button>
                      <Button asChild className="bg-white text-black">
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileDropdown = ({ user }: { user: SessionUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full p-0 border border-white/20 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-zinc-800 text-white">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-3 mt-2 bg-zinc-950 border rounded-sm border-white/10 text-white shadow-2xl"
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-3">
            <p className="text-sm font-medium leading-none">
              {user.name || "User"}
            </p>
            <p className="text-xs leading-none text-zinc-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
          <Link className="flex items-center gap-1" href={"/become-a-partner"}>
            <Handshake className="mr-2 h-4 w-4" /> Partner with foodprime
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem className="focus:bg-red-500/10 text-red-400 focus:text-red-400 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MenuItemComponent = ({ item }: { item: MenuItem }) => {
  if (item.items) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-black border border-white/10 shadow-2xl">
          <div className="grid w-[400px] gap-2 p-4">
            {item.items.map((sub) => (
              <a
                key={sub.title}
                href={sub.url}
                className="flex gap-4 rounded-md p-3 hover:bg-white/10 transition-colors"
              >
                <div className="mt-1">{sub.icon}</div>
                <div>
                  <div className="text-sm font-semibold">{sub.title}</div>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {sub.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={item.url}
        className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MobileMenuItem = ({ item }: { item: MenuItem }) => {
  if (item.items) {
    return (
      <AccordionItem value={item.title} className="border-none">
        <AccordionTrigger className="py-2 text-lg font-medium hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-4 border-l border-white/10 ml-2">
          {item.items.map((sub) => (
            <a key={sub.title} href={sub.url} className="text-zinc-400 py-1">
              {sub.title}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <a href={item.url} className="py-2 text-lg font-medium block">
      {item.title}
    </a>
  );
};

export { Navbar };
