import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/Roles";
import { userService } from "./services/user.services";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isCustomer = false;

  const { data } = await userService.getSession();
  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isCustomer = data.user.role === Roles.customer;
  }

  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if (
  //   (isAuthenticated && pathname.startsWith("/login")) ||
  //   pathname.startsWith("/signup")
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  //* User is authenticated and role = ADMIN
  //* User can not visit user dashboard
  //* User is authenticated and role = ADMIN
  if (isAdmin && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  //* User is authenticated and role = USER
  if (!isAdmin && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //* User is authenticated and role = USER
  //* User can not visit admin-dashboard
  if (!isAdmin && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //* if customer cannot access dashboard
  if (isCustomer && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (!isAuthenticated && pathname.startsWith("/restaurant/:id")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/dashboard/admin",
    "/dashboard/admin/:path*",
  ],
};
