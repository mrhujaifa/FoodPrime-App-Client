"use client";

import * as React from "react";
import Image from "next/image";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
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

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://orgass.myshopify.com/cdn/shop/files/logo-1.png?v=1641276560",
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
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    { title: "Pricing", url: "#" },
    { title: "Blog", url: "#" },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full bg-black fixed py-3 text-white border-b border-white/10",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="hidden items-center lg:grid lg:grid-cols-3 w-full">
          <div className="flex justify-start">
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                width={100}
                height={40}
                src={logo.src}
                className="max-h-9 object-contain brightness-0 invert"
                alt={logo.alt}
              />
              <span className="text-xl font-bold tracking-tight text-white">
                {logo.title}
              </span>
            </a>
          </div>

          <div className="flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-white text-black hover:bg-gray-200"
            >
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black text-white border-white/10"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="text-white">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 mt-8">
                <Accordion type="single" collapsible className="w-full">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                  <Button
                    asChild
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    <a href={auth.signup.url}>{auth.signup.title}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-black border border-white/10">
          <div className="grid w-[450px] gap-3 p-4">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-none"
      >
        <AccordionTrigger className="py-2 text-lg font-medium hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-4 mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.url}
              className="text-muted-foreground hover:text-white py-1"
            >
              {subItem.title}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="py-2 text-lg font-medium block"
    >
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-white/10"
      href={item.url}
    >
      <div className="text-white">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold text-white">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-gray-400 mt-1">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
