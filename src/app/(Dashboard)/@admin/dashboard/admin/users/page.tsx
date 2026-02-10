import UserTable from "@/components/modules/Dashboard/admin/allusers";
import { adminServices } from "@/services/admin.services";
import { headers } from "next/headers";

export default async function AllUsers() {
  const requestHeader = await headers();
  const response = await adminServices.getAllUsers({
    cookie: requestHeader.get("cookie") || "",
  });

  const users = await response.data;

  return (
    <div>
      <UserTable users={users} />
    </div>
  );
}
