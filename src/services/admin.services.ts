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

export const adminServices = {
  getAllUsers,
};
