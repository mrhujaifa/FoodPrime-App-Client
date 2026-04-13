export const dynamic = "force-dynamic";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/Roles";
import { userService } from "@/services/user.services";

export default async function DashboardRootLayout({
  admin,
  provider,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}) {
  const sessionResponse = await userService.getSession();
  const userInfo = sessionResponse?.data?.user;

  const role = userInfo?.role;

  console.log(userInfo?.role);

  return (
    <div className="bg-black">
      <SidebarProvider>
        {/* Pass user info to sidebar */}
        <AppSidebar user={userInfo} />

        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="p-4 md:p-6">
            {/* Admin slot: শুধুমাত্র অ্যাডমিন দেখতে পাবে */}
            {role === Roles.admin && admin}

            {/* Provider slot: অ্যাডমিনও দেখতে পাবে আবার প্রোভাইডার নিজেও দেখতে পাবে */}
            {(role === Roles.admin || role === Roles.provider) && provider}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
