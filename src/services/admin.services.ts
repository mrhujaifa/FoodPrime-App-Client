import { adminAPI } from "@/lib/api";

const getAllUsers = async (customHeaders = {}) => {
  const response = await fetch(`${adminAPI}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 204) {
    return [];
  }

  if (response.status === 401) {
    throw new Error("Unauthorized access. Please log in.");
  }
  if (response.status === 403) {
    throw new Error(
      "Forbidden access. You don't have permission to view this resource.",
    );
  }
  if (response.status === 500) {
    throw new Error("Server error. Please try again later.");
  }

  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const changeUserStatus = async (
  userId: string, // whose status to change
  status: string, // new status value
  cookieStore: any,
) => {
  const response = await fetch(`${adminAPI}/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore,
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized access. Please log in.");
  }

  if (response.status === 403) {
    throw new Error(
      "Forbidden access. You don't have permission to perform this action.",
    );
  }
  if (response.status === 500) {
    throw new Error("Server error. Please try again later.");
  }

  if (!response.ok) {
    throw new Error(`Request failed with status--->: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const viewUserOrders = async (customHeaders = {}) => {
  const resposne = await fetch(`${adminAPI}/users/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (resposne.status === 401) {
    throw new Error("Unauthorized access. Please log in.");
  }
  if (resposne.status === 403) {
    throw new Error(
      "Forbidden access. You don't have permission to view this resource.",
    );
  }
  if (resposne.status === 500) {
    throw new Error("Server error. Please try again later.");
  }
  if (!resposne.ok) {
    throw new Error(`Fetch failed with status: ${resposne.status}`);
  }
  const data = await resposne.json();
  return data;
};

export const adminServices = {
  getAllUsers,
  changeUserStatus,
  viewUserOrders,
};
