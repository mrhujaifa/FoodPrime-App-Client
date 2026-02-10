import ViewAllOrders from "@/components/modules/Dashboard/admin/ViewAllOrders";
import { adminServices } from "@/services/admin.services";
import { headers } from "next/headers";
import React from "react";

export default async function AllOrders() {
  const requestHeader = await headers();
  const orders = await adminServices.viewUserOrders({
    cookie: requestHeader.get("cookie") || "",
  });

  const ordersData = await orders.data;
  return (
    <div>
      <ViewAllOrders orders={ordersData} />
    </div>
  );
}
