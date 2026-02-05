const url = `http://localhost:8080/api/order`;
export const orderServices = {
  placeOrder: async (orderData: {
    deliveryAddress: string;
    phoneNumber: string;
    orderNotes?: string;
    riderTip: number;
    serviceFee: number;
    deliveryFee: number;
    paymentMethod: string;
  }) => {
    try {
      const response = await fetch(`${url}/place-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order processing failed");
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * User-er purono order history dekhar jonno (Optional)
   */
  getMyOrders: async () => {
    const token = localStorage.getItem("token"); // Token thakle
    const response = await fetch(`${url}/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Header-e token pathano
      },
      credentials: "include", // Jodi Cookie use koro tobe eita thakbe
    });

    if (!response.ok) {
      throw new Error("Orders fetch korte somoshya hoyeche");
    }

    return await response.json();
  },
};
