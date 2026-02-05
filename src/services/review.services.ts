const API_URL = "http://localhost:8080/api"; // আপনার এক্সপ্রেস সার্ভারের ইউআরএল

export const reviewServices = {
  // ১. রিভিউ পোস্ট করার জন্য সার্ভিস
  createReview: async (
    rating: number,
    comment: string,
    customerId: string,
    mealId: string,
  ) => {
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          rating,
          comment,
          customerId,
          mealId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "রিভিউ দিতে ব্যর্থ হয়েছে",
        };
      }

      return {
        success: true,
        data: result.data,
        message: "রিভিউ সফলভাবে পোস্ট হয়েছে!",
      };
    } catch (error) {
      console.error("CREATE_REVIEW_SERVICE_ERROR:", error);
      return {
        success: false,
        message:
          "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। দয়া করে আবার চেষ্টা করুন।",
      };
    }
  },

  // ২. নির্দিষ্ট মিলের রিভিউগুলো নিয়ে আসার জন্য সার্ভিস
  getReviewsByMeal: async (mealId: string) => {
    try {
      const response = await fetch(`${API_URL}/reviews/${mealId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "রিভিউ লোড করতে সমস্যা হয়েছে",
        };
      }

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      console.error("FETCH_REVIEWS_SERVICE_ERROR:", error);
      return {
        success: false,
        message: "নেটওয়ার্ক ত্রুটি।",
      };
    }
  },
};
